import express, { Request, Response } from "express";
import order_model from "../models/order_methods";
import { orders } from "../types/orders";
import verifyAuthToken from "../validation/validation";

const our_order_main = new order_model();

const index = async (_req: Request, res: Response) => {
  try {
    const new_order = await our_order_main.get_all_orders();
    if (new_order) {
      return res.json({
        status: 200,
        data: { ...new_order },
        message: `order authenticated successfully`,
      });
    } else {
      return res.json({
        status: 401,
        message: `No products in that order`,
      });
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  const order: orders = {
    id: req.params.order_id,
    status: req.body.status,
    user_id: req.body.user_id,
  };
  try {
    const new_order = await our_order_main.get_specific_order(
      order.id as unknown as string
    );
    if (new_order) {
      return res.json({
        status: 200,
        data: { ...new_order },
        message: `order authenticated successfully`,
      });
    } else {
      return res.json({
        status: 401,
        message: `No products in that order`,
      });
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const order: orders = {
    status: req.body.status,
    user_id: req.body.user_id,
  };
  if (order.status == "active") {
    try {
      const new_order = await our_order_main.create(order);
      return res.json({
        status: 200,
        data: { ...new_order },
        message: `order authenticated successfully`,
      });
    } catch (err) {
      res.status(401);
      res.json(`Access denied, invalid token ${err}`);
      return;
    }
  } else if (order.status == "complete") {
    try {
      const new_order = await our_order_main.create(order);
      return res.json({
        status: 200,
        data: { ...new_order },
        message: `order authenticated successfully`,
      });
    } catch (err) {
      res.status(401);
      res.json(`Access denied, invalid token ${err}`);
      return;
    }
  } else {
    res
      .status(404)
      .send(
        `The order and password don't match. Please try again or go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`
      );
    console.log(
      `The order is not exist. Please go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`
    );
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order: orders = {
      id: req.params.id,
      status: req.body.status,
      user_id: req.body.id,
    };
    const new_order = await our_order_main.update_order(order);
    if (new_order) {
      return res.json({
        status: 200,
        data: { ...new_order },
        message: `order authenticated successfully`,
      });
    } else {
      return res.json({
        status: 401,
        message: `No products in that order`,
      });
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const new_order = await our_order_main.delete(req.params.id);
  if (new_order) {
    return res.json({
      status: 200,
      data: { ...new_order },
      message: `order authenticated successfully`,
    });
  } else {
    return res.json({
      status: 401,
      message: `No products in that order`,
    });
  }
};

const orders_handler = (app: express.Application): void => {
  app.get("/user/sign_in/orders", verifyAuthToken, index);

  app.get("/user/sign_in/order/:id", verifyAuthToken, show);

  app.post("/user/sign_in/order", verifyAuthToken, create);

  app.patch("/user/sign_in/order/edit/:id", verifyAuthToken, update);

  app.delete("/user/sign_in/order/delete/:id", verifyAuthToken, destroy);
};
export default orders_handler;
