# Support CRM API Documentation

Complete API reference for the Support CRM backend service.

## Base URL

```
http://localhost:8000
```

## Authentication

Currently, the API does not require authentication. Future versions will implement API key or JWT authentication.

## Response Format

All responses are in JSON format with the following structure:

### Success Response
```json
{
  "data": { /* response data */ },
  "status": "success"
}
```

### Error Response
```json
{
  "detail": "Error message describing the issue"
}
```

## API Endpoints

### 1. Health Check

#### Request
```http
GET /
```

#### Response
```json
{
  "message": "Support CRM API Running"
}
```

#### Status Codes
- `200 OK` - API is running

---

### 2. Create Ticket

Creates a new support ticket.

#### Request
```http
POST /tickets
Content-Type: application/json
```

#### Request Body
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Cannot login to account",
  "description": "I'm unable to log into my account. I've tried resetting my password but still getting an error."
}
```

#### Request Schema
- `customer_name` (string, required): Customer's full name
- `customer_email` (email, required): Valid email address
- `subject` (string, required): Brief subject of the ticket
- `description` (string, required): Detailed description of the issue

#### Response (201 Created)
```json
{
  "id": 1,
  "ticket_id": "TKT-001",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Cannot login to account",
  "description": "I'm unable to log into my account...",
  "status": "Open",
  "created_at": "2026-05-28T10:30:00",
  "updated_at": "2026-05-28T10:30:00",
  "notes": []
}
```

#### Status Codes
- `201 Created` - Ticket created successfully
- `422 Unprocessable Entity` - Invalid request data

#### Example cURL
```bash
curl -X POST "http://localhost:8000/tickets" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "subject": "Cannot login",
    "description": "I cannot login to my account"
  }'
```

---

### 3. Get All Tickets

Retrieves a list of all tickets with optional filtering.

#### Request
```http
GET /tickets
GET /tickets?search=keyword
GET /tickets?status=Open
GET /tickets?search=keyword&status=In%20Progress
```

#### Query Parameters
- `search` (string, optional): Search across ticket ID, customer name, email, subject, and description
- `status` (string, optional): Filter by status (Open, In Progress, Resolved, Closed)

#### Response (200 OK)
```json
[
  {
    "id": 1,
    "ticket_id": "TKT-001",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "subject": "Cannot login to account",
    "description": "I'm unable to log into my account...",
    "status": "Open",
    "created_at": "2026-05-28T10:30:00",
    "updated_at": "2026-05-28T10:30:00",
    "notes": []
  },
  {
    "id": 2,
    "ticket_id": "TKT-002",
    "customer_name": "Jane Smith",
    "customer_email": "jane@example.com",
    "subject": "Billing issue",
    "description": "I was charged twice for my subscription...",
    "status": "In Progress",
    "created_at": "2026-05-27T15:45:00",
    "updated_at": "2026-05-27T16:00:00",
    "notes": [
      {
        "note_text": "Investigating the billing records",
        "created_at": "2026-05-27T16:00:00"
      }
    ]
  }
]
```

#### Status Codes
- `200 OK` - Tickets retrieved successfully
- `400 Bad Request` - Invalid query parameters

#### Example cURL
```bash
# Get all open tickets
curl "http://localhost:8000/tickets?status=Open"

# Search for tickets
curl "http://localhost:8000/tickets?search=login"

# Combine search and filter
curl "http://localhost:8000/tickets?search=billing&status=In%20Progress"
```

---

### 4. Get Ticket Details

Retrieves detailed information about a specific ticket including all notes.

#### Request
```http
GET /tickets/{ticket_id}
```

#### URL Parameters
- `ticket_id` (string, required): The ticket identifier (e.g., TKT-001)

#### Response (200 OK)
```json
{
  "id": 1,
  "ticket_id": "TKT-001",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Cannot login to account",
  "description": "I'm unable to log into my account. I've tried resetting my password but still getting an error.",
  "status": "In Progress",
  "created_at": "2026-05-28T10:30:00",
  "updated_at": "2026-05-28T11:00:00",
  "notes": [
    {
      "note_text": "User confirmed account exists",
      "created_at": "2026-05-28T10:45:00"
    },
    {
      "note_text": "Password reset link sent to email",
      "created_at": "2026-05-28T11:00:00"
    }
  ]
}
```

#### Status Codes
- `200 OK` - Ticket found and returned
- `404 Not Found` - Ticket with given ID not found

#### Example cURL
```bash
curl "http://localhost:8000/tickets/TKT-001"
```

---

### 5. Update Ticket & Add Note

Updates ticket status and optionally adds a note.

#### Request
```http
PUT /tickets/{ticket_id}
Content-Type: application/json
```

#### URL Parameters
- `ticket_id` (string, required): The ticket identifier (e.g., TKT-001)

#### Request Body
```json
{
  "status": "In Progress",
  "note_text": "Working on resolving the login issue"
}
```

#### Request Schema
- `status` (string, required): New ticket status (Open, In Progress, Resolved, Closed)
- `note_text` (string, optional): Internal note to add to the ticket

#### Response (200 OK)
```json
{
  "id": 1,
  "ticket_id": "TKT-001",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Cannot login to account",
  "description": "I'm unable to log into my account...",
  "status": "In Progress",
  "created_at": "2026-05-28T10:30:00",
  "updated_at": "2026-05-28T11:05:00",
  "notes": [
    {
      "note_text": "Working on resolving the login issue",
      "created_at": "2026-05-28T11:05:00"
    }
  ]
}
```

#### Status Codes
- `200 OK` - Ticket updated successfully
- `404 Not Found` - Ticket with given ID not found
- `422 Unprocessable Entity` - Invalid request data

#### Example cURL
```bash
# Update status and add note
curl -X PUT "http://localhost:8000/tickets/TKT-001" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress",
    "note_text": "Investigating user login issue"
  }'

# Update status without note
curl -X PUT "http://localhost:8000/tickets/TKT-001" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Resolved"
  }'
```

---

## Data Models

### Ticket Object

```json
{
  "id": 1,
  "ticket_id": "TKT-001",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Issue subject",
  "description": "Detailed description",
  "status": "Open",
  "created_at": "2026-05-28T10:30:00",
  "updated_at": "2026-05-28T10:30:00",
  "notes": []
}
```

| Field | Type | Description |
|-------|------|-------------|
| id | integer | Internal database ID |
| ticket_id | string | Unique ticket identifier (TKT-XXX) |
| customer_name | string | Customer's full name |
| customer_email | string | Customer's email address |
| subject | string | Ticket subject |
| description | string | Detailed description |
| status | string | Ticket status |
| created_at | datetime | Creation timestamp |
| updated_at | datetime | Last update timestamp |
| notes | array | Array of Note objects |

### Note Object

```json
{
  "note_text": "Internal note",
  "created_at": "2026-05-28T10:45:00"
}
```

| Field | Type | Description |
|-------|------|-------------|
| note_text | string | Note content |
| created_at | datetime | Creation timestamp |

### Ticket Status Values

- `Open` - New ticket, not yet started
- `In Progress` - Currently being worked on
- `Resolved` - Issue resolved, awaiting customer confirmation
- `Closed` - Ticket closed

---

## Error Handling

### Common Error Responses

#### 404 Not Found
```json
{
  "detail": "Ticket not found"
}
```

#### 422 Unprocessable Entity
```json
{
  "detail": [
    {
      "loc": ["body", "customer_email"],
      "msg": "Invalid email format",
      "type": "value_error.email"
    }
  ]
}
```

---

## Rate Limiting

Currently, there is no rate limiting. Future versions may implement rate limiting to prevent abuse.

---

## Versioning

Current API Version: `1.0.0`

The API version is included in all responses through the API header information.

---

## Interactive API Documentation

The API includes built-in interactive documentation:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

Both provide interactive endpoints you can test directly in your browser.

---

## Example Integration

### JavaScript/Fetch
```javascript
// Create a ticket
const createTicket = async () => {
  const response = await fetch('http://localhost:8000/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customer_name: 'John Doe',
      customer_email: 'john@example.com',
      subject: 'Issue title',
      description: 'Issue description'
    })
  });
  return await response.json();
};

// Get all tickets
const getTickets = async () => {
  const response = await fetch('http://localhost:8000/tickets');
  return await response.json();
};
```

### Python/Requests
```python
import requests

# Create a ticket
response = requests.post('http://localhost:8000/tickets', json={
    'customer_name': 'John Doe',
    'customer_email': 'john@example.com',
    'subject': 'Issue title',
    'description': 'Issue description'
})
ticket = response.json()

# Get all tickets
response = requests.get('http://localhost:8000/tickets')
tickets = response.json()
```

---

For more information, visit the [README.md](README.md) or [Contributing Guide](CONTRIBUTING.md).
