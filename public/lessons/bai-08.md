---
title: "MongoDB & Mongoose"
description: "Kết nối database NoSQL và thao tác CRUD với Mongoose"
difficulty: "Trung bình"
chapter: 4
---

# MongoDB & Mongoose

## MongoDB là gì?

**MongoDB** là database NoSQL, lưu dữ liệu dạng **document** (JSON-like). Không cần định nghĩa schema cứng nhắc như SQL.

```json
{
  "_id": "ObjectId('...')",
  "name": "An",
  "email": "an@mail.com",
  "age": 25,
  "hobbies": ["coding", "gaming"]
}
```

## Cài đặt Mongoose

```bash
npm install mongoose
```

## Kết nối MongoDB

```javascript
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/myapp');
    console.log('✅ Đã kết nối MongoDB');
  } catch (err) {
    console.error('❌ Lỗi kết nối:', err.message);
    process.exit(1);
  }
}

connectDB();
```

## Tạo Schema & Model

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên là bắt buộc'],
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
```

## CRUD Operations

### Create

```javascript
// Tạo 1 document
const user = await User.create({
  name: 'An',
  email: 'an@mail.com',
  age: 25,
});

// Tạo nhiều
await User.insertMany([
  { name: 'Bình', email: 'binh@mail.com' },
  { name: 'Châu', email: 'chau@mail.com' },
]);
```

### Read

```javascript
// Lấy tất cả
const users = await User.find();

// Lấy theo điều kiện
const admins = await User.find({ role: 'admin' });

// Lấy 1 document
const user = await User.findById('64abc...');
const user = await User.findOne({ email: 'an@mail.com' });

// Select fields + sort + limit
const result = await User
  .find({ age: { $gte: 18 } })
  .select('name email')
  .sort({ createdAt: -1 })
  .limit(10);
```

### Update

```javascript
// Update 1
await User.findByIdAndUpdate(id, { name: 'An Updated' }, { new: true });

// Update nhiều
await User.updateMany({ role: 'user' }, { $set: { active: true } });
```

### Delete

```javascript
await User.findByIdAndDelete(id);
await User.deleteMany({ active: false });
```

## Kết hợp Express + Mongoose

```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Routes
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
```

## Tóm tắt

- MongoDB: NoSQL database, document-based
- Mongoose: ODM library cho MongoDB
- Schema định nghĩa cấu trúc data
- CRUD: create, find, findById, update, delete
- Kết hợp Express + Mongoose = REST API hoàn chỉnh
