const lessons = [
  {
    id: 1,
    title: "Node.js là gì? Cài đặt & Hello World",
    chapter: "Chương 1: Nền Tảng Node.js",
    description: "Hiểu Node.js, cài đặt, chạy file JS đầu tiên.",
    difficulty: "Newbie",
    file: "bai-01.md",
    tags: ["node", "setup"],
    exercises: [
      {
        title: "Hello World",
        description: "In ra lời chào bằng console.log",
        requirements: [
          "Dùng console.log in ra 'Xin chào từ Node.js!'",
          "In ra tên của bạn ở dòng thứ hai",
        ],
        starterCode:
          '// Bài tập: In ra lời chào\n// Gợi ý: dùng console.log("text")\n\n',
        solutionCode:
          'console.log("Xin chào từ Node.js!");\nconsole.log("Tôi là Quan");',
        expectedOutput: null,
        hint: 'Dùng console.log("text") để in ra terminal',
        difficulty: "Dễ",
      },
      {
        title: "Máy tính mini",
        description: "Khai báo 2 biến số và thực hiện phép tính",
        requirements: [
          "Khai báo biến a = 15, b = 4",
          "In ra kết quả cộng, trừ, nhân, chia, chia lấy dư",
        ],
        starterCode:
          "// Khai báo 2 biến\nconst a = 15;\nconst b = 4;\n\n// In ra 5 phép tính\n",
        solutionCode:
          'const a = 15;\nconst b = 4;\nconsole.log("Cộng:", a + b);\nconsole.log("Trừ:", a - b);\nconsole.log("Nhân:", a * b);\nconsole.log("Chia:", a / b);\nconsole.log("Dư:", a % b);',
        expectedOutput: null,
        hint: "Phép chia lấy dư dùng toán tử %",
        difficulty: "Dễ",
      },
    ],
    quiz: [
      {
        question: "Node.js là gì?",
        options: [
          "Một ngôn ngữ lập trình mới",
          "Một framework JavaScript",
          "Một runtime environment cho JavaScript",
          "Một trình duyệt web",
        ],
        answer: 2,
        explanation:
          "Node.js là runtime environment — cho phép chạy JavaScript bên ngoài trình duyệt, trực tiếp trên máy tính/server.",
      },
      {
        question: "Lệnh nào kiểm tra phiên bản Node.js đã cài?",
        options: ["npm -v", "node --version", "node -v", "nodejs -v"],
        answer: 2,
        explanation:
          "Cả 'node -v' và 'node --version' đều hoạt động, nhưng 'node -v' là cách viết ngắn gọn phổ biến nhất.",
      },
      {
        question: "Object nào chỉ có trong Node.js mà KHÔNG có trên trình duyệt?",
        options: ["window", "document", "process", "alert"],
        answer: 2,
        explanation:
          "Object 'process' chứa thông tin về tiến trình Node.js đang chạy. 'window' và 'document' chỉ có trên trình duyệt.",
      },
    ],
  },
  {
    id: 2,
    title: "NPM & Quản lý Package",
    chapter: "Chương 1: Nền Tảng Node.js",
    description: "Hiểu npm, package.json, cài/gỡ thư viện.",
    difficulty: "Newbie",
    file: "bai-02.md",
    tags: ["npm", "package"],
    exercises: [
      {
        title: "Đọc package.json",
        description: "Phân tích nội dung package.json",
        requirements: [
          "Tạo object mô phỏng package.json",
          "In ra tên project và version",
        ],
        starterCode:
          '// Tạo object giả lập package.json\nconst pkg = {\n  name: "my-app",\n  version: "1.0.0",\n  // thêm description và author\n};\n\n// In ra tên và version\n',
        solutionCode:
          'const pkg = {\n  name: "my-app",\n  version: "1.0.0",\n  description: "Ứng dụng Node.js đầu tiên",\n  author: "Quan"\n};\n\nconsole.log("Tên:", pkg.name);\nconsole.log("Version:", pkg.version);\nconsole.log("Mô tả:", pkg.description);',
        expectedOutput: null,
        hint: "Truy cập property bằng dấu chấm: pkg.name",
        difficulty: "Dễ",
      },
    ],
    quiz: [
      {
        question: "NPM là viết tắt của gì?",
        options: [
          "Node Package Manager",
          "New Programming Module",
          "Node Program Manager",
          "Network Package Manager",
        ],
        answer: 0,
        explanation: "NPM = Node Package Manager — trình quản lý các gói (package/library) cho Node.js.",
      },
      {
        question: "Lệnh nào tạo file package.json?",
        options: ["npm create", "npm init -y", "npm start", "npm new"],
        answer: 1,
        explanation: "npm init -y tạo package.json với các giá trị mặc định. Bỏ -y để trả lời từng câu hỏi.",
      },
    ],
  },
  {
    id: 3,
    title: "Module System — require & export",
    chapter: "Chương 1: Nền Tảng Node.js",
    description: "Chia code thành module, CommonJS vs ES Module.",
    difficulty: "Newbie",
    file: "bai-03.md",
    tags: ["module", "require", "export"],
    exercises: [
      {
        title: "Tạo hàm tiện ích",
        description: "Viết các hàm xử lý chuỗi và số",
        requirements: [
          "Viết hàm capitalize(str) — viết hoa chữ cái đầu",
          "Viết hàm sum(a, b) — trả về tổng",
          "Gọi và in kết quả 2 hàm",
        ],
        starterCode:
          '// Viết hàm capitalize: viết hoa chữ cái đầu\nfunction capitalize(str) {\n  // code ở đây\n}\n\n// Viết hàm sum: cộng 2 số\nfunction sum(a, b) {\n  // code ở đây\n}\n\n// Test\nconsole.log(capitalize("hello"));\nconsole.log(sum(3, 7));',
        solutionCode:
          'function capitalize(str) {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}\n\nfunction sum(a, b) {\n  return a + b;\n}\n\nconsole.log(capitalize("hello")); // Hello\nconsole.log(sum(3, 7)); // 10',
        expectedOutput: "Hello\n10",
        hint: "str.charAt(0).toUpperCase() lấy và viết hoa chữ đầu, str.slice(1) lấy phần còn lại",
        difficulty: "Dễ",
      },
    ],
    quiz: [
      {
        question: "Hàm nào dùng để import module trong CommonJS?",
        options: ["import()", "require()", "include()", "load()"],
        answer: 1,
        explanation: "CommonJS dùng require() để import và module.exports để export.",
      },
    ],
  },
  {
    id: 4,
    title: "Core Modules: fs, path, os",
    chapter: "Chương 2: Core Modules & Server",
    description: "Đọc/ghi file, xử lý đường dẫn, thông tin hệ thống.",
    difficulty: "Newbie",
    file: "bai-04.md",
    tags: ["fs", "path", "os"],
    exercises: [
      {
        title: "Xử lý mảng dữ liệu",
        description: "Giả lập đọc dữ liệu từ file và xử lý",
        requirements: [
          "Tạo mảng users chứa 3 object {name, age}",
          "Lọc ra user có age >= 18",
          'Chuyển thành chuỗi JSON (giả lập ghi file)',
        ],
        starterCode:
          '// Giả lập data đọc từ file\nconst users = [\n  { name: "An", age: 16 },\n  { name: "Bình", age: 22 },\n  { name: "Châu", age: 19 },\n];\n\n// Lọc user >= 18 tuổi\n\n// Chuyển thành JSON string\n',
        solutionCode:
          'const users = [\n  { name: "An", age: 16 },\n  { name: "Bình", age: 22 },\n  { name: "Châu", age: 19 },\n];\n\nconst adults = users.filter(u => u.age >= 18);\nconsole.log("Người lớn:", adults);\n\nconst json = JSON.stringify(adults, null, 2);\nconsole.log("JSON output:\\n" + json);',
        expectedOutput: null,
        hint: "Dùng array.filter() để lọc, JSON.stringify(data, null, 2) để format đẹp",
        difficulty: "Trung bình",
      },
    ],
    quiz: [
      {
        question: "Module nào dùng để đọc/ghi file trong Node.js?",
        options: ["file", "fs", "io", "disk"],
        answer: 1,
        explanation: "Module 'fs' (File System) cung cấp các hàm đọc, ghi, xóa, đổi tên file.",
      },
    ],
  },
  {
    id: 5,
    title: "Tạo HTTP Server đầu tiên",
    chapter: "Chương 2: Core Modules & Server",
    description: "Dùng module http tạo server, hiểu Request/Response.",
    difficulty: "Intermediate",
    file: "bai-05.md",
    tags: ["http", "server"],
    exercises: [
      {
        title: "Xử lý Request URL",
        description: "Viết logic routing đơn giản",
        requirements: [
          "Viết hàm handleRoute(url) nhận URL string",
          'Trả về "Trang chủ" nếu url = "/"',
          'Trả về "Giới thiệu" nếu url = "/about"',
          'Trả về "404 Not Found" cho URL khác',
        ],
        starterCode:
          'function handleRoute(url) {\n  // Viết logic ở đây\n}\n\n// Test\nconsole.log(handleRoute("/"));\nconsole.log(handleRoute("/about"));\nconsole.log(handleRoute("/xyz"));',
        solutionCode:
          'function handleRoute(url) {\n  if (url === "/") return "Trang chủ";\n  if (url === "/about") return "Giới thiệu";\n  return "404 Not Found";\n}\n\nconsole.log(handleRoute("/"));\nconsole.log(handleRoute("/about"));\nconsole.log(handleRoute("/xyz"));',
        expectedOutput: "Trang chủ\nGiới thiệu\n404 Not Found",
        hint: "Dùng if/else hoặc switch để kiểm tra giá trị url",
        difficulty: "Dễ",
      },
    ],
    quiz: [
      {
        question: "Server HTTP trong Node.js được tạo bằng hàm nào?",
        options: [
          "http.startServer()",
          "http.createServer()",
          "http.listen()",
          "http.newServer()",
        ],
        answer: 1,
        explanation:
          "http.createServer(callback) tạo server, sau đó gọi .listen(port) để bắt đầu lắng nghe request.",
      },
    ],
  },
  {
    id: 6,
    title: "Express.js — Framework gọn nhẹ",
    chapter: "Chương 3: Express.js & API",
    description: "Cài Express, tạo server, routing, middleware cơ bản.",
    difficulty: "Intermediate",
    file: "bai-06.md",
    tags: ["express", "routing"],
    exercises: [
      {
        title: "Thiết kế Routes",
        description: "Liệt kê các routes cho ứng dụng quản lý sách",
        requirements: [
          "Tạo mảng routes, mỗi phần tử là object {method, path, description}",
          "Bao gồm: GET all, GET by id, POST, PUT, DELETE",
          "In ra bảng routes",
        ],
        starterCode:
          '// Thiết kế routes cho API quản lý sách\nconst routes = [\n  // Thêm 5 route CRUD ở đây\n];\n\n// In ra bảng\nroutes.forEach(r => {\n  console.log(`${r.method.padEnd(8)} ${r.path.padEnd(20)} → ${r.description}`);\n});',
        solutionCode:
          'const routes = [\n  { method: "GET",    path: "/api/books",     description: "Lấy tất cả sách" },\n  { method: "GET",    path: "/api/books/:id", description: "Lấy 1 cuốn sách theo ID" },\n  { method: "POST",   path: "/api/books",     description: "Thêm sách mới" },\n  { method: "PUT",    path: "/api/books/:id", description: "Cập nhật sách theo ID" },\n  { method: "DELETE", path: "/api/books/:id", description: "Xóa sách theo ID" },\n];\n\nroutes.forEach(r => {\n  console.log(`${r.method.padEnd(8)} ${r.path.padEnd(20)} → ${r.description}`);\n});',
        expectedOutput: null,
        hint: "5 route CRUD cơ bản: GET all, GET one, POST, PUT, DELETE",
        difficulty: "Dễ",
      },
    ],
    quiz: [
      {
        question: "Express.js là gì?",
        options: [
          "Một ngôn ngữ lập trình",
          "Một web framework cho Node.js",
          "Một database",
          "Một trình duyệt",
        ],
        answer: 1,
        explanation:
          "Express.js là web framework tối giản và linh hoạt nhất cho Node.js, giúp tạo server và API nhanh chóng.",
      },
    ],
  },
  {
    id: 7,
    title: "Middleware — Trạm kiểm soát Request",
    chapter: "Chương 3: Express.js & API",
    description: "Viết middleware, dùng CORS/Helmet/Morgan.",
    difficulty: "Intermediate",
    file: "bai-07.md",
    tags: ["middleware", "cors", "helmet"],
    exercises: [
      {
        title: "Giả lập Middleware Pipeline",
        description: "Viết chuỗi middleware đơn giản",
        requirements: [
          "Tạo 3 hàm middleware: logger, auth, handler",
          "Mỗi hàm nhận (req, next) và gọi next() để chuyển tiếp",
          "Chạy middleware theo thứ tự",
        ],
        starterCode:
          '// Giả lập middleware pipeline\nfunction logger(req, next) {\n  console.log("[LOG]", req.method, req.url);\n  next(); // Chuyển tiếp\n}\n\nfunction auth(req, next) {\n  // Kiểm tra req.token\n  // Nếu có token → next()\n  // Nếu không → in lỗi\n}\n\nfunction handler(req, next) {\n  // Xử lý request\n  console.log("Response: 200 OK");\n}\n\n// Giả lập request\nconst req = { method: "GET", url: "/api/users", token: "abc123" };\n\n// Chạy pipeline: logger → auth → handler',
        solutionCode:
          'function logger(req, next) {\n  console.log("[LOG]", req.method, req.url);\n  next();\n}\n\nfunction auth(req, next) {\n  if (req.token) {\n    console.log("[AUTH] Token hợp lệ");\n    next();\n  } else {\n    console.log("[AUTH] ❌ Không có token!");\n  }\n}\n\nfunction handler(req) {\n  console.log("[HANDLER] Response: 200 OK");\n}\n\nconst req = { method: "GET", url: "/api/users", token: "abc123" };\n\n// Chạy pipeline\nlogger(req, () => {\n  auth(req, () => {\n    handler(req);\n  });\n});',
        expectedOutput:
          "[LOG] GET /api/users\n[AUTH] Token hợp lệ\n[HANDLER] Response: 200 OK",
        hint: "Middleware gọi next() để chuyển sang middleware tiếp theo trong chuỗi",
        difficulty: "Trung bình",
      },
    ],
    quiz: [
      {
        question: "Middleware trong Express thực thi theo thứ tự nào?",
        options: [
          "Ngẫu nhiên",
          "Từ dưới lên trên",
          "Theo thứ tự khai báo (trên xuống dưới)",
          "Theo alphabet",
        ],
        answer: 2,
        explanation:
          "Middleware chạy theo thứ tự được khai báo bằng app.use(). Hãy cẩn thận với thứ tự!",
      },
    ],
  },
  {
    id: 8,
    title: "RESTful API & CRUD hoàn chỉnh",
    chapter: "Chương 3: Express.js & API",
    description: "Thiết kế REST API chuẩn, code CRUD đầy đủ.",
    difficulty: "Intermediate",
    file: "bai-08.md",
    tags: ["rest", "api", "crud"],
    exercises: [
      {
        title: "CRUD với mảng",
        description: "Implement đầy đủ CRUD operations trên mảng JavaScript",
        requirements: [
          "Tạo mảng products ban đầu",
          "Viết hàm: getAll, getById, create, update, remove",
          "Test tất cả các hàm",
        ],
        starterCode:
          'let products = [\n  { id: 1, name: "Laptop", price: 1000 },\n  { id: 2, name: "Phone", price: 500 },\n];\nlet nextId = 3;\n\n// GET ALL\nfunction getAll() {\n  return products;\n}\n\n// GET BY ID\nfunction getById(id) {\n  // tìm product theo id\n}\n\n// CREATE\nfunction create(name, price) {\n  // tạo product mới, thêm vào mảng\n}\n\n// UPDATE\nfunction update(id, name, price) {\n  // tìm và cập nhật product\n}\n\n// DELETE\nfunction remove(id) {\n  // xóa product khỏi mảng\n}\n\n// Test\nconsole.log("All:", getAll());\ncreate("Tablet", 300);\nconsole.log("After create:", getAll());\nupdate(1, "Gaming Laptop", 1500);\nconsole.log("After update:", getAll());\nremove(2);\nconsole.log("After delete:", getAll());',
        solutionCode:
          'let products = [\n  { id: 1, name: "Laptop", price: 1000 },\n  { id: 2, name: "Phone", price: 500 },\n];\nlet nextId = 3;\n\nfunction getAll() {\n  return products;\n}\n\nfunction getById(id) {\n  return products.find(p => p.id === id);\n}\n\nfunction create(name, price) {\n  const newProduct = { id: nextId++, name, price };\n  products.push(newProduct);\n  return newProduct;\n}\n\nfunction update(id, name, price) {\n  const product = products.find(p => p.id === id);\n  if (product) {\n    product.name = name;\n    product.price = price;\n  }\n  return product;\n}\n\nfunction remove(id) {\n  products = products.filter(p => p.id !== id);\n}\n\nconsole.log("All:", getAll());\ncreate("Tablet", 300);\nconsole.log("After create:", getAll());\nupdate(1, "Gaming Laptop", 1500);\nconsole.log("After update:", getAll());\nremove(2);\nconsole.log("After delete:", getAll());',
        expectedOutput: null,
        hint: "find() để tìm, push() để thêm, filter() để xóa (lọc bỏ item có id trùng)",
        difficulty: "Trung bình",
      },
    ],
    quiz: [
      {
        question: "HTTP method nào dùng để TẠO MỚI resource?",
        options: ["GET", "POST", "PUT", "DELETE"],
        answer: 1,
        explanation:
          "POST dùng để tạo mới. GET = đọc, PUT = cập nhật, DELETE = xóa.",
      },
      {
        question: 'URL nào đúng chuẩn REST cho "lấy sản phẩm có id = 5"?',
        options: [
          "GET /getProduct?id=5",
          "GET /api/products/5",
          "POST /api/products/get/5",
          "GET /api/product-5",
        ],
        answer: 1,
        explanation:
          "REST chuẩn dùng danh từ số nhiều + ID: /api/products/:id. Không dùng động từ trong URL.",
      },
    ],
  },
  {
    id: 9,
    title: "MongoDB & Mongoose — Kết nối Database",
    chapter: "Chương 4: Database & Auth",
    description: "Kết nối MongoDB Atlas, Schema, Model, CRUD với DB.",
    difficulty: "Intermediate",
    file: "bai-09.md",
    tags: ["mongodb", "mongoose", "database"],
    exercises: [
      {
        title: "Thiết kế Schema",
        description: "Thiết kế cấu trúc dữ liệu cho ứng dụng",
        requirements: [
          "Tạo object mô phỏng Mongoose Schema cho 'User'",
          "Bao gồm: name, email, password, role, createdAt",
          "Viết hàm validate kiểm tra dữ liệu",
        ],
        starterCode:
          '// Mô phỏng Mongoose Schema\nconst userSchema = {\n  name: { type: "String", required: true },\n  // thêm các field khác\n};\n\n// Hàm validate dữ liệu theo schema\nfunction validate(data, schema) {\n  const errors = [];\n  for (const [field, rules] of Object.entries(schema)) {\n    if (rules.required && !data[field]) {\n      errors.push(`${field} là bắt buộc`);\n    }\n  }\n  return errors;\n}\n\n// Test\nconst userData = { name: "Quan" }; // thiếu email, password\nconsole.log(validate(userData, userSchema));',
        solutionCode:
          'const userSchema = {\n  name: { type: "String", required: true },\n  email: { type: "String", required: true },\n  password: { type: "String", required: true },\n  role: { type: "String", required: false, default: "user" },\n  createdAt: { type: "Date", required: false },\n};\n\nfunction validate(data, schema) {\n  const errors = [];\n  for (const [field, rules] of Object.entries(schema)) {\n    if (rules.required && !data[field]) {\n      errors.push(`${field} là bắt buộc`);\n    }\n  }\n  return errors;\n}\n\nconst userData = { name: "Quan" };\nconst errs = validate(userData, userSchema);\nconsole.log("Lỗi:", errs);\nconsole.log("Hợp lệ:", errs.length === 0);',
        expectedOutput: null,
        hint: "Duyệt Object.entries(schema) và kiểm tra rules.required vs data[field]",
        difficulty: "Trung bình",
      },
    ],
    quiz: [
      {
        question: "MongoDB là loại database nào?",
        options: ["SQL (Relational)", "NoSQL (Document)", "Graph Database", "Key-Value Store"],
        answer: 1,
        explanation:
          "MongoDB là NoSQL document database — lưu dữ liệu dạng JSON-like documents (BSON), không cần schema cứng.",
      },
    ],
  },
  {
    id: 10,
    title: "Authentication — JWT & Bcrypt",
    chapter: "Chương 4: Database & Auth",
    description: "Đăng ký/đăng nhập, hash password, JWT token.",
    difficulty: "Intermediate",
    file: "bai-10.md",
    tags: ["jwt", "bcrypt", "auth"],
    exercises: [
      {
        title: "Giả lập Authentication Flow",
        description: "Viết logic đăng ký/đăng nhập đơn giản",
        requirements: [
          "Tạo mảng users lưu trữ tài khoản",
          "Viết hàm register(username, password)",
          "Viết hàm login(username, password)",
          "Viết hàm generateToken(user) trả về string token giả",
        ],
        starterCode:
          'const users = [];\n\nfunction register(username, password) {\n  // Kiểm tra username đã tồn tại?\n  // Nếu chưa → thêm vào mảng, return success\n  // Nếu rồi → return error\n}\n\nfunction login(username, password) {\n  // Tìm user trong mảng\n  // So sánh password\n  // Đúng → trả token, Sai → trả error\n}\n\nfunction generateToken(user) {\n  // Tạo token giả: base64 encode\n  return "token_" + btoa(user.username);\n}\n\n// Test\nconsole.log(register("admin", "123456"));\nconsole.log(register("admin", "abcdef")); // trùng\nconsole.log(login("admin", "123456"));\nconsole.log(login("admin", "wrong"));',
        solutionCode:
          'const users = [];\n\nfunction register(username, password) {\n  if (users.find(u => u.username === username)) {\n    return { success: false, message: "Username đã tồn tại" };\n  }\n  users.push({ username, password });\n  return { success: true, message: "Đăng ký thành công" };\n}\n\nfunction login(username, password) {\n  const user = users.find(u => u.username === username);\n  if (!user) return { success: false, message: "User không tồn tại" };\n  if (user.password !== password) return { success: false, message: "Sai mật khẩu" };\n  return { success: true, token: generateToken(user) };\n}\n\nfunction generateToken(user) {\n  return "token_" + btoa(user.username + ":" + Date.now());\n}\n\nconsole.log(register("admin", "123456"));\nconsole.log(register("admin", "abcdef"));\nconsole.log(login("admin", "123456"));\nconsole.log(login("admin", "wrong"));',
        expectedOutput: null,
        hint: "Dùng array.find() để tìm user, so sánh password trực tiếp (chưa hash)",
        difficulty: "Trung bình",
      },
    ],
    quiz: [
      {
        question: "JWT gồm mấy phần?",
        options: ["2 phần", "3 phần", "4 phần", "1 phần"],
        answer: 1,
        explanation:
          "JWT gồm 3 phần ngăn cách bởi dấu chấm: Header.Payload.Signature",
      },
    ],
  },
  {
    id: 11,
    title: "Cấu trúc dự án chuẩn MVC",
    chapter: "Chương 5: Project Thực Chiến",
    description: "Tổ chức code theo MVC, biến môi trường, error handling.",
    difficulty: "Intermediate",
    file: "bai-11.md",
    tags: ["mvc", "architecture", "dotenv"],
    exercises: [],
    quiz: [
      {
        question: "MVC là viết tắt của gì?",
        options: [
          "Module View Controller",
          "Model View Controller",
          "Main View Component",
          "Model Validate Create",
        ],
        answer: 1,
        explanation:
          "Model: xử lý dữ liệu, View: hiển thị, Controller: xử lý logic điều hướng.",
      },
    ],
  },
  {
    id: 12,
    title: "Mini Project: API Quản lý Sản phẩm",
    chapter: "Chương 5: Project Thực Chiến",
    description: "Build project hoàn chỉnh từ A-Z: MVC + MongoDB + Auth.",
    difficulty: "Intermediate",
    file: "bai-12.md",
    tags: ["project", "fullstack"],
    exercises: [
      {
        title: "Thiết kế API Endpoints",
        description:
          "Lên kế hoạch đầy đủ endpoints cho ứng dụng quản lý sản phẩm",
        requirements: [
          "Liệt kê tất cả endpoints cho: Products, Users, Auth",
          "Mỗi endpoint ghi rõ: method, path, mô tả, có cần auth không",
        ],
        starterCode:
          'const endpoints = {\n  auth: [\n    // { method, path, description, auth: false }\n  ],\n  products: [\n    // CRUD endpoints\n  ],\n  users: [\n    // Admin endpoints\n  ],\n};\n\n// In ra bảng endpoints\nfor (const [group, routes] of Object.entries(endpoints)) {\n  console.log(`\\n=== ${group.toUpperCase()} ===`);\n  routes.forEach(r => {\n    console.log(`  ${r.method.padEnd(8)} ${r.path.padEnd(25)} ${r.auth ? "🔒" : "🔓"} ${r.description}`);\n  });\n}',
        solutionCode:
          'const endpoints = {\n  auth: [\n    { method: "POST", path: "/api/auth/register", description: "Đăng ký", auth: false },\n    { method: "POST", path: "/api/auth/login", description: "Đăng nhập", auth: false },\n  ],\n  products: [\n    { method: "GET", path: "/api/products", description: "Lấy tất cả SP", auth: false },\n    { method: "GET", path: "/api/products/:id", description: "Lấy 1 SP", auth: false },\n    { method: "POST", path: "/api/products", description: "Tạo SP mới", auth: true },\n    { method: "PUT", path: "/api/products/:id", description: "Cập nhật SP", auth: true },\n    { method: "DELETE", path: "/api/products/:id", description: "Xóa SP", auth: true },\n  ],\n  users: [\n    { method: "GET", path: "/api/users/me", description: "Profile", auth: true },\n    { method: "GET", path: "/api/users", description: "All users (Admin)", auth: true },\n  ],\n};\n\nfor (const [group, routes] of Object.entries(endpoints)) {\n  console.log(`\\n=== ${group.toUpperCase()} ===`);\n  routes.forEach(r => {\n    console.log(`  ${r.method.padEnd(8)} ${r.path.padEnd(25)} ${r.auth ? "🔒" : "🔓"} ${r.description}`);\n  });\n}',
        expectedOutput: null,
        hint: "Auth endpoints không cần auth (đăng ký/đăng nhập). CRUD products: GET public, POST/PUT/DELETE cần auth.",
        difficulty: "Trung bình",
      },
    ],
    quiz: [],
  },
];

export const groupByChapter = (lessonList) => {
  return lessonList.reduce((groups, lesson) => {
    const chapter = lesson.chapter;
    if (!groups[chapter]) {
      groups[chapter] = [];
    }
    groups[chapter].push(lesson);
    return groups;
  }, {});
};

export default lessons;
