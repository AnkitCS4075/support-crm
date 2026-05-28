from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

import models
import schemas
import crud

from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Support CRM API",
    version="1.0.0"
)

# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Dependency

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# Home Route

@app.get("/")
def root():
    return {
        "message": "Support CRM API Running"
    }


# Create Ticket

@app.post("/api/tickets")
def create_ticket(
    ticket: schemas.TicketCreate,
    db: Session = Depends(get_db)
):

    created_ticket = crud.create_ticket(db, ticket)

    return {
        "ticket_id": created_ticket.ticket_id,
        "created_at": created_ticket.created_at
    }


# Get All Tickets

@app.get(
    "/api/tickets",
    response_model=list[schemas.TicketResponse]
)
def get_tickets(
    search: str = None,
    status: str = None,
    db: Session = Depends(get_db)
):

    tickets = crud.get_all_tickets(
        db=db,
        search=search,
        status=status
    )

    return tickets


# Get Single Ticket

@app.get(
    "/api/tickets/{ticket_id}",
    response_model=schemas.TicketResponse
)
def get_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):

    ticket = crud.get_ticket_by_id(db, ticket_id)

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket


# Update Ticket

@app.put("/api/tickets/{ticket_id}")
def update_ticket(
    ticket_id: str,
    update_data: schemas.TicketUpdate,
    db: Session = Depends(get_db)
):

    updated_ticket = crud.update_ticket(
        db,
        ticket_id,
        update_data
    )

    if not updated_ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return {
        "success": True,
        "updated_at": updated_ticket.updated_at
    }


