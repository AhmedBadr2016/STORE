import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { userStore } from "../models/user_methods";

const our_user_main = new userStore();

const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const new_user = await our_user_main.authenticate(
      req.body.email,
      req.body.password
    );
    console.log(new_user);
    const token_1 = jwt.sign(
      { new_user },
      config.tokensecret as unknown as string
    );
    console.log(`The token_1: ${token_1}`);
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(" ")[1] as unknown as string;
    console.log(`------------`);
    console.log(`The token: ${token}`);
    console.log(`------------`);
    jwt.verify(token, config.tokensecret as string);
    console.log(`The token is verified`);
    next();
  } catch (error) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};
export default verifyAuthToken;
