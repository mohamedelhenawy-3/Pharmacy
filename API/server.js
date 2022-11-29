require("dotenv").config();//port
const express = require("express");
const database = require("./config/db");
const cookieParser=require('cookie-parser')
database();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use("/api/customers", require("./routes/customers"));
app.use("/api/pharmacies", require("./routes/pharmacies"));
app.use("/api/auth", require("./routes/auth"));



app.get('/',(req,res)=>{
  res.cookie("name","cooke done")
})

app.use(require("./middelware/globalMiddleware"));

const port = process.env.PORT || 3000;
//the server run in diff ports
app.listen(port, () => {
  console.log(`the sever run in ${port}`);
});
