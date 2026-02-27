---
title: "Project: REST API"
description: "Xây dựng REST API hoàn chỉnh với Express + MongoDB"
difficulty: "Nâng cao"
chapter: 5
---

# Project: REST API hoàn chỉnh

## Cấu trúc Project

```
project/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── tasks.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── asyncHandler.js
│   └── app.js
├── .env
├── package.json
└── server.js
```

## 1. Setup

```bash
mkdir task-api && cd task-api
npm init -y
npm install express mongoose dotenv cors
npm install -D nodemon
```

`.env`:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskapi
```

## 2. Database Connection

```javascript
// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`✅ MongoDB: ${conn.connection.host}`);
};

module.exports = connectDB;
```

## 3. Model

```javascript
// src/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tiêu đề bắt buộc'],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Task', taskSchema);
```

## 4. Routes

```javascript
// src/routes/tasks.js
const router = require('express').Router();
const Task = require('../models/Task');
const asyncHandler = require('../middlewares/asyncHandler');

router.get('/', asyncHandler(async (req, res) => {
  const { completed, priority, sort } = req.query;
  const filter = {};
  if (completed !== undefined) filter.completed = completed === 'true';
  if (priority) filter.priority = priority;

  const tasks = await Task.find(filter)
    .sort(sort || '-createdAt')
    .limit(parseInt(req.query.limit) || 20);

  res.json({ count: tasks.length, data: tasks });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task không tồn tại');
  }
  res.json(task);
}));

router.post('/', asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) {
    res.status(404);
    throw new Error('Task không tồn tại');
  }
  res.json(task);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task không tồn tại');
  }
  res.json({ message: 'Đã xóa task' });
}));

module.exports = router;
```

## 5. App & Server

```javascript
// src/app.js
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Task API v1.0' });
});

app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

module.exports = app;
```

```javascript
// server.js
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
  });
});
```

## 6. Test với curl

```bash
# Tạo task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Học Node.js", "priority": "high"}'

# Lấy tất cả
curl http://localhost:3000/api/tasks

# Lấy theo ID
curl http://localhost:3000/api/tasks/ID_HERE

# Update
curl -X PUT http://localhost:3000/api/tasks/ID_HERE \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Xóa
curl -X DELETE http://localhost:3000/api/tasks/ID_HERE
```

## Tóm tắt

- Cấu trúc MVC giúp code sạch và scalable
- Tách config, models, routes, middlewares
- Query filtering, sorting, pagination
- Error handling tập trung
- Bạn đã build được 1 REST API hoàn chỉnh! 🎉
