---
title: "Authentication & JWT"
description: "Xác thực người dùng với JWT và bcrypt"
difficulty: "Trung bình"
chapter: 4
---

# Authentication & JWT

## JWT là gì?

**JWT** (JSON Web Token) là chuẩn mã hóa thông tin người dùng thành token. Server không cần lưu session — token tự chứa thông tin.

```
Header.Payload.Signature
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.abc123...
```

## Cài đặt

```bash
npm install jsonwebtoken bcryptjs
```

## Hash mật khẩu với bcrypt

```javascript
const bcrypt = require('bcryptjs');

// Hash (khi đăng ký)
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash('matkhau123', salt);
console.log(hashedPassword); // $2a$10$xyz...

// So sánh (khi đăng nhập)
const isMatch = await bcrypt.compare('matkhau123', hashedPassword);
console.log(isMatch); // true
```

## Tạo & Verify JWT

```javascript
const jwt = require('jsonwebtoken');

const SECRET = 'my-secret-key-2024';

// Tạo token
function taoToken(userId) {
  return jwt.sign(
    { userId },        // payload
    SECRET,            // secret key
    { expiresIn: '7d' } // hết hạn sau 7 ngày
  );
}

// Verify token
function xacThucToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded; // { userId: 1, iat: ..., exp: ... }
  } catch (err) {
    return null;
  }
}
```

## Auth Middleware

```javascript
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token không hợp lệ' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = xacThucToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: 'Token hết hạn hoặc sai' });
  }

  req.userId = decoded.userId;
  next();
}
```

## Hệ thống Auth hoàn chỉnh

```javascript
// Đăng ký
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Kiểm tra email đã tồn tại
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email đã tồn tại' });
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Tạo user
  const user = await User.create({ name, email, password: hashedPassword });
  
  // Tạo token
  const token = taoToken(user._id);
  
  res.status(201).json({ user: { name, email }, token });
});

// Đăng nhập
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Email không tồn tại' });
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Sai mật khẩu' });
  
  const token = taoToken(user._id);
  res.json({ user: { name: user.name, email }, token });
});

// Route được bảo vệ
app.get('/api/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});
```

## Tóm tắt

- Dùng `bcrypt` hash mật khẩu, **KHÔNG BAO GIỜ** lưu plain text
- JWT: tạo token chứa thông tin user
- Auth middleware kiểm tra token mỗi request
- Flow: Register → Hash password → Tạo token → Client lưu token → Gửi kèm trong Header
