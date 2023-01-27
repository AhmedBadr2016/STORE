import express, { Request, Response } from "express";
import order_product_model from "../models/order_product_methods";
import { order_products } from "../types/order_products";
import verifyAuthToken from "../validation/validation";

const our_order_product_main = new order_product_model();

const index = async (_req: Request, res: Response) => {
  try {
    const new_product = await our_order_product_main.get_all_order_products();
    if (new_product !== null) {
      return res.json({
        status: 200,
        data: { ...new_product },
        message: `product authenticated successfully`,
      });
    } else {
      return res.json({
        status: 401,
        message: `No products in that order`,
      });
    }
  } catch (err) {
    res.status(400).send(`can't add products to card`);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const new_product = await our_order_product_main.get_specific_order_product(
      req.params.order_id
    );
    if (new_product !== null) {
      return res.json({
        status: 200,
        data: { ...new_product },
        message: `product authenticated successfully`,
      });
    } else {
      return res.json({
        status: 401,
        message: `No products in that order`,
      });
    }
  } catch (err) {
    res.status(400).send(`can't add products to card`);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order_product: order_products = {
      id: req.body.id,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };
    if (order_product) {
      const new_product = await our_order_product_main.create(order_product);
      return res.json({
        status: 200,
        data: { ...new_product },
        message: `product authenticated successfully`,
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

const update = async (req: Request, res: Response) => {
  try {
    const order_product: order_products = {
      id: req.params.id,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };
    if (order_product) {
      const new_product = await our_order_product_main.update_order_product(
        order_product
      );
      return res.json({
        status: 200,
        data: { ...new_product },
        message: `product authenticated successfully`,
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
  try {
    const new_product = await our_order_product_main.delete(req.params.id);
    if (new_product) {
      return res.json({
        status: 200,
        data: { ...new_product },
        message: `product authenticated successfully`,
      });
    } else {
      return res.json({
        status: 401,
        message: `No products in that order`,
      });
    }
  } catch (err) {
    res.status(400).send(`can't add products to card`);
    res.json(err);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const op: order_products = {
    order_id: _req.params.order_id,
    product_id: _req.body.product_id,
    quantity: _req.body.quantity,
  };
  try {
    const new_product = await our_order_product_main.addProduct(op);
    if (new_product !== null) {
      return res.json({
        status: 200,
        data: { ...new_product },
        message: `product authenticated successfully`,
      });
    } else {
      return res.json({
        status: 401,
        message: `No products in that order`,
      });
    }
  } catch (err) {
    res.status(400).send(`can't add products to card`);
    res.json(err);
  }
};

const order_products_handler = (app: express.Application): void => {
  app.get("/order_products", index);

  app.get("/order_product/:id", show);

  app.post("/order_product/create", verifyAuthToken, create);

  app.patch("/order_product/edit/:id", verifyAuthToken, update);

  app.delete("/order_product/delete/:id", verifyAuthToken, destroy);

  app.post("/user/sign_in/order/:id/products", verifyAuthToken, addProduct);
};
export default order_products_handler;
