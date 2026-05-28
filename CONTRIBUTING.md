# Contributing to Support CRM

Thank you for your interest in contributing to the Support CRM project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions with other contributors and maintainers.

## How to Contribute

### Reporting Bugs

1. **Check existing issues** first to avoid duplicates
2. **Use a clear, descriptive title**
3. **Provide detailed description** of the problem
4. **Include reproduction steps**
5. **Specify your environment** (OS, Python version, Node version)
6. **Attach error messages and logs**

### Suggesting Enhancements

1. **Use a clear, descriptive title**
2. **Provide detailed description** of the suggested enhancement
3. **List some examples** of how the enhancement would be used
4. **Explain the expected behavior**

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** with clear commit messages
4. **Follow the code style** of the existing project
5. **Test your changes** thoroughly
6. **Push to your fork**
7. **Submit a Pull Request** with a clear description

## Development Setup

### Backend Development

```bash
cd backend
python -m venv venv
# On Windows: venv\Scripts\activate
# On macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

## Code Style

### Python (Backend)
- Follow PEP 8 standards
- Use meaningful variable names
- Add docstrings to functions
- Keep functions focused and small

### JavaScript/React (Frontend)
- Follow ESLint rules (run `npm run lint`)
- Use clear, descriptive component names
- Use functional components with hooks
- Add comments for complex logic

## Testing

- Test your changes locally before submitting
- Ensure the application runs without errors
- Check both backend and frontend functionality

## Commit Messages

Write clear and descriptive commit messages:

```
Short summary (50 characters or less)

More detailed explanation if necessary. Wrap at 72 characters.

- Bullet points are okay too
- Use imperative mood ("add feature" not "added feature")
```

## Pull Request Process

1. Update the README.md with any new features or changes
2. Ensure tests pass and linting is clean
3. Provide a clear description of your changes
4. Link any related issues
5. Be responsive to feedback

## Project Structure Guidelines

- Keep backend and frontend separate
- Place new components in appropriate folders
- Maintain consistent naming conventions
- Document significant changes

## Questions?

Feel free to:
- Open an issue with the `question` label
- Check existing documentation
- Review similar closed issues

## Recognition

All contributors will be recognized in the README.md file. Thank you for your contributions!
