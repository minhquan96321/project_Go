require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const connection = require("./src/config/database");
const aboutRouter = require("./src/router/aboutRouter");
const categoriRouter = require("./src/router/categoriRouter");
const blogRouter = require("./src/router/blogRouter");
const contactRouter = require("./src/router/contactRouter");
const commentRouter = require("./src/router/commentRouter");
const adminRouter = require("./src/router/adminRouter");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "45mb" }));

const port = process.env.PORT || 8001;
// const hostname = process.env.HOSTNAME || 8000;

app.use("/api/about", aboutRouter);
app.use("/api/categori", categoriRouter);
app.use("/api/blog", blogRouter);
app.use("/api/contact", contactRouter);
app.use("/api/comment", commentRouter);
app.use("/api/admin", adminRouter);

connection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
