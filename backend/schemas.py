from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class TicketCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str


class TicketUpdate(BaseModel):
    status: str
    note_text: Optional[str] = None


class NoteResponse(BaseModel):
    note_text: str
    created_at: datetime

    class Config:
        from_attributes = True


class TicketResponse(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: str
    subject: str
    description: str
    status: str
    created_at: datetime
    updated_at: datetime

    notes: List[NoteResponse] = []

    class Config:
        from_attributes = True

        