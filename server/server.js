// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { ObjectId } from 'mongodb';
import SSLCommerzPayment from 'sslcommerz-lts';
import Order from "./models/orderModel.js";
const store_id = 'shopi65fd297454fcb';
const store_passwd = 'shopi65fd297454fcb@ssl';
const is_live = false;

dotenv.config();
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

// SSL for Payment
app.get("/api/config/ssl", (req, res) => {
    res.send({
        storeId: process.env.SSL_STORE_ID,
        storePassword: process.env.SSL_PASSWORD,
    });
});

// Get ssl order datas
app.post("/order/:id", async (req, res) => {
    const orderId = req.params.id;
    const order = req.body;
    const transactionId = new ObjectId().toString();

    const data = {
        total_amount: order.total_amount,
        currency: 'BDT',
        tran_id: transactionId,
        success_url: `http://localhost:8000/payment/success/${transactionId}`,
        fail_url: `http://localhost:8000/payment/fail/${transactionId}`,
        cancel_url: `http://localhost:8000/payment/cancel/${transactionId}`,
        ipn_url: `http://localhost:8000/order/${order.orderId}`,
        emi_option: 0,
        shipping_method: 'NO',
        product_name: order.product_name[0],
        product_category: 'Ecommerce',
        product_profile: 'general',
        cus_name: order.cus_name,
        cus_email: order.cus_email,
        cus_add1: order.cus_add1,
        cus_add2: order.cus_add1,
        cus_city: order.cus_city,
        cus_state: order.cus_city,
        cus_postcode: order.cus_postcode,
        cus_country: order.cus_country,
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: order.cus_name,
        ship_add1: order.cus_add1,
        ship_add2: order.cus_add1,
        ship_city: order.cus_city,
        ship_state: order.cus_city,
        ship_postcode: order.cus_postcode,
        ship_country: order.cus_country,
    };

    // console.log(data);
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({ url: GatewayPageURL })
        console.log('Redirecting to: ', GatewayPageURL)
    });

    app.post("/payment/success/:tran_id", (req, res) => {
        console.log(`Payment successful for Trnx ID: ${req.params.tran_id}`);
        res.redirect(`http://localhost:5173/payment/success/${req.params.tran_id}`);
    });

    app.post("/payment/fail/:tran_id", (req, res) => {
        console.log(`Payment failed for Trnx ID: ${req.params.tran_id}`);
        res.redirect(`http://localhost:5173/payment/fail/${req.params.tran_id}`);
    });

    app.post("/payment/cancel/:tran_id", (req, res) => {
        console.log(`Payment cancelled for Trnx ID: ${req.params.tran_id}`);
        res.redirect(`http://localhost:5173/payment/cancel/${req.params.tran_id}`);
    });

});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));