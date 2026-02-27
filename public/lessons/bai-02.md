---
title: "Module System"
description: "Hiểu cách require, module.exports và ES Modules hoạt động"
difficulty: "Cơ bản"
chapter: 1
---

# Module System trong Node.js

## Tại sao cần Module?

Khi ứng dụng lớn lên, bạn không thể gom tất cả code vào 1 file. **Module** giúp chia code thành các phần nhỏ, dễ quản lý.

## CommonJS (CJS) — Cách truyền thống

### Tạo module

```javascript
// math.js
function cong(a, b) {
  return a + b;
}

function tru(a, b) {
  return a - b;
}

module.exports = { cong, tru };
```

### Sử dụng module

```javascript
// app.js
const { cong, tru } = require('./math');

console.log(cong(5, 3)); // 8
console.log(tru(10, 4)); // 6
```

## ES Modules (ESM) — Cách hiện đại

Thêm `"type": "module"` vào `package.json`:

```javascript
// math.mjs
export function cong(a, b) {
  return a + b;
}

export function tru(a, b) {
  return a - b;
}

export default { cong, tru };
```

```javascript
// app.mjs
import { cong, tru } from './math.mjs';
// hoặc
import math from './math.mjs';

console.log(cong(5, 3));
console.log(math.tru(10, 4));
```

## So sánh CJS vs ESM

| Đặc điểm | CommonJS | ES Modules |
|-----------|----------|------------|
| Cú pháp | `require()` / `module.exports` | `import` / `export` |
| Loading | Synchronous | Asynchronous |
| Top-level await | ❌ | ✅ |
| Mặc định Node.js | ✅ | Cần cấu hình |

## Built-in Modules

Node.js có sẵn nhiều module hữu ích:

```javascript
const path = require('path');
const fs = require('fs');
const os = require('os');

console.log(path.join('/home', 'user', 'file.txt'));
console.log(os.platform()); // win32, linux, darwin
console.log(os.cpus().length); // Số CPU cores
```

## Tóm tắt

- CommonJS: `require()` / `module.exports` — đồng bộ
- ES Modules: `import` / `export` — bất đồng bộ, hiện đại
- Node.js có nhiều built-in modules sẵn
- Tổ chức code thành modules giúp dễ maintain
