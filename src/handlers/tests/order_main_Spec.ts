import supertest from "supertest";
import { userStore } from "../../models/user_methods";
import Client from "../../database";
import { users } from "../../types/users";
import app from "../../server";

const test = supertest(app);
const userModel = new userStore();

const user = {
  email: "test3@test.com",
  username: "testUser",
  first_name: "Test",
  last_name: "User",
  password: "test123",
} as users;

beforeAll(async () => {
  const createdUser = await userModel.create(user);
  user.id = createdUser?.id;
});

afterAll(async () => {
  // clean db
  const connection = await Client.connect();
  const sql = "DELETE FROM users WHERE email = ($1)";
  await connection.query(sql, ["test3@test.com"]);
  connection.release();
});

describe("order basic endpoints responses", () => {
  it("Should has an create endpoint on POST /user/sign_in/order", async () => {
    const res = await test
      .post("/user/sign_in")
      .set("Content-type", "application/json")
      .send({
        email: "test3@test.com",
        password: "test123",
      });
    // console.log(res);
    const { id, token: userToken } = res.body.data;
    const token = userToken;
    const response = await test
      .post("/user/sign_in/order")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "active", user_id: `${id}` });

    expect(response.status).toBe(200);
  });

  it("Should has an index endpoint on /user/sign_in/orders", async () => {
    const res = await test
      .post("/user/sign_in")
      .set("Content-type", "application/json")
      .send({
        email: "test3@test.com",
        password: "test123",
      });
    // console.log(res);
    const { token: userToken } = res.body.data;
    const token = userToken;
    const response = await test
      .get("/user/sign_in/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("Should has an update endpoint on PATCH /user/sign_in/order/edit/:id", async () => {
    const res = await test
      .post("/user/sign_in")
      .set("Content-type", "application/json")
      .send({
        email: "test3@test.com",
        password: "test123",
      });
    // console.log(res);
    const { token: userToken } = res.body.data;
    const token = userToken;
    const response = await test
      .patch(`/user/sign_in/order/edit/${user.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("Should has an show endpoint on GET /user/sign_in/order/:id", async () => {
    const res = await test
      .post("/user/sign_in")
      .set("Content-type", "application/json")
      .send({
        email: "test3@test.com",
        password: "test123",
      });
    // console.log(res);
    const { id, token: userToken } = res.body.data;
    const token = userToken;
    const response = await test
      .get(`/user/sign_in/order/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  /*
  it("Should has an delete endpoint on DELETE /user/sign_in/order/delete/:id", async () => {
    const res = await test
      .post("/user/sign_in")
      .set("Content-type", "application/json")
      .send({
        email: "test3@test.com",
        password: "test123",
      });
    // console.log(res);
    const { id, token: userToken } = res.body.data;
    const token = userToken;
    const response = await test
      .delete(`/user/sign_in/order/delete/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  */
});
