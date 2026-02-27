---
title: "File System (fs)"
description: "Đọc, ghi, xóa file và thư mục với Node.js"
difficulty: "Cơ bản"
chapter: 2
---

# File System (fs) Module

## Giới thiệu

Module `fs` cho phép bạn làm việc với file system: đọc file, ghi file, tạo thư mục, xóa file,...

```javascript
const fs = require('fs');
const fsp = require('fs/promises'); // Promise version
```

## Đọc file

### Đọc đồng bộ (Sync)

```javascript
const data = fs.readFileSync('hello.txt', 'utf-8');
console.log(data);
```

### Đọc bất đồng bộ (Callback)

```javascript
fs.readFile('hello.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Lỗi:', err.message);
    return;
  }
  console.log(data);
});
```

### Đọc bất đồng bộ (Promise)

```javascript
const fsp = require('fs/promises');

async function docFile() {
  try {
    const data = await fsp.readFile('hello.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.error('Lỗi:', err.message);
  }
}

docFile();
```

## Ghi file

```javascript
// Ghi mới (overwrite)
fs.writeFileSync('output.txt', 'Nội dung mới');

// Ghi thêm (append)
fs.appendFileSync('output.txt', '\nDòng mới');

// Async version
await fsp.writeFile('output.txt', 'Hello async!');
```

## Kiểm tra file tồn tại

```javascript
if (fs.existsSync('config.json')) {
  console.log('File tồn tại');
}

// Hoặc dùng access
try {
  await fsp.access('config.json');
  console.log('File tồn tại');
} catch {
  console.log('File không tồn tại');
}
```

## Thao tác thư mục

```javascript
// Tạo thư mục
fs.mkdirSync('my-folder', { recursive: true });

// Đọc danh sách file
const files = fs.readdirSync('.');
console.log(files);

// Xóa file
fs.unlinkSync('temp.txt');

// Xóa thư mục
fs.rmSync('my-folder', { recursive: true });
```

## Thông tin file (Stats)

```javascript
const stats = fs.statSync('hello.txt');
console.log({
  isFile: stats.isFile(),
  isDirectory: stats.isDirectory(),
  size: stats.size,           // bytes
  modified: stats.mtime,       // last modified
});
```

## Watch file thay đổi

```javascript
fs.watch('hello.txt', (eventType, filename) => {
  console.log(`${filename} đã ${eventType}`);
});
```

## Tóm tắt

- `fs.readFileSync` / `fs.readFile` / `fsp.readFile` — đọc file
- `fs.writeFileSync` / `fsp.writeFile` — ghi file
- `fs.mkdirSync` — tạo thư mục
- `fs.readdirSync` — liệt kê file
- Luôn ưu tiên dùng **async** (Promise version) trong production
