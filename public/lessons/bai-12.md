---
title: "Deploy & Docker"
description: "Deploy ứng dụng Node.js lên cloud và Docker cơ bản"
difficulty: "Nâng cao"
chapter: 5
---

# Deploy & Docker

## Chuẩn bị deploy

### Environment Variables

```javascript
// Dùng dotenv
require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
};

module.exports = config;
```

`.env` file (**KHÔNG** commit lên git):
```
PORT=3000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/mydb
JWT_SECRET=super-secret-key
NODE_ENV=production
```

### .gitignore

```
node_modules/
.env
dist/
*.log
```

## Docker cơ bản

### Dockerfile

```dockerfile
# Base image
FROM node:20-alpine

# Working directory
WORKDIR /app

# Copy package files trước (tận dụng cache)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "server.js"]
```

### .dockerignore

```
node_modules
.env
.git
*.md
```

### Docker commands

```bash
# Build image
docker build -t my-node-app .

# Run container
docker run -p 3000:3000 --env-file .env my-node-app

# Xem containers đang chạy
docker ps

# Stop container
docker stop <container-id>
```

## Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/mydb
      - NODE_ENV=production
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

```bash
# Chạy tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f app

# Dừng
docker-compose down
```

## Deploy lên các platform

### Railway / Render (miễn phí)

1. Push code lên GitHub
2. Kết nối repo với Railway/Render
3. Set environment variables
4. Auto deploy mỗi khi push code

### PM2 — Process Manager (VPS)

```bash
npm install -g pm2

# Start
pm2 start server.js --name "my-api"

# Cluster mode (tận dụng multi-core)
pm2 start server.js -i max

# Xem status
pm2 status

# Xem logs
pm2 logs

# Auto restart khi server reboot
pm2 startup
pm2 save
```

## Checklist trước khi deploy

- [ ] Tất cả secrets nằm trong `.env`
- [ ] `.env` nằm trong `.gitignore`
- [ ] Error handling đầy đủ
- [ ] CORS cấu hình đúng
- [ ] Helmet middleware (security headers)
- [ ] Rate limiting
- [ ] Compression middleware
- [ ] Health check endpoint

```javascript
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

app.use(helmet());
app.use(compression());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // tối đa 100 request
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});
```

## Tóm tắt

- Environment variables: `.env` + `dotenv`
- Docker: đóng gói app + dependencies thành container
- Docker Compose: quản lý multi-container
- PM2: process manager cho production
- Deploy: Railway, Render, hoặc VPS
- Luôn check security trước khi deploy 🔒
