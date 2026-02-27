---
title: "Express.js Framework"
description: "Xây dựng REST API chuyên nghiệp với Express.js"
difficulty: "Trung bình"
chapter: 3
---

# Express.js Framework

## Cài đặt

```bash
npm init -y
npm install express
```

## Server Express đầu tiên

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello Express!' });
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
```

## RESTful API — CRUD

```javascript
let users = [
  { id: 1, name: 'An', email: 'an@mail.com' },
  { id: 2, name: 'Bình', email: 'binh@mail.com' },
];

// GET - Lấy tất cả
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET - Lấy theo ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Không tìm thấy' });
  res.json(user);
});

// POST - Tạo mới
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Cập nhật
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Không tìm thấy' });
  
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
});

// DELETE - Xóa
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Không tìm thấy' });
  
  users.splice(index, 1);
  res.json({ message: 'Đã xóa' });
});
```

## Middleware

```javascript
// Middleware log request
function logger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next(); // Gọi next() để tiếp tục
}

app.use(logger);

// Middleware xác thực
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Chưa đăng nhập' });
  next();
}

// Áp dụng cho route cụ thể
app.get('/api/profile', auth, (req, res) => {
  res.json({ name: 'User', role: 'admin' });
});
```

## Router — Tách route

```javascript
// routes/users.js
const router = require('express').Router();

router.get('/', (req, res) => { /* ... */ });
router.post('/', (req, res) => { /* ... */ });
router.get('/:id', (req, res) => { /* ... */ });

module.exports = router;

// app.js
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
```

## Error Handling

```javascript
// Error handler middleware (4 params)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});
```

## Tóm tắt

- Express đơn giản hóa việc tạo HTTP server
- RESTful: GET, POST, PUT, DELETE
- Middleware: xử lý request trước khi đến route
- Router: tách code theo module
- Error handling: middleware 4 tham số
