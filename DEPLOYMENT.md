# Deployment Guide for Todo App

This guide will help you deploy the React frontend and NestJS backend to a VPS without a domain name.

## Prerequisites

1. A VPS with SSH access
2. Docker and Docker Compose installed on your VPS
3. Git installed on your VPS

## Deployment Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url> /opt/todo-app
cd /opt/todo-app
```

### 2. Build and Start the Services

```bash
docker-compose up -d
```

This will:
- Build the frontend and backend Docker images
- Start all services (frontend, backend, and MongoDB)
- Expose the application on port 8080

### 3. Access Your Application

You can access your application by navigating to your VPS's IP address in a web browser:

```
http://YOUR_VPS_IP:8080
```

## Security Considerations

This setup is configured for basic deployment. For production use, consider:

1. Setting up a firewall to only expose necessary ports
2. Adding authentication for MongoDB
3. Using environment variables for sensitive information
4. Setting up SSL/TLS (you can add this later when you have a domain)

## Maintenance

### Viewing Logs

```bash
# View logs for all services
docker-compose logs

# View logs for a specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongodb
```

### Updating the Application

To update after code changes:

```bash
git pull
docker-compose down
docker-compose up -d --build
```

### Managing MongoDB Data

The MongoDB data is persisted in a Docker volume. To backup the data:

```bash
docker-compose exec mongodb mongodump --out=/tmp/backup
docker cp $(docker-compose ps -q mongodb):/tmp/backup ./backup
```

## Troubleshooting

1. **Frontend can't connect to backend**:
   - Check that the CORS_ORIGINS environment variable includes your VPS IP address
   - Verify that the Nginx proxy is correctly routing /api requests to the backend

2. **MongoDB connection issues**:
   - Check the MongoDB container is running: `docker-compose ps`
   - Verify the connection string in the backend environment variables

3. **Application crashes**:
   - Check the logs with `docker-compose logs`
   - Ensure your VPS has enough resources (memory and CPU) 