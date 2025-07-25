const express = require("express");
const mongoose = require("mongoose");

const CategoryRoute = require("./routers/category");
const ProductRoute = require("./routers/products");

mongoose.connect("mongodb+srv://mahmudovlaziz15:PgHyYh0GyiE8rLOs@cluster0.2kmkig5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("DB connected aniq buldi"))
.catch((e) => console.log(e));

const app = express();
app.use(express.json());

app.use("/category", CategoryRoute);
app.use("/products", ProductRoute);

app.listen(3000, () => console.log("server 3000 portda emas endi online internetda ishlayapdi"));
