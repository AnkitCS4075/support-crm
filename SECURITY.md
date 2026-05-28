# Security Policy

## Reporting Security Issues

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please email security@yourdomain.com with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Your contact information

We will acknowledge receipt within 24 hours and work on a fix.

## Security Best Practices

### For Users

1. **Credentials**
   - Never commit .env files to version control
   - Use .env.example for template only
   - Rotate API keys regularly

2. **Database**
   - Use strong, unique passwords
   - Enable database backups
   - Regularly update database software
   - Use encrypted connections for remote databases

3. **API Usage**
   - Validate all user inputs
   - Use HTTPS in production
   - Implement rate limiting
   - Monitor API usage

### For Developers

1. **Code Security**
   - Keep dependencies updated
   - Use security-focused linters
   - Review code before merging
   - Follow OWASP top 10 guidelines

2. **Dependency Management**
   - Regularly run security scans
   ```bash
   # Python
   pip install safety
   safety check
   
   # JavaScript
   npm audit
   ```

3. **Environment**
   - Never log sensitive information
   - Use environment variables for secrets
   - Implement proper error handling
   - Use CORS securely

### Frontend Security

- Sanitize user input to prevent XSS
- Use Content Security Policy headers
- Keep React and dependencies updated
- Validate data before sending to API
- Use secure HTTP-only cookies

### Backend Security

- Validate and sanitize all inputs
- Use parameterized queries (SQLAlchemy handles this)
- Implement rate limiting
- Use HTTPS in production
- Keep Python and dependencies updated
- Implement proper logging without sensitive data
- Use secure headers

## Known Vulnerabilities

None currently known.

## Dependencies Security Audit

Run regular security audits:

```bash
# Backend
cd backend
pip install -r requirements.txt
safety check

# Frontend
cd frontend
npm audit
npm audit fix
```

## CORS Configuration

**Development**
```env
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

**Production**
```env
CORS_ORIGINS=["https://yourdomain.com"]
```

## Authentication & Authorization

Future versions will include:
- JWT token authentication
- Role-based access control (RBAC)
- Session management
- Two-factor authentication

## Compliance

This project aims to comply with:
- OWASP Top 10
- CWE/SANS Top 25
- General data protection standards

## Version Support

| Version | Status | Support Until |
|---------|--------|---------------|
| 1.0.x | Active | 2027-05-28 |

## Changelog

### Version 1.0.0
- Initial release
- Basic CRUD operations
- No authentication implemented (planned for next version)

## Contact

For security inquiries, please contact: security@yourdomain.com

---

Last updated: May 2026
