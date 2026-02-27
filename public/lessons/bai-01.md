---
title: "Node.js là gì?"
description: "Tìm hiểu Node.js là gì, tại sao nó quan trọng, và cách cài đặt"
difficulty: "Cơ bản"
chapter: 1
---

# Node.js là gì?

## Giới thiệu

**Node.js** là một nền tảng chạy JavaScript ở phía **server** (backend), được xây dựng trên **V8 JavaScript Engine** của Google Chrome.

> Trước Node.js, JavaScript chỉ chạy được trong trình duyệt. Node.js ra đời đã thay đổi hoàn toàn điều này.

## Tại sao dùng Node.js?

| Ưu điểm | Mô tả |
|----------|-------|
| **Nhanh** | V8 engine biên dịch JS thành machine code |
| **Non-blocking I/O** | Xử lý nhiều request mà không block |
| **NPM** | Hệ sinh thái package lớn nhất thế giới |
| **Full-stack JS** | Dùng 1 ngôn ngữ cho cả frontend & backend |

## Cài đặt Node.js

1. Truy cập [nodejs.org](https://nodejs.org)
2. Tải bản **LTS** (Long Term Support)
3. Cài đặt và kiểm tra:

```bash
node --version
npm --version
```

## Chạy file JavaScript đầu tiên

Tạo file `hello.js`:

```javascript
// hello.js
const name = "Node.js";
console.log(`Xin chào ${name}!`);
console.log(`Node version: ${process.version}`);
```

Chạy lệnh:

```bash
node hello.js
```

## REPL (Read-Eval-Print-Loop)

Bạn có thể gõ `node` trong terminal để vào chế độ REPL:

```javascript
> 2 + 3
5
> "Hello".toUpperCase()
'HELLO'
> Date.now()
1700000000000
```

## Tóm tắt

- Node.js cho phép chạy JavaScript ở server
- Sử dụng V8 engine, rất nhanh
- Non-blocking I/O giúp xử lý đồng thời
- NPM cung cấp hàng triệu package
