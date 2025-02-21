# Shopify MERN

A full-stack E-commerce website that allows users to buy and sell products. The website is built using React.JS, Node.JS, Express.JS, and MongoDB.

## Installation

First, clone the project by using:

```bash
git clone https://github.com/hasin023/shopify-mern.git
```

then cd into the project by using:

```bash
cd shopify-mern
```

Now, Install the packages by running:

```bash
npm run setup
```

Run the project in development with command

```bash
npm run dev
```

If you run into any issues, that may have been caused by the Atlas MongoDB connection, which blocks un-listed IP. Though, I will set "Allow any IP", but you can create a new cluster in MongoDB Atlas and replace the connection string in the `.env` file to use your own cluster.

## Built With

- [React.JS](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux](https://redux.js.org/)
- [Node.JS](https://nodejs.org/)
- [Express.JS](https://expressjs.com/)
- [SSLCommerz](https://www.sslcommerz.com/)
- [MongoDB](https://www.mongodb.com/)

## Features

- User Authentication
- Add, Update, Delete Products
- Add, Update, Delete Categories
- Add, Update, Delete Users
- Add, Update, Delete Orders
- Payment Gateway Integration (SSLCommerz)
- Admin Dashboard
