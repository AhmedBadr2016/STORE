import supertest from "supertest";
import app from "../../server";
// import products_handler from "../products_main";

const test = supertest(app);

describe("product basic endpoints responses", () => {
  it("Should has an create endpoint on POST /product/create", async () => {
    const response = await test
      .post("/product/create")
      .send({ name: "apple", price: 30 });
    expect(response).toBeDefined();
  });

  it("Should has an index endpoint on /products", async () => {
    const response = await test.get("/products");
    expect(response).toBeDefined();
  });

  it("Should has an update endpoint on PATCH /product/edit/:id", async () => {
    const response = await test
      .patch("/product/edit/1")
      .send({ name: "apple", price: 50 });
    expect(response).toBeDefined();
  });

  it("Should has an show endpoint on GET /product/:id", async () => {
    const response = await test.get("/product/1");
    expect(response).toBeDefined();
  });

  it("Should has an delete endpoint on DELETE /product/delete/:id", async () => {
    const response = await test
      .delete("/product/delete/1")
      .set("Content-type", "application/json");
    expect(response).toBeDefined();
  });
});
