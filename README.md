# Support CRM System

A full-stack customer support ticketing and CRM system built with FastAPI (backend) and React (frontend).

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure Details](#project-structure-details)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Ticket Management**: Create, read, update support tickets
- **Customer Information**: Store customer details (name, email)
- **Ticket Status Tracking**: Open, In Progress, Resolved, Closed statuses
- **Search & Filter**: Search tickets and filter by status
- **Internal Notes**: Add internal notes to tickets
- **Real-time Updates**: React-based responsive UI
- **Clean Architecture**: Separation of concerns with FastAPI and React

## 📁 Project Structure

```
support-crm/
├── backend/                    # FastAPI Backend
│   ├── main.py                # FastAPI application entry point
│   ├── models.py              # SQLAlchemy ORM models
│   ├── schemas.py             # Pydantic validation schemas
│   ├── crud.py                # Database CRUD operations
│   ├── database.py            # Database configuration
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example           # Environment variables template
│   └── .gitignore             # Git ignore rules for backend
│
├── frontend/                   # React + Vite Frontend
│   ├── src/
│   │   ├── main.jsx           # React entry point
│   │   ├── App.jsx            # Root component
│   │   ├── App.css            # Global styles
│   │   ├── index.css          # Global CSS
│   │   ├── api/
│   │   │   └── api.js         # Axios API client
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── TicketCard.jsx
│   │   │   ├── TicketForm.jsx
│   │   │   ├── NoteList.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   └── StatusFilter.jsx
│   │   └── pages/             # Page components
│   │       ├── HomePage.jsx
│   │       ├── CreateTicketPage.jsx
│   │       └── TicketDetailPage.jsx
│   ├── public/                # Static assets
│   ├── index.html             # HTML template
│   ├── package.json           # Node dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── eslint.config.js       # ESLint configuration
│   ├── .env.example           # Environment variables template
│   ├── .gitignore             # Git ignore rules for frontend
│   └── README.md              # Frontend-specific README
│
├── .gitignore                 # Root git ignore rules
└── README.md                  # This file
```

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python web framework)
- **Database**: SQLite (with SQLAlchemy ORM)
- **API**: RESTful API with CORS support
- **Validation**: Pydantic for data validation
- **Server**: Uvicorn (ASGI server)

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: CSS

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Node.js 16+** ([Download](https://nodejs.org/))
- **npm or yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Verify installations:
```bash
python --version
node --version
npm --version
```

## 💾 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/support-crm.git
cd support-crm
```

### 2. Backend Setup

#### 2a. Navigate to Backend Directory
```bash
cd backend
```

#### 2b. Create Virtual Environment
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python -m venv venv
source venv/bin/activate
```

#### 2c. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 2d. Create Environment File
```bash
# Copy the environment template
cp .env.example .env

# Edit .env with your configuration (optional for development)
```

### 3. Frontend Setup

#### 3a. Navigate to Frontend Directory
```bash
cd ../frontend
```

#### 3b. Install Dependencies
```bash
npm install
```

#### 3c. Create Environment File
```bash
# Copy the environment template
cp .env.example .env

# Edit .env with your configuration (optional for development)
```

## 🚀 Running the Application

### Backend (in one terminal)

```bash
cd backend

# Activate virtual environment (if not already activated)
# On Windows: venv\Scripts\activate
# On macOS/Linux: source venv/bin/activate

# Run the FastAPI server
uvicorn main:app --reload
```

The backend will be available at: **http://localhost:8000**

### Frontend (in another terminal)

```bash
cd frontend

# Start the development server
npm run dev
```

The frontend will be available at: **http://localhost:5173**

### Accessing the Application

1. Open your browser and navigate to: **http://localhost:5173**
2. Backend API is running at: **http://localhost:8000**
3. API Documentation (Swagger UI): **http://localhost:8000/docs**
4. Alternative API Docs (ReDoc): **http://localhost:8000/redoc**

## 📚 API Documentation

### Base URL
```
http://localhost:8000
```

### Endpoints

#### 1. Health Check
```
GET /
Response: { "message": "Support CRM API Running" }
```

#### 2. Create Ticket
```
POST /tickets
Content-Type: application/json

Request Body:
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Issue with product",
  "description": "Detailed description of the issue"
}

Response: Ticket object with ID
```

#### 3. Get All Tickets
```
GET /tickets?search=keyword&status=Open

Query Parameters:
  - search (optional): Search in ticket ID, name, email, subject, description
  - status (optional): Filter by status (Open, In Progress, Resolved, Closed)

Response: List of tickets
```

#### 4. Get Ticket Details
```
GET /tickets/{ticket_id}

Response: Detailed ticket object with notes
```

#### 5. Update Ticket Status & Add Note
```
PUT /tickets/{ticket_id}
Content-Type: application/json

Request Body:
{
  "status": "In Progress",
  "note_text": "Working on this issue"
}

Response: Updated ticket object
```

### Full API Documentation
Visit **http://localhost:8000/docs** for interactive Swagger UI documentation

## 🗄️ Database Models

### Ticket Model
```
- id: Integer (Primary Key)
- ticket_id: String (Unique, Format: TKT-001, TKT-002, etc.)
- customer_name: String
- customer_email: Email
- subject: String
- description: Text
- status: String (Default: "Open")
- created_at: DateTime
- updated_at: DateTime
- notes: Relationship (One-to-Many with Note)
```

### Note Model
```
- id: Integer (Primary Key)
- ticket_ref: Integer (Foreign Key to Ticket)
- note_text: Text
- created_at: DateTime
- ticket: Relationship (Many-to-One with Ticket)
```

## 🔧 Configuration

### Backend Configuration (.env)
- `DATABASE_URL`: Database connection string (default: SQLite)
- `CORS_ORIGINS`: Allowed origins for CORS (default: localhost:5173)
- `SERVER_HOST`: Server host (default: 0.0.0.0)
- `SERVER_PORT`: Server port (default: 8000)

### Frontend Configuration (.env)
- `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:8000)
- `VITE_ENVIRONMENT`: Environment type (development/production)

## 📝 Available Scripts

### Backend
```bash
# Run development server with auto-reload
uvicorn main:app --reload

# Run with specific host and port
uvicorn main:app --host 0.0.0.0 --port 8000

# Run without auto-reload
uvicorn main:app
```

### Frontend
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Change port
uvicorn main:app --port 8001 --reload
```

**Module import errors:**
```bash
# Ensure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend Issues

**Port 5173 already in use:**
```bash
# npm will prompt to use next available port or specify one
npm run dev -- --port 5174
```

**Dependencies not found:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Development Checklist

- [ ] Virtual environment created and activated
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env files created from .env.example
- [ ] Backend runs without errors on `localhost:8000`
- [ ] Frontend runs without errors on `localhost:5173`
- [ ] Can create a new ticket
- [ ] Can view all tickets
- [ ] Can view ticket details
- [ ] Can update ticket status
- [ ] Can add notes to tickets

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues and questions:
- Create an GitHub Issue
- Check existing documentation in the frontend/README.md

## 🎉 Quick Start Command Summary

```bash
# Clone and setup
git clone https://github.com/yourusername/support-crm.git
cd support-crm

# Backend setup and run (Terminal 1)
cd backend
python -m venv venv
# On Windows: venv\Scripts\activate
# On macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend setup and run (Terminal 2)
cd frontend
npm install
npm run dev

# Open in browser
# Frontend: http://localhost:5173
# Backend API Docs: http://localhost:8000/docs
```

---

**Last Updated**: May 2026  
**Version**: 1.0.0
