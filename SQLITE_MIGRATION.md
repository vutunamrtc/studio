# Chuyển đổi sang SQLite Database - Hoàn tất ✅

## Tổng quan

Ứng dụng quản lý tài chính của bạn đã được chuyển đổi thành công từ sử dụng **dữ liệu fake** sang **SQLite database thực tế**. Giờ đây tất cả dữ liệu của bạn sẽ được lưu trữ vĩnh viễn trong database.

## Những gì đã thay đổi

### ✅ Đã hoàn thành

1. **Cài đặt SQLite**
   - Thêm `better-sqlite3` và type definitions
   - Cấu hình webpack để chỉ sử dụng SQLite trên server-side

2. **Tạo Database Service** (`src/lib/db.ts`)
   - Các hàm CRUD cho transactions và categories
   - Tự động tạo bảng và indexes
   - Hỗ trợ WAL mode để tăng hiệu năng

3. **API Routes**
   - `GET/POST /api/transactions` - Quản lý giao dịch
   - `PATCH/DELETE /api/transactions/[id]` - Cập nhật/xóa giao dịch
   - `GET/POST /api/categories` - Quản lý danh mục
   - `PATCH/DELETE /api/categories/[id]` - Cập nhật/xóa danh mục

4. **Scripts tiện ích**
   - `npm run seed` - Khởi tạo database với dữ liệu mẫu
   - `npm run check-db` - Kiểm tra dữ liệu trong database

5. **Cấu hình**
   - Cập nhật `.gitignore` để không commit database files
   - Cập nhật `next.config.ts` để xử lý better-sqlite3
   - Tắt Turbopack, sử dụng webpack thông thường

## Cách sử dụng

### Lần đầu tiên

```powershell
# 1. Khởi tạo database với dữ liệu mẫu
npm run seed

# 2. Khởi động server
npm run dev

# 3. Mở trình duyệt tại http://localhost:9002
```

### Kiểm tra dữ liệu

```powershell
# Xem dữ liệu hiện tại
npm run check-db
```

### Reset database

```powershell
# Xóa database cũ
Remove-Item -Path "data\*.db*" -Force

# Tạo lại với dữ liệu mẫu
npm run seed
```

## Cấu trúc Database

### Bảng `categories`
- `id` (TEXT, PRIMARY KEY)
- `name` (TEXT)
- `icon` (TEXT)
- `color` (TEXT)

### Bảng `transactions`
- `id` (TEXT, PRIMARY KEY)
- `date` (TEXT, ISO format)
- `description` (TEXT)
- `amount` (REAL)
- `type` (TEXT: 'income' hoặc 'expense')
- `category` (TEXT)
- `categoryId` (TEXT, FOREIGN KEY)

## Dữ liệu mẫu

### Categories (9)
- Groceries (Mua sắm)
- Transport (Giao thông)
- Housing (Nhà ở)
- Health (Sức khỏe)
- Entertainment (Giải trí)
- Gifts (Quà tặng)
- Salary (Lương)
- Savings (Tiết kiệm)
- Other (Khác)

### Transactions (7)
- Weekly groceries - 75.6₫ (chi tiêu)
- Monthly salary - 3,000₫ (thu nhập)
- Gasoline - 40₫ (chi tiêu)
- Movie tickets - 25₫ (chi tiêu)
- Rent payment - 1,200₫ (chi tiêu)
- Pharmacy - 15.25₫ (chi tiêu)
- Dinner out - 55₫ (chi tiêu)

## Files quan trọng

```
studio/
├── data/
│   ├── finance.db          # SQLite database file
│   ├── finance.db-shm      # Shared memory file
│   └── finance.db-wal      # Write-ahead log
├── src/
│   ├── lib/
│   │   ├── db.ts           # Database service
│   │   ├── seed.ts         # Seed functions (không dùng nữa)
│   │   └── types.ts        # Type definitions
│   └── app/
│       ├── api/
│       │   ├── transactions/
│       │   │   ├── route.ts
│       │   │   └── [id]/route.ts
│       │   └── categories/
│       │       ├── route.ts
│       │       └── [id]/route.ts
│       └── lib/
│           └── data.ts     # API wrapper functions
├── seed-db.js              # Script khởi tạo database
├── check-db.js             # Script kiểm tra database
└── DATABASE_README.md      # Hướng dẫn chi tiết
```

## Lưu ý quan trọng

1. **Database không được commit lên Git**
   - File `.gitignore` đã được cấu hình
   - Mỗi developer cần chạy `npm run seed` lần đầu

2. **Server-side only**
   - SQLite chỉ chạy trên server
   - Client gọi API để tương tác với database

3. **Backup định kỳ**
   - Nên backup file `data/finance.db` thường xuyên
   - Sử dụng: `Copy-Item "data\finance.db" "data\finance.backup.db"`

4. **Hiệu năng**
   - WAL mode được bật để tăng tốc
   - Indexes được tạo cho các truy vấn thường dùng

## Công cụ quản lý Database

Bạn có thể sử dụng các công cụ sau để xem/chỉnh sửa database:

1. **DB Browser for SQLite** (Khuyến nghị)
   - Download: https://sqlitebrowser.org/
   - Mở file: `data/finance.db`

2. **VS Code Extension**
   - SQLite Viewer
   - SQLite Explorer

## Troubleshooting

### Lỗi "Module not found: better-sqlite3"
```powershell
npm install better-sqlite3 @types/better-sqlite3
```

### Database bị lỗi
```powershell
# Xóa và tạo lại
Remove-Item -Path "data\*.db*" -Force
npm run seed
```

### Không thấy dữ liệu
```powershell
# Kiểm tra database
npm run check-db

# Nếu rỗng, chạy seed lại
npm run seed
```

## Tài liệu tham khảo

- [DATABASE_README.md](./DATABASE_README.md) - Hướng dẫn chi tiết
- [better-sqlite3 Documentation](https://github.com/WiseLibs/better-sqlite3)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

**Chúc mừng! Ứng dụng của bạn giờ đây đã sử dụng database thực tế! 🎉**
