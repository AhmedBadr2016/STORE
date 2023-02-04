import supertest from "supertest";
import { userStore } from "../../models/user_methods";
import app from "../../server";
import { users } from "../../types/users";

const userModel = new userStore();
// import order_products_handler from "../order_products_main";

const test = supertest(app);

describe("order_product basic endpoints responses", () => {
  it("Should has an create endpoint on POST /order_product/create", async () => {
    const user = {
      email: "test@test.com",
      username: "testUser",
      first_name: "Test",
      last_name: "User",
      password: "test123",
    } as users;
    await userModel.create(user);
    const res = await test
      .post("/user/sign_in")
      .set("Content-type", "application/json")
      .send({
        email: "test@test.com",
        password: "test123",
      });
    const { token: userToken } = res.body.data;
    const token = userToken;
    const response = await test
      .post("/order_product/create")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${[token]}`);
    expect(response.status).toBe(200);
  });
  /*
  it("Should has an index endpoint on /order_product/:id", async () => {
    const res = await test
      .post("/user/sign_in")
      .set("Content-type", "application/json")
      .send({
        email: "test@test.com",
        password: "test123",
      });
    const { token: userToken } = res.body.data;
    const token = userToken;
    const response = await test
      .get("/order_products")
      .set("Authorization", `Bearer ${[token]}`);
    expect(response.status).toBe(200);
  });

  it("Should has an add product to cart endpoint on POST /user/sign_in/order/:id/products", async () => {
    const res = await test
      .post("/user/sign_in")
      .set("Content-type", "application/json")
      .send({
        email: "test@test.com",
        password: "test123",
      });
    const { token: userToken } = res.body.data;
    const token = userToken;
    const response = await test
      .post("/user/sign_in/order/1/products")
      .set("Authorization", `Bearer ${[token]}`);
    expect(response.status).toBe(400);
  });

  it("Should has an update endpoint on PATCH /order_product/edit/:id", async () => {
    const res = await test
      .post("/user/sign_in")
      .set("Content-type", "application/json")
      .send({
        email: "test@test.com",
        password: "test123",
      });
    const { token: userToken } = res.body.data;
    const token = userToken;
    const response = await test
      .patch("/order_product/edit/1")
      .set("Authorization", `Bearer ${[token]}`);
    expect(response.status).toBe(200);
  });

  it("Should has an show endpoint on GET /order_product/:id", async () => {
    const res = await test
      .post("/user/sign_in")
      .set("Content-type", "application/json")
      .send({
        email: "test@test.com",
        password: "test123",
      });
    const { token: userToken } = res.body.data;
    const token = userToken;
    const response = await test
      .get("/order_product/1")
      .set("Authorization", `Bearer ${[token]}`);
    expect(response.status).toBe(200);
  });

  it("Should has an delete endpoint on DELETE /order_product/delete/:id", async () => {
    const res = await test
      .post("/user/sign_in")
      .set("Content-type", "application/json")
      .send({
        email: "test@test.com",
        password: "test123",
      });
    const { token: userToken } = res.body.data;
    const token = userToken;
    const response = await test
      .delete("/order_product/delete/1")
      .set("Authorization", `Bearer ${[token]}`);
    expect(response.status).toBe(200);
    await test
      .delete("/user/delete/test@test.com")
      .set("Content-type", "application/json");
  });
*/
});
