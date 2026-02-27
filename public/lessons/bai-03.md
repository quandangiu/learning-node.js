---
title: "Event Loop & Async"
description: "Hiểu cơ chế Event Loop, callback, Promise và async/await"
difficulty: "Trung bình"
chapter: 2
---

# Event Loop & Lập trình bất đồng bộ

## Event Loop là gì?

Event Loop là **trái tim** của Node.js. Nó cho phép Node.js xử lý hàng nghìn request đồng thời mà chỉ dùng **1 thread**.

```
   ┌───────────────────────────┐
┌─>│           timers          │ ← setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ ← I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ ← setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │      close callbacks      │
│  └─────────────┬─────────────┘
└─────────────────┘
```

## Callback — Cách cổ điển

```javascript
function layDuLieu(callback) {
  setTimeout(() => {
    callback(null, { name: "Node.js", version: "20" });
  }, 1000);
}

layDuLieu((err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

### Callback Hell 😱

```javascript
getUserById(1, (err, user) => {
  getOrdersByUser(user.id, (err, orders) => {
    getProductById(orders[0].productId, (err, product) => {
      console.log(product); // Pyramid of Doom
    });
  });
});
```

## Promise — Giải pháp tốt hơn

```javascript
function doi(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Đã đợi ${ms}ms`), ms);
  });
}

doi(1000)
  .then((msg) => {
    console.log(msg);
    return doi(500);
  })
  .then((msg) => console.log(msg))
  .catch((err) => console.error(err));
```

## Async/Await — Viết async như sync

```javascript
async function main() {
  try {
    const msg1 = await doi(1000);
    console.log(msg1);
    
    const msg2 = await doi(500);
    console.log(msg2);
    
    // Chạy song song
    const [a, b] = await Promise.all([doi(1000), doi(2000)]);
    console.log(a, b);
  } catch (err) {
    console.error("Lỗi:", err);
  }
}

main();
```

## Thứ tự thực thi

```javascript
console.log("1 - Sync");

setTimeout(() => console.log("2 - setTimeout"), 0);

Promise.resolve().then(() => console.log("3 - Promise (microtask)"));

process.nextTick(() => console.log("4 - nextTick"));

console.log("5 - Sync");

// Output: 1, 5, 4, 3, 2
```

> **Quy tắc**: Sync > `nextTick` > Microtask (Promise) > Macrotask (setTimeout)

## Tóm tắt

- Event Loop cho phép Node.js xử lý async với single thread
- Callback → Promise → Async/Await: tiến hóa của async
- `Promise.all()` để chạy song song
- Hiểu thứ tự: sync → nextTick → microtask → macrotask
