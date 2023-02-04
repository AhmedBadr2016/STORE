import { products } from "../../types/products";
import product_model from "../product_methods";
import Client from "../../database";

const product_test = new product_model();

describe("products methods tests", () => {
  describe("Test methods exists", () => {
    it("should have a Get One product method", () => {
      expect(product_test.get_specific_product).toBeDefined();
    });

    it("should have a Create product method", () => {
      expect(product_test.create).toBeDefined();
    });

    it("should have a Update product method", () => {
      expect(product_test.update_product).toBeDefined();
    });

    it("should have a Delete product method", () => {
      expect(product_test.delete).toBeDefined();
    });
  });

  describe("product Model test", () => {
    const new_product_test: products = {
      name: "dawny",
      price: 30,
    };

    const new_product_test2: products = {
      name: "persil",
      price: 10,
    };
    beforeAll(async () => {
      const createUser = await product_test.create(new_product_test);
      new_product_test.id = createUser?.id;
    });
    afterAll(async () => {
      const connection = await Client.connect();
      const sql = "DELETE FROM products Where id > ($1)";
      await connection.query(sql, ["1"]);
      connection.release();
    });

    describe("product methods", () => {
      it("Should has an show all method", () => {
        expect(product_test.get_all_products).toBeDefined();
      });
      it("show all method should return All available products in DB", async () => {
        const orders = await product_test.get_all_products;
        expect(orders.length).toBeGreaterThanOrEqual(0);
      });
      it("Should create new product to be created", async () => {
        const result = await product_test.create({
          name: "dawn",
          price: 50,
        } as products);
        expect(result).toEqual({
          id: result.id,
          name: "dawn",
          price: 50,
        } as products);
      });
      it("Should update product to be updated", async () => {
        const result = await product_test.update_product(
          new_product_test.id as unknown as string,
          "hero",
          20
        );
        expect(result).toBeDefined();
      });
      it("Should show all products to be existed", async () => {
        const result = await product_test.get_all_products;
        expect(result).toBeDefined();
      });
      it("Should show specific product to be existed", async () => {
        const result = await product_test.get_specific_product(
          new_product_test2.id || "0"
        );
        expect(result).toBeDefined;
      });
      it("Should delete product to be deleted", async () => {
        const result = await product_test.delete(new_product_test.id || "0");
        expect(result).toBeTruthy;
      });
    });
  });
});

/*import product_model from "../product_methods";

const product_test = new product_model();

describe("product Model", () => {
  it("should have an index method", () => {
    expect(product_test.get_all_products).toBeDefined();
  });

  it("should have a show method", () => {
    expect(product_test.get_specific_product).toBeDefined();
  });

  it("should have a create method", () => {
    expect(product_test.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(product_test.update_product).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(product_test.delete).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await product_test.create({
      name: "Bridge to Terabithia",
      price: 250,
    });
    expect(result.name).toEqual("Bridge to Terabithia");
  });

  it("index method should return a list of products", async () => {
    const result = await product_test.get_all_products();
    expect(result).toBeDefined();
  });

  it("show method should return the correct product", async () => {
    const result = await product_test.get_specific_product("2");
    expect(result).toBeDefined();
  });

  it("delete method should remove the product", async () => {
    // product_test.delete();
    const result = await product_test.delete("1");

    expect(result).toBeUndefined();
  });
});*/
