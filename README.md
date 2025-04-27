# 🚲 Click Shop

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Click Shop is a complete E-commerce backend application built with Node.js, Express.js, and MongoDB. It offers full user and admin authentication, profile management, product browsing, shopping cart, online payment with Stripe, and order tracking functionalities.

---

## 🔥 Features

- **Authentication & Authorization** for Admin and Customers.
- **Home Page** to browse all products.
- **User Profile** management.
- **Address Module** for managing shipping addresses.
- **Category Management**: Admin can create, update, and delete categories.
- **Product Management**: Admin can add, edit, and delete products.
- **Shopping Cart**: Customers can add products to their cart.
- **Order Management**:
  - Place orders.
  - Track order status.
  - Cancel orders.
- **Favorites List**: Save favorite products.
- **Online Payment**: Integrated with **Stripe**.
- **Image Upload**: Upload product images to **Cloudinary**.
- **CRUD Operations** for all modules.
- **Security Measures**:
  - Rate Limiting.
  - Helmet Security.
  - Data Sanitization (NoSQL Injection and XSS Protection).

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Validation**: Joi
- **Payment**: Stripe
- **File Upload**: Multer, Cloudinary
- **Security**: Helmet, express-mongo-sanitize, xss-clean, express-rate-limit
- **Documentation**: Swagger (swagger-jsdoc, swagger-ui-express)
- **Logging**: Winston
- **Utilities**: dotenv, crypto-js, uuid, slugify, nodemailer, luxon

---

## 🚀 Live Deployment

- **Server Live**: [Click Shop Server on Vercel](https://vercel.com/mohameds-projects-38b9234a/click-shop)

---

## 📂 Project Structure

```bash
click-shop/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── validations/
├── app.js
├── server.js
├── README.md
```

---

## 📝 Installation

1. Clone the repository:

```bash
git clone https://github.com/MohamedAboElfadl-11/click-shop.git
```

2. Navigate to the project directory:

```bash
cd click-shop
```

3. Install dependencies:

```bash
npm install
```

4. Setup environment variables:

Create a `.env` file based on the `.env.example` template and fill in your configurations.

5. Run the server in development mode:

```bash
npm run dev
```

---

## 🖊️ API Documentation

- Full API documentation is available through Swagger.
- After running the server, visit:

```bash
http://localhost:PORT/api-docs
```

---

## 📸 Screenshots

(Add screenshots here if needed.)

---

## 👋 Contribution

Contributions are welcome! Feel free to:

- Fork the repository.
- Create a new branch.
- Make your changes.
- Submit a Pull Request.

---

## 🔗 Useful Links

- [Repository Link](https://github.com/MohamedAboElfadl-11/click-shop)
- [Live Server](https://vercel.com/mohameds-projects-38b9234a/click-shop)

---

## 📧 Contact

- **LinkedIn**: (https://www.linkedin.com/in/mohamed-abo-elfadl-970187214/)
- **Email**: (mohamedahmed200201@gmail.com)

---

## ✨ License

This project is licensed under the MIT License.
