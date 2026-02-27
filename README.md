# 🟢 Node.js Learning Platform

Nền tảng học Node.js tương tác — từ cơ bản đến nâng cao. Được xây dựng bằng **React + Vite + Material UI**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![MUI](https://img.shields.io/badge/MUI-7-007FFF?logo=mui)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Tính năng

- 📚 **12 bài học** Node.js từ cơ bản đến deploy
- 🖥️ **Code Playground** — viết và chạy JavaScript ngay trên trình duyệt (Monaco Editor)
- 📝 **Bài tập thực hành** — có starter code, gợi ý, và lời giải tham khảo
- ❓ **Quiz trắc nghiệm** — kiểm tra kiến thức sau mỗi bài, có giải thích đáp án
- 📊 **Theo dõi tiến độ** — đánh dấu hoàn thành, lưu trên localStorage
- 🌙 **Dark / Light mode** — lưu tùy chọn người dùng
- 📱 **Responsive** — hiển thị tốt trên mọi thiết bị

---

## 📖 Nội dung bài học

| # | Bài học | Chương | Độ khó |
|---|--------|--------|--------|
| 1 | Node.js là gì? Cài đặt & Hello World | Nền Tảng Node.js | 🟢 Newbie |
| 2 | NPM & Quản lý Package | Nền Tảng Node.js | 🟢 Newbie |
| 3 | Module System (CJS & ESM) | Nền Tảng Node.js | 🟢 Newbie |
| 4 | Event Loop & Async Programming | Cơ Chế Hoạt Động | 🟡 Intermediate |
| 5 | File System (fs) | Cơ Chế Hoạt Động | 🟢 Newbie |
| 6 | HTTP Server cơ bản | Xây Dựng Server | 🟡 Intermediate |
| 7 | Express.js Framework | Xây Dựng Server | 🟡 Intermediate |
| 8 | MongoDB & Mongoose | Database | 🟡 Intermediate |
| 9 | Authentication & JWT | Database | 🟡 Intermediate |
| 10 | Error Handling | Thực Chiến & Deploy | 🟡 Intermediate |
| 11 | Project: REST API hoàn chỉnh | Thực Chiến & Deploy | 🔴 Senior |
| 12 | Deploy & Docker | Thực Chiến & Deploy | 🔴 Senior |

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Mục đích |
|-----------|---------|
| [React 19](https://react.dev) | UI Framework |
| [Vite 6](https://vite.dev) | Build tool |
| [Material UI 7](https://mui.com) | Component library |
| [React Router](https://reactrouter.com) | Routing SPA |
| [react-markdown](https://github.com/remarkjs/react-markdown) | Render Markdown |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Parse YAML frontmatter |
| [rehype-highlight](https://github.com/rehypejs/rehype-highlight) | Syntax highlighting |
| [Monaco Editor](https://microsoft.github.io/monaco-editor/) | Code editor (Code Playground) |

---

## 🚀 Cài đặt & Chạy

### Yêu cầu

- [Node.js](https://nodejs.org) >= 18
- npm >= 9

### Các bước

```bash
# 1. Clone repo
git clone https://github.com/quandangiu/learning-node.js.git

# 2. Vào thư mục project
cd learning-node.js

# 3. Cài đặt dependencies
npm install

# 4. Chạy development server
npm run dev
```

Mở trình duyệt tại **http://localhost:5173**

### Build production

```bash
npm run build
npm run preview
```

---

## 📁 Cấu trúc thư mục

```
nodejs-learning/
├── public/
│   └── lessons/          # 12 file bài học Markdown (.md)
│       ├── bai-01.md
│       ├── bai-02.md
│       └── ...
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # AppBar + Sidebar + Content
│   │   ├── Sidebar.jsx         # Navigation theo chương
│   │   ├── MarkdownRenderer.jsx # Render .md với MUI components
│   │   ├── CodePlayground.jsx  # Monaco Editor + chạy JS
│   │   ├── Quiz.jsx            # Trắc nghiệm kiểm tra
│   │   ├── ExerciseBlock.jsx   # Bài tập thực hành
│   │   ├── ProgressTracker.jsx # Theo dõi tiến độ
│   │   ├── BackToTop.jsx       # Nút cuộn lên đầu
│   │   └── ScrollToTop.jsx     # Auto scroll khi chuyển trang
│   ├── pages/
│   │   ├── Home.jsx            # Trang chủ + tổng quan
│   │   └── LessonPage.jsx      # Trang đọc bài học
│   ├── data/
│   │   └── lessons.js          # Dữ liệu 12 bài học + quiz + bài tập
│   ├── theme/
│   │   └── theme.js            # Cấu hình MUI theme
│   ├── App.jsx                 # Router + Theme Provider
│   ├── main.jsx                # Entry point + Buffer polyfill
│   └── index.css               # Global CSS
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🎯 Cách sử dụng

1. **Trang chủ** — xem tổng quan tất cả bài học, tiến độ hiện tại
2. **Sidebar** — chọn bài học theo chương, mở rộng/thu gọn
3. **Đọc bài** — nội dung Markdown với syntax highlighting
4. **Code Playground** — viết code JS, bấm "Chạy" để xem output
5. **Bài tập** — thực hành với starter code, xem gợi ý hoặc lời giải
6. **Quiz** — trả lời trắc nghiệm, xem điểm và giải thích
7. **Tiến độ** — bấm "Đánh dấu hoàn thành" sau khi học xong
8. **Dark mode** — bấm icon 🌙 trên thanh AppBar

---

## 📝 Thêm bài học mới

1. Tạo file `.md` trong `public/lessons/` (ví dụ: `bai-13.md`)
2. Thêm frontmatter YAML:

```markdown
---
title: "Tên bài học"
description: "Mô tả ngắn"
difficulty: "Intermediate"
chapter: 3
---

# Nội dung bài học...
```

3. Thêm metadata vào `src/data/lessons.js`:

```javascript
{
  id: 13,
  title: "Tên bài học",
  chapter: "Chương X: ...",
  description: "Mô tả",
  difficulty: "Intermediate",
  file: "bai-13.md",
  tags: ["tag1", "tag2"],
  exercises: [],
  quiz: [],
}
```

---

## 📄 License

MIT — Tự do sử dụng, chỉnh sửa và chia sẻ.

---

> Được tạo bởi [quandangiu](https://github.com/quandangiu) 💚
