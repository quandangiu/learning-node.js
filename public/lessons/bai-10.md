---
title: "Error Handling"
description: "Xử lý lỗi chuyên nghiệp trong Node.js"
difficulty: "Trung bình"
chapter: 5
---

# Error Handling

## Tại sao Error Handling quan trọng?

Ứng dụng production **PHẢI** xử lý lỗi đúng cách. Nếu không, server sẽ crash khi gặp lỗi.

## Try-Catch

```javascript
// Sync
try {
  const data = JSON.parse('invalid json');
} catch (err) {
  console.error('Lỗi parse JSON:', err.message);
}

// Async/Await
async function layUser(id) {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User không tồn tại');
    return user;
  } catch (err) {
    console.error(err.message);
    throw err; // Re-throw nếu cần
  }
}
```

## Custom Error Class

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Không tìm thấy') {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Dữ liệu không hợp lệ') {
    super(message, 400);
  }
}

// Sử dụng
throw new NotFoundError('User không tồn tại');
throw new ValidationError('Email không hợp lệ');
```

## Express Error Middleware

```javascript
// asyncHandler wrapper — tránh viết try-catch trong mỗi route
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Route dùng asyncHandler
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new NotFoundError('User không tồn tại');
  res.json(user);
}));

// Global error handler (đặt cuối cùng)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Lỗi server';

  console.error(`[ERROR] ${statusCode} - ${err.message}`);

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});
```

## Unhandled Errors

```javascript
// Unhandled Promise Rejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Graceful shutdown
  server.close(() => process.exit(1));
});

// Uncaught Exception
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
```

## Validation với Joi

```javascript
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(120),
});

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) throw new ValidationError(error.details[0].message);
    next();
  };
}

app.post('/api/users', validate(userSchema), asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
}));
```

## Tóm tắt

- Luôn dùng try-catch cho async code
- Custom Error class giúp phân loại lỗi
- Express error middleware: 4 tham số `(err, req, res, next)`
- asyncHandler wrapper tránh lặp try-catch
- Xử lý unhandled errors để tránh crash
