# ♻️ ReWear – Clothing Exchange & Swap Marketplace

ReWear is a full-stack clothing exchange and swap marketplace built with the MERN stack. It allows users to discover pre-loved clothing, buy clothes, sell their unused clothing, and request clothing swaps through a simple and user-friendly marketplace.

---

## 🌐 ReWear – Clothing Exchange & Swap Marketplace

ReWear promotes sustainable fashion by giving pre-loved clothing a second life. Users can browse clothing listings, search and filter products, place orders, create clothing listings, submit swap requests, contact sellers, and manage their orders and swap requests.

---

## 📌 Features

* 👤 **User Registration & Login**
* 🛍️ **Clothing Marketplace**
* 🔍 **Search & Category Filters**
* 👕 **Sell Clothes**
* 💰 **Buy Clothes**
* 🔄 **Clothing Swap Requests**
* 💬 **Contact Seller**
* 📦 **Order Placement & Tracking**
* 🔄 **Swap Request Management**
* 🧑‍💼 **Seller Dashboard**
* 👤 **User Profile**
* 📱 **Responsive Design**
* ♻️ **Sustainable Fashion Marketplace**

---

## 🛍️ Marketplace Features

Users can browse clothing products with information such as:

* Product name
* Description
* Price
* Category
* Size
* Condition
* Brand
* Product image
* Listing type

Products can be listed as either:

* **SELL** – Available for purchase
* **SWAP** – Available for clothing exchange

---

## 🔎 Search & Filters

The marketplace provides search functionality that allows users to search clothing by:

* Product name
* Description
* Brand
* Category

Users can also filter products by clothing category.

---

## 💰 Buying Clothes

Users can purchase clothing listed for sale.

The buying process includes:

1. Open a clothing product.
2. Click **Buy Now**.
3. Enter buyer information.
4. Place the order.
5. View the order from **My Orders**.
6. Track the order status.

Supported order statuses include:

* PLACED
* CONFIRMED
* SHIPPED
* DELIVERED
* CANCELLED

---

## 👕 Selling Clothes

Users can list their pre-loved clothing on ReWear.

A clothing listing can contain:

* Title
* Description
* Price
* Image
* Category
* Size
* Condition
* Brand
* Listing type
* Seller information

Users can choose whether the clothing is available for **sale** or **swap**.

---

## 🔄 Clothing Swap

Users can request a clothing exchange for products listed as **SWAP**.

A swap request includes:

* Requester name
* Requester email
* Location
* Offered clothing
* Message
* Seller information

Swap requests can have the following statuses:

* PENDING
* ACCEPTED
* REJECTED
* COMPLETED
* CANCELLED

---

## 💬 Contact Seller

Users can contact a seller from a clothing product's details page.

The Contact Seller page allows the user to provide:

* Name
* Email
* Message

This provides a direct way for buyers or interested users to communicate their interest in a listed clothing item.

---

## 📦 Seller Dashboard

The Seller Dashboard allows sellers to manage:

### Orders

Sellers can view orders related to their products and update order status.

Available actions include:

* Confirm Order
* Cancel Order
* Mark as Shipped
* Mark as Delivered

### Swap Requests

Sellers can also manage clothing swap requests.

Available actions include:

* Accept Swap
* Reject Swap
* Complete Swap

---

## 👤 User Profile

Users can access their profile to view:

* Name
* Email
* Account creation date
* Membership information

The profile also provides access to:

* Seller Dashboard
* Homepage
* Logout

---

## 🧱 Technology Stack

| Layer             | Technology      |
| ----------------- | --------------- |
| Frontend          | React.js        |
| Styling           | Tailwind CSS    |
| Build Tool        | Vite            |
| Backend           | Node.js         |
| Server            | Express.js      |
| Database          | MongoDB Atlas   |
| ODM               | Mongoose        |
| Authentication    | JWT             |
| Password Security | bcrypt          |
| API Testing       | Postman         |
| Icons             | Lucide React    |
| Deployment        | Vercel & Render |

---

## 🗂️ Project Structure

```text
ReWear/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── components/
│   │   │   │   ├── Auth/
│   │   │   │   ├── Home/
│   │   │   │   └── Product/
│   │   │   └── Styles/
│   │   │
│   │   ├── Pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   ├── ProductListing.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── MySwapRequests.jsx
│   │   │   ├── SellerDashboard.jsx
│   │   │   ├── HowReWearWorks.jsx
│   │   │   └── ContactSeller.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
└── server/
    ├── models/
    ├── routes/
    ├── controllers/
    ├── server.js
    ├── .env
    └── package.json
```

---

## 🧰 Prerequisites

Before running ReWear, install:

* [Node.js](https://nodejs.org/)
* npm
* Git
* MongoDB Atlas
* Postman

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/upadhyayheerva/ReWear.git
cd ReWear
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal and run:

```bash
cd server
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
MONGO_CONN=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Do not upload the `.env` file to GitHub.

---

## 🧪 Run the Project

### Start the backend

```bash
cd server
npm run dev
```

Backend:

```text
http://localhost:3000
```

### Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔌 API Testing

The ReWear backend APIs can be tested using **Postman**.

Main API modules include:

* Authentication
* Clothing Products
* Orders
* Swap Requests
* User Profile

Example API endpoints:

```text
/api/auth
/api/rewear-products
/api/orders
/api/swap-requests
/api/profile
```

---

## 🗄️ Database

ReWear uses **MongoDB Atlas** for storing application data.

The database stores information related to:

* Users
* Clothing products
* Orders
* Swap requests

---

## 🚀 Deployment

### Frontend

The React frontend can be deployed using **Vercel**.

### Backend

The Node.js and Express backend can be deployed using **Render**.

---

## 🔒 Security

ReWear uses:

* JWT authentication
* Password hashing with bcrypt
* Environment variables for sensitive configuration
* Protected authentication information

Sensitive credentials such as MongoDB connection strings and JWT secrets should never be committed to the repository.

---

## 💡 Future Enhancements

Possible future improvements include:

* 💳 Online payment gateway
* 💬 Real-time buyer-seller chat
* ❤️ Wishlist functionality
* 📧 Email notifications
* 🔔 Notification system
* 🖼️ Direct image upload
* 🤖 Personalized clothing recommendations
* 🛡️ Advanced admin dashboard
* ⭐ Seller ratings and reviews

---

## 🤝 Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test the changes.
5. Create a pull request.

---

## 👨‍💻 Project

**ReWear – Clothing Exchange & Swap Marketplace**

Built using the MERN stack with a focus on sustainable fashion, clothing reuse, buying, selling, and exchange.

---

## ♻️ Wear. Swap. Repeat.

GitHub Repository:

https://github.com/upadhyayheerva/ReWear
