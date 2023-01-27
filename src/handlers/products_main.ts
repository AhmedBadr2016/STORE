import express, { Request, Response } from "express";
import product_model from "../models/product_methods";
import { products } from "../types/products";
import verifyAuthToken from "../validation/validation";

const our_product_main = new product_model();

const index = async (_req: Request, res: Response) => {
  const new_product = await our_product_main.get_all_products();
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
};

const show = async (req: Request, res: Response) => {
  const new_product = await our_product_main.get_specific_product(
    req.params.id
  );
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
};

const create = async (req: Request, res: Response) => {
  try {
    const product: products = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };
    const new_product = await our_product_main.create(product);
    if (new_product !== null) {
      res.json({
        status: 200,
        data: { ...new_product },
        message: `product authenticated successfully`,
      });
    } else {
      res
        .status(404)
        .send(
          `The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
        );
      console.log(
        `The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`
      );
    }
  } catch (err) {
    res.status(401);
    res.json(
      `Access denied, invalid token or The product and password don't match ${err}`
    );
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product: products = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
    };

    const new_product = await our_product_main.update_product(product);
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
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const new_product = await our_product_main.delete(req.params.id);
  if (new_product) {
    return res.json({
      status: 200,
      data: { ...new_product },
      message: `product authenticated successfully & deleted `,
    });
  } else {
    return res.json({
      status: 401,
      message: `No products in that order`,
    });
  }
};

const products_handler = (app: express.Application): void => {
  app.get("/products", verifyAuthToken, index);

  app.get("/product/:id", verifyAuthToken, show);

  app.post("/product/create", verifyAuthToken, create);

  app.patch("/product/edit/:id", verifyAuthToken, update);

  app.delete("/product/delete/:id", verifyAuthToken, destroy);
};
export default products_handler;
