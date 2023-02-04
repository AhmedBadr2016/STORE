import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("test basic endpoint server", () => {
  it("Get the / endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});

/*
import supertest from "supertest";
import app from "../server";
import { users } from "../types/users";
import Client from "../database";
import { userStore } from "../models/user_methods";
import { request } from "express";

const test = supertest(app);
const user_test = new userStore();

describe("app endpoint test", () => {
  const new_user_test_3: users = {
    first_name: "ahmed",
    last_name: "badr",
    email: "eng.ahmedbadr2017@gmail.com",
    username: "ahmed_badr",
    password: "password123456",
  };
  beforeAll(async () => {
    const createUser = await user_test.create(new_user_test_3);
    const user_id = createUser?.id;
    const password = createUser?.password;
  });

  afterAll(async () => {
    const connection = await Client.connect();
    // \nALTER SEQUENCE users_id_seq RESTART WITH 1;
    const sql = "DELETE FROM users Where email = ($1)";
    await connection.query(sql, ["eng.ahmedbadr2017@gmail.com"]);
    connection.release();
  });

  describe("user methods", () => {
    it("Should has basic end point for app", async () => {
      const output = await test.post("/user/sign_up").send({
        first_name: "string",
        last_name: "string",
        email: "string@ghg.com",
        username: "string",
        password: "string",
      });
      expect(output).toBeDefined();
    });

    it("Should has basic end point for app", async () => {
      const output = await test.post("/user/sign_in").send({
        first_name: "string",
        last_name: "string",
        email: "string@ghg.com",
        username: "string",
        password: "string",
      });
      expect(output).toBeDefined();
    });

    it("Should has basic end point for app", async () => {
      const output = await test.patch("/user/edit/eng.ahmedbadr2017@gmail.com");
      expect(output).toBeDefined();
    });

    it("Should has basic end point for app", async () => {
      const output = await test.get("/users");
      expect(output).toBeDefined();
    });

    it("Should has basic end point show user in app", async () => {
      const output = await test.get("/user/eng.ahmedbadr2017@gmail.com");
      expect(output).toBeDefined();
    });

    it("Should has basic end point for delete user in app", async () => {
      const output = await test.delete(
        "/user/delete/eng.ahmedbadr2017@gmail.com"
      );
      expect(output).toBeDefined();
    });
  });

  describe("product basic endpoints in app", () => {
    it("Should has an index endpoint on /products", async () => {
      const response = await test.get("/products");
      expect(response.statusCode).toBe(200);
    });

    it("Should has an create endpoint on POST /product/create", async () => {
      const response = await test.post("/product/create").send({
        name: "string",
        price: 12,
      });
      expect(response.statusCode).toBe(200);
    });

    it("Should has an update endpoint on PATCH /product/edit/:id", async () => {
      const response = await test.patch("/product/edit/:id");
      expect(response.statusCode).toBe(200);
    });

    it("Should has an show endpoint on GET /product/:id", async () => {
      const response = await test.get("/product/:id");
      expect(response.statusCode).toBe(200);
    });

    it("Should has an delete endpoint on DELETE /product/delete/:id", async () => {
      const response = await test.get("/product/delete/:id");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("order basic endpoints in app", () => {
    it("Should has an index endpoint on /user/sign_in/orders", async () => {
      const response = await test.get("/user/sign_in/orders");
      expect(response.statusCode).toBe(200);
    });

    it("Should has an create endpoint on POST /user/sign_in/order", async () => {
      const response = await test.post("/user/sign_in/order").send({
        status: "active",
        user_id: "1",
      });
      expect(response.statusCode).toBe(200);
    });

    it("Should has an update endpoint on PATCH /user/sign_in/order/edit/:id", async () => {
      const response = await test.patch("/user/sign_in/order/edit/:id");
      expect(response.statusCode).toBe(200);
    });

    it("Should has an show endpoint on GET /user/sign_in/order/:id", async () => {
      const response = await test.get("/user/sign_in/order/:id");
      expect(response.statusCode).toBe(200);
    });

    it("Should has an delete endpoint on DELETE /user/sign_in/order/delete/:id", async () => {
      const response = await test.get("/user/sign_in/order/delete/:id");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("order_product basic endpoints in app", () => {
    it("Should has an index endpoint on /order_product/:id", async () => {
      const response = await test.get("/order_product/:id");
      expect(response.statusCode).toBe(200);
    });

    it("Should has an create endpoint on POST /order_product/create", async () => {
      const response = await test.post("/order_product/create").send({
        quantity: 15,
      });
      expect(response.statusCode).toBe(200);
    });

    it("Should has an add product to cart endpoint on POST /user/sign_in/order/:id/products", async () => {
      const response = await test
        .post("/user/sign_in/order/:id/products")
        .send({
          id: "1",
        });
      expect(response.statusCode).toBe(200);
    });

    it("Should has an update endpoint on PATCH /order_product/edit/:id", async () => {
      const response = await test.patch("/order_product/edit/:id");
      expect(response.statusCode).toBe(200);
    });

    it("Should has an show endpoint on GET /order_product/:id", async () => {
      const response = await test.get("/order_product/:id");
      expect(response.statusCode).toBe(200);
    });

    it("Should has an delete endpoint on DELETE /order_product/delete/:id", async () => {
      const response = await test.get("/order_product/delete/:id");
      expect(response.statusCode).toBe(200);
    });
  });
});
*/
/*import supertest from "supertest";
import app from "../server";
import { users } from "../types/users";
import Client from "../database";
import { userStore } from "../models/user_methods";

const test = supertest(app);
const user_test = new userStore();

describe("app endpoint test", () => {
  it("Should has basic end point for app", async () => {
    const output = await test.post("/");
    expect(output.status).toBe(200);
  });
  const new_user_test_3: users = {
    first_name: "ahmed",
    last_name: "badr",
    email: "eng.ahmedbadr2017@gmail.com",
    username: "ahmed_badr",
    password: "password123456",
  };
  beforeAll(async () => {
    const createUser = await user_test.create(new_user_test_3);
    const user_id = createUser?.id;
    const password = createUser?.password;
  });

  afterAll(async () => {
    const connection = await Client.connect();
    // \nALTER SEQUENCE users_id_seq RESTART WITH 1;
    const sql = "DELETE FROM users ";
    await connection.query(sql);
    connection.release();
  });

  describe("user methods", () => {
    it("Should has basic end point for app", async () => {
      const output = await test.post("/user/sign_up");
      expect(output.status).toBe(400);
    });

    it("Should has basic end point for app", async () => {
      const output = await test.post("/user/sign_in");
      expect(output.status).toBe(200);
    });

    it("Should has basic end point for app", async () => {
      const output = await test.patch("/user/edit/:email");
      expect(output.status).toBe(400);
    });

    it("Should has basic end point for app", async () => {
      const output = await test.get("/users");
      expect(output.status).toBe(400);
    });

    it("Should has basic end point show user in app", async () => {
      const output = await test.get("/user/:email");
      expect(output.status).toBe(400);
    });

    it("Should has basic end point for delete user in app", async () => {
      const output = await test.delete("/user/delete/:email");
      expect(output.status).toBe(400);
    });
  });

  describe("product basic endpoints in app", () => {
    it("Should has an index endpoint on /products", async () => {
      const response = await test.get("/products");
      expect(response.status).toBe(400);
    });

    it("Should has an create endpoint on POST /product/create", async () => {
      const response = await test.post("/product/create");
      expect(response.status).toBe(400);
    });

    it("Should has an update endpoint on PATCH /product/edit/:id", async () => {
      const response = await test.patch("/product/edit/:id");
      expect(response.status).toBe(400);
    });

    it("Should has an show endpoint on GET /product/:id", async () => {
      const response = await test.get("/product/:id");
      expect(response.status).toBe(400);
    });

    it("Should has an delete endpoint on DELETE /product/delete/:id", async () => {
      const response = await test.get("/product/delete/:id");
      expect(response.status).toBe(400);
    });
  });

  describe("order basic endpoints in app", () => {
    it("Should has an index endpoint on /user/sign_in/orders", async () => {
      const response = await test.get("/user/sign_in/orders");
      expect(response.status).toBe(400);
    });

    it("Should has an create endpoint on POST /user/sign_in/order", async () => {
      const response = await test.post("/user/sign_in/order");
      expect(response.status).toBe(400);
    });

    it("Should has an update endpoint on PATCH /user/sign_in/order/edit/:id", async () => {
      const response = await test.patch("/user/sign_in/order/edit/:id");
      expect(response.status).toBe(400);
    });

    it("Should has an show endpoint on GET /user/sign_in/order/:id", async () => {
      const response = await test.get("/user/sign_in/order/:id");
      expect(response.status).toBe(400);
    });

    it("Should has an delete endpoint on DELETE /user/sign_in/order/delete/:id", async () => {
      const response = await test.get("/user/sign_in/order/delete/:id");
      expect(response.status).toBe(400);
    });
  });

  describe("order_product basic endpoints in app", () => {
    it("Should has an index endpoint on /order_product/:id", async () => {
      const response = await test.get("/order_product/:id");
      expect(response.status).toBe(400);
    });

    it("Should has an create endpoint on POST /order_product/create", async () => {
      const response = await test.post("/order_product/create");
      expect(response.status).toBe(400);
    });

    it("Should has an add product to cart endpoint on POST /user/sign_in/order/:id/products", async () => {
      const response = await test.post("/user/sign_in/order/:id/products");
      expect(response.status).toBe(400);
    });

    it("Should has an update endpoint on PATCH /order_product/edit/:id", async () => {
      const response = await test.patch("/order_product/edit/:id");
      expect(response.status).toBe(400);
    });

    it("Should has an show endpoint on GET /order_product/:id", async () => {
      const response = await test.get("/order_product/:id");
      expect(response.status).toBe(400);
    });

    it("Should has an delete endpoint on DELETE /order_product/delete/:id", async () => {
      const response = await test.get("/order_product/delete/:id");
      expect(response.status).toBe(400);
    });
  });
});
*/
