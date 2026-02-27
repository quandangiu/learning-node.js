---
title: "npm & Package Management"  
description: "Quản lý dependencies, scripts, và semantic versioning"
difficulty: "Cơ bản"
chapter: 2
---

# npm & Package Management

## npm là gì?

**npm** (Node Package Manager) là công cụ quản lý package đi kèm Node.js. Với npm, bạn có thể:

- Cài đặt thư viện bên thứ 3
- Quản lý dependencies của project
- Chạy scripts tự động

## Khởi tạo project

```bash
# Tạo package.json
npm init

# Tạo nhanh (bỏ qua câu hỏi)
npm init -y
```

## Cài đặt package

```bash
# Cài dependency (production)
npm install express
npm i express          # viết tắt

# Cài devDependency
npm install --save-dev nodemon
npm i -D nodemon       # viết tắt

# Cài global
npm install -g nodemon
```

## package.json

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

## Semantic Versioning (SemVer)

Format: `MAJOR.MINOR.PATCH`

| Thay đổi | Ý nghĩa | Ví dụ |
|----------|---------|-------|
| MAJOR | Breaking changes | 1.0.0 → **2**.0.0 |
| MINOR | Thêm tính năng mới | 1.0.0 → 1.**1**.0 |
| PATCH | Sửa bug | 1.0.0 → 1.0.**1** |

### Ký hiệu version

```
^4.18.2  → >= 4.18.2, < 5.0.0  (cập nhật minor + patch)
~4.18.2  → >= 4.18.2, < 4.19.0 (chỉ cập nhật patch)
4.18.2   → chính xác version này
```

## npm Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "tsc",
    "lint": "eslint .",
    "test": "jest --coverage"
  }
}
```

```bash
npm start      # chạy script "start"
npm run dev    # chạy script "dev"
npm test       # chạy script "test"
```

## Các lệnh npm thường dùng

```bash
npm list              # Xem packages đã cài
npm outdated          # Xem packages cần update
npm update            # Update packages
npm uninstall express # Gỡ package
npm cache clean --force  # Xóa cache
```

## package-lock.json

- Khóa **chính xác** version của mọi dependency
- **LUÔN** commit file này vào git
- Đảm bảo team dùng cùng version

## Tóm tắt

- `npm init` — tạo project
- `npm install` — cài packages
- SemVer: `MAJOR.MINOR.PATCH`
- Scripts giúp tự động hóa công việc
- Commit `package-lock.json` vào git
