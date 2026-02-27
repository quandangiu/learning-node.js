---
title: "HTTP Server cơ bản"
description: "Tạo web server đầu tiên với module http"
difficulty: "Cơ bản"
chapter: 3
---

# HTTP Server cơ bản

## Tạo server đầu tiên

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Xin chào từ Node.js server!');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
```

Chạy: `node server.js` → Mở trình duyệt: `http://localhost:3000`

## Xử lý Routing

```javascript
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  switch (req.url) {
    case '/':
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Trang chủ' }));
      break;
    case '/about':
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Giới thiệu' }));
      break;
    case '/api/users':
      res.writeHead(200);
      res.end(JSON.stringify([
        { id: 1, name: 'An' },
        { id: 2, name: 'Bình' },
      ]));
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Không tìm thấy' }));
  }
});
```

## Xử lý HTTP Methods

```javascript
const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  if (method === 'GET' && url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: [] }));
    
  } else if (method === 'POST' && url === '/api/users') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      const user = JSON.parse(body);
      console.log('User mới:', user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Đã tạo user', user }));
    });
    
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});
```

## Serve static file

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
};

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('File not found');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});
```

## Tóm tắt

- `http.createServer()` — tạo HTTP server
- `req.url`, `req.method` — lấy thông tin request
- `res.writeHead()` — set status code & headers
- `res.end()` — gửi response
- Đây là nền tảng — Express.js sẽ giúp đơn giản hóa
