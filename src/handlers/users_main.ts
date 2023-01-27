// import { config } from "dotenv";
import express, { Request, Response } from "express";
import { userStore } from "../models/user_methods";
import { users } from "../types/users";
import jwt from "jsonwebtoken";
import config from "../config";
import verifyAuthToken from "../validation/validation";

const our_user_main = new userStore();

const users_handler = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/user/:email", verifyAuthToken, show);
  app.post("/user/sign_up", create);
  app.post("/user/sign_in", authenticate);
  app.patch("/user/edit/:email", verifyAuthToken, update);
  app.delete("/user/delete/:email", verifyAuthToken, destroy);
};

const index = async (_req: Request, res: Response) => {
  const new_user = await our_user_main.index();
  if (new_user) {
    return res.json({
      status: 200,
      data: { ...new_user },
      message: `user authenticated successfully`,
    });
  } else {
    return res.json({
      status: 401,
      message: `No products in that order`,
    });
  }
};

const show = async (req: Request, res: Response) => {
  const new_user = await our_user_main.show(req.params.email);
  if (new_user) {
    return res.json({
      status: 200,
      data: { ...new_user },
      message: `user authenticated successfully`,
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
    const user: users = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    console.log("Sign up new user");
    const new_user = await our_user_main.create(user);
    if (new_user !== null) {
      // res.json(new_user);
      const token = jwt.sign(
        { new_user },
        config.tokensecret as unknown as string
      );
      return res.json({
        status: 200,
        data: { ...new_user, token },
        message: `user authenticated successfully`,
      });
    } else {
      res
        .status(404)
        .send(
          `The user is exist in database. Please try again or go to: http://localhost:3000/user/sign_in and sign in and enter the email & password in the body`
        );
      console.log(
        `The user is not exist. Please go to: http://localhost:3000/user/sign_in and sign in and enter the email & password in the body`
      );
    }
  } catch (err) {
    res.status(400);
    res.json(`Go to http://localhost:3000/user/sign_in. Error: ${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    console.log("sign in a Client");
    const new_user = await our_user_main.authenticate(
      req.body.email,
      req.body.password
    );
    if (new_user !== null) {
      const token = jwt.sign(
        { new_user },
        config.tokensecret as unknown as string
      );
      return res.json({
        status: 200,
        data: { ...new_user, token },
        message: `user authenticated successfully`,
      });
    } else {
      res
        .status(404)
        .send(
          `The user and password don't match. Please try again or go to: http://localhost:3000/user/sign_up and create new user and enter the first_name & last_name & email & username & password in the body`
        );
      console.log(
        `The user is not exist. Please go to: http://localhost:3000/user/sign_up and create new user and enter the first_name & last_name & email & username & password in the body`
      );
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user: users = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    const new_user = await our_user_main.update(user);
    if (new_user) {
      return res.json({
        status: 200,
        data: { ...new_user },
        message: `user authenticated successfully`,
      });
    } else {
      return res.json({
        status: 401,
        message: `No products in that order`,
      });
    }
  } catch (err) {
    res
      .status(400)
      .send(`Token required- email & the value which needed to be updated`);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const new_user = await our_user_main.delete(req.params.email);
  if (new_user) {
    return res.json({
      status: 200,
      data: { ...new_user },
      message: `user authenticated successfully`,
    });
  } else {
    return res.json({
      status: 401,
      message: `No products in that order`,
    });
  }
};

export default users_handler;
