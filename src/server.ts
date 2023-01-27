import express, { Request, Response } from "express";
//import bodyParser from "body-parser";
import config from "./config";
// import db from "./database";
import users_handler from "./handlers/users_main";
import orders_handler from "./handlers/orders_main";
import products_handler from "./handlers/products_main";
import order_products_handler from "./handlers/order_products_main";
import bodyParser from "body-parser";
// import valid_fun from "./validator/validataion";
const app: express.Application = express();
const address = "0.0.0.0:3000";
console.log(config);

const port = config.port || 3000;

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

// for user handlers
users_handler(app);
// for order handlers
orders_handler(app);
// for product handlers
products_handler(app);
// for order of products handlers
order_products_handler(app);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
