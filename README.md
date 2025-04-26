# 🛒 Click Shop - E-commerce Backend

A complete e-commerce backend built with Node.js, Express.js, and MongoDB.

---

## 🚀 Features

- User Authentication (Register, Login, Forgot Password, Reset Password)
- Email verification & notifications via Nodemailer
- Product CRUD Management
- Categories and Subcategories Management
- Cart Management (Add, Update, Remove Items)
- Order Management (Create, View, Cancel Orders)
- Address Book Management
- Stripe Payment Integration
- Cloudinary for Image Uploads
- Security (Helmet, Rate Limiting, Data Validation)
- Error Handling Middleware
- JWT Authentication with Refresh Tokens

---

## 🛠️ Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- Stripe API for payments
- Cloudinary API for file uploads
- Nodemailer for sending emails
- Luxon for time management
- Bcrypt for password hashing

---

## 📁 Project Structure

src/ ┣ config/ ┣ controllers/ ┣ middlewares/ ┣ models/ ┣ routes/ ┣ services/ ┣ utils/ ┣ validations/ ┗ index.js


---

## ⚙️ Getting Started

```bash
# Clone the repo
git clone https://github.com/MohamedAboElfadl-11/click-shop.git

# Install dependencies
cd click-shop
npm install

# Create a .env file and add environment variables
PORT=5000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
STRIPE_SECRET_KEY=your_stripe_key
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
SMTP configurations for Nodemailer

# Start the server
npm run dev
