from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import datetime

import models
import schemas


def create_ticket(db: Session, ticket: schemas.TicketCreate):

    db_ticket = models.Ticket(
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open",
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    db_ticket.ticket_id = f"TKT-{db_ticket.id:03d}"

    db.commit()
    db.refresh(db_ticket)

    return db_ticket


def get_all_tickets(db: Session, search: str = None, status: str = None):

    query = db.query(models.Ticket)

    if search:
        query = query.filter(
            or_(
                models.Ticket.ticket_id.contains(search),
                models.Ticket.customer_name.contains(search),
                models.Ticket.customer_email.contains(search),
                models.Ticket.subject.contains(search),
                models.Ticket.description.contains(search),
            )
        )

    if status:
        query = query.filter(models.Ticket.status == status)

    return query.order_by(models.Ticket.created_at.desc()).all()


def get_ticket_by_id(db: Session, ticket_id: str):
    ticket = (
        db.query(models.Ticket).filter(models.Ticket.ticket_id == ticket_id).first()
    )

    if ticket and ticket.notes is None:
        ticket.notes = []

    return ticket


def update_ticket(db: Session, ticket_id: str, update_data: schemas.TicketUpdate):

    ticket = get_ticket_by_id(db, ticket_id)

    if not ticket:
        return None

    ticket.status = update_data.status
    ticket.updated_at = datetime.utcnow()

    if update_data.note_text:

        new_note = models.Note(note_text=update_data.note_text, ticket=ticket)

        db.add(new_note)

    db.commit()
    db.refresh(ticket)

    return ticket
