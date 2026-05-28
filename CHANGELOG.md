# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-28

### Added
- Initial release of Support CRM system
- Ticket creation and management
- Customer support ticket tracking with status management
- Internal notes functionality for tickets
- Search and filter capabilities for tickets
- FastAPI backend with SQLAlchemy ORM
- React frontend with React Router navigation
- CORS support for cross-origin requests
- Comprehensive API documentation (Swagger UI)
- SQLite database integration
- Docker support with docker-compose
- Complete project documentation

### Features
#### Backend
- RESTful API endpoints for ticket management
- Email validation for customer emails
- Automatic ticket ID generation (TKT-XXX format)
- Database relationships between Tickets and Notes
- Timestamp tracking (created_at, updated_at)

#### Frontend
- Responsive React interface
- Ticket listing with search and filtering
- Create new ticket form
- View ticket details
- Add internal notes to tickets
- Status tracking and updates
- Clean, intuitive UI

### Documentation
- Comprehensive README.md with setup instructions
- Backend .env.example configuration template
- Frontend .env.example configuration template
- Contributing guidelines
- Docker and Docker Compose files
- GitHub issue templates
- MIT License

---

## Future Releases

### Planned Features
- User authentication and authorization
- Priority levels for tickets
- Ticket categories
- Email notifications
- Advanced reporting and analytics
- PostgreSQL database support
- Unit and integration tests
- CI/CD pipeline setup
- Performance optimizations

---

For details on how to contribute to this project, please see [CONTRIBUTING.md](CONTRIBUTING.md).
