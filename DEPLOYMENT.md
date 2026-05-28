# Deployment Guide

This guide covers deploying the Support CRM application to various environments.

## Table of Contents

- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)

## Local Development

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Setup

1. **Clone and navigate**
```bash
git clone https://github.com/yourusername/support-crm.git
cd support-crm
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

3. **Frontend Setup** (in another terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

4. **Access**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## Docker Deployment

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

### Setup

1. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

This will:
- Build backend image
- Build frontend image
- Start both services
- Create necessary volumes

2. **Access**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

3. **View logs**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

4. **Stop services**
```bash
docker-compose down
```

### Building Images Separately

**Backend**
```bash
docker build -t support-crm-backend:latest ./backend
docker run -d -p 8000:8000 --name backend support-crm-backend:latest
```

**Frontend**
```bash
docker build -t support-crm-frontend:latest ./frontend
docker run -d -p 5173:5173 --name frontend support-crm-frontend:latest
```

---

## Production Deployment

### Backend Deployment

#### Option 1: Heroku

1. **Install Heroku CLI**
2. **Create Procfile**
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

3. **Create runtime.txt**
```
python-3.11.0
```

4. **Deploy**
```bash
heroku create your-app-name
git push heroku main
```

#### Option 2: AWS EC2

1. **Launch EC2 instance**
   - Ubuntu 20.04 LTS
   - Security group allows port 8000

2. **SSH into instance**
```bash
ssh -i key.pem ubuntu@your-instance-ip
```

3. **Install dependencies**
```bash
sudo apt update
sudo apt install python3-pip python3-venv
```

4. **Deploy application**
```bash
git clone https://github.com/yourusername/support-crm.git
cd support-crm/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

5. **Run with systemd**
```bash
sudo nano /etc/systemd/system/support-crm.service
```

Add:
```ini
[Unit]
Description=Support CRM API
After=network.target

[Service]
Type=notify
User=ubuntu
WorkingDirectory=/home/ubuntu/support-crm/backend
Environment="PATH=/home/ubuntu/support-crm/backend/venv/bin"
ExecStart=/home/ubuntu/support-crm/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable support-crm
sudo systemctl start support-crm
```

### Frontend Deployment

#### Option 1: Vercel

1. **Build**
```bash
cd frontend
npm run build
```

2. **Deploy**
```bash
npm i -g vercel
vercel
```

#### Option 2: Netlify

1. **Connect GitHub repository**
2. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy**
   - Automatic on git push

#### Option 3: AWS S3 + CloudFront

1. **Build**
```bash
npm run build
```

2. **Upload to S3**
```bash
aws s3 sync dist/ s3://your-bucket/
```

3. **Configure CloudFront**
   - Create distribution
   - Point to S3 bucket
   - Set index.html as default root object

---

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=sqlite:///./support_crm.db
API_TITLE=Support CRM API
API_VERSION=1.0.0
SERVER_HOST=0.0.0.0
SERVER_PORT=8000
CORS_ORIGINS=["http://localhost:5173"]
ENVIRONMENT=production
DEBUG=false
```

### Frontend (.env)
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_ENVIRONMENT=production
VITE_DEBUG=false
```

---

## Database Setup

### SQLite (Development)
- Automatic creation
- Located at `backend/support_crm.db`
- No additional setup needed

### PostgreSQL (Production Recommended)

1. **Install PostgreSQL**
```bash
# macOS
brew install postgresql

# Ubuntu
sudo apt install postgresql postgresql-contrib

# Windows
# Download from https://www.postgresql.org/download/windows/
```

2. **Create database**
```bash
createdb support_crm
```

3. **Update connection string**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/support_crm
```

4. **Install PostgreSQL driver**
```bash
pip install psycopg2-binary
```

---

## Security Considerations

### Production Checklist

- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL
- [ ] Set DEBUG=false
- [ ] Configure CORS origins properly
- [ ] Use environment variables for secrets
- [ ] Enable database backups
- [ ] Set up monitoring and logging
- [ ] Configure firewall rules
- [ ] Use strong database passwords
- [ ] Keep dependencies updated

---

## Monitoring

### Logs

**Backend**
```bash
# Docker
docker logs -f support-crm-backend

# Systemd
sudo journalctl -u support-crm -f
```

**Frontend**
```bash
# Docker
docker logs -f support-crm-frontend
```

### Health Checks

Backend health endpoint:
```bash
curl http://localhost:8000/
```

### Performance Monitoring

Consider using:
- New Relic
- Datadog
- CloudWatch (AWS)
- Stackdriver (GCP)

---

## Backup and Recovery

### Database Backup

**SQLite**
```bash
cp support_crm.db support_crm.db.backup
```

**PostgreSQL**
```bash
pg_dump support_crm > backup.sql
```

### Restore

**SQLite**
```bash
cp support_crm.db.backup support_crm.db
```

**PostgreSQL**
```bash
psql support_crm < backup.sql
```

---

## Troubleshooting

### Common Issues

**CORS errors**
- Check CORS_ORIGINS configuration
- Ensure frontend URL matches exactly

**Database connection errors**
- Verify DATABASE_URL
- Check database service is running
- Verify database credentials

**Port already in use**
- Change port in configuration
- Kill existing process on port

**Dependencies not found**
- Reinstall requirements
- Check virtual environment activation

---

For more information, see [README.md](README.md) or [API.md](API.md).
