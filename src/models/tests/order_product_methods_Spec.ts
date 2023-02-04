import { order_products } from "../../types/order_products";
import order_product_model from "../order_product_methods";
import Client from "../../database";
import order_model from "../order_methods";
import { userStore } from "../user_methods";
import { products } from "../../types/products";
import { orders } from "../../types/orders";
import product_model from "../product_methods";

const order_module_test = new order_product_model();
const user_test = new userStore();
const order_test = new order_model();
const product_test = new product_model();

describe("order product methods tests", () => {
  describe("Test methods exists", () => {
    it("should have a Get One order product method", () => {
      expect(order_module_test.get_specific_order_product).toBeDefined();
    });

    it("should have a Create order product method", () => {
      expect(order_module_test.create).toBeDefined();
    });

    it("should have a Update order product method", () => {
      expect(order_module_test.update_order_product).toBeDefined();
    });

    it("should have a Delete order product method", () => {
      expect(order_module_test.delete).toBeDefined();
    });
  });

  describe("order product Model test", () => {
    const new_order_test: order_products = {
      product_id: "12",
      order_id: "11",
      quantity: 1,
    } as order_products;

    beforeAll(async () => {
      const authenticatedUser = await user_test.authenticate(
        "eng.ahmeedbadr20167@gmail.com",
        "paassword123456"
      );
      if (authenticatedUser) {
        const new_order_test2: orders = {
          status: "complete",
          user_id: authenticatedUser.id as unknown as string,
        };

        const result = await order_test.create(new_order_test2);

        const new_product_test2: products = {
          name: "persil",
          price: 10,
        };

        const createProduct = await product_test.create(new_product_test2);
        const createOrder = await order_module_test.create(
          result.id as unknown as string,
          createProduct.id as unknown as string,
          10
        );
        new_order_test.id = createOrder.id;
        return createOrder;
      }
    });
    afterAll(async () => {
      const connection = await Client.connect();
      const sql = "DELETE FROM users Where id = ($1)";
      await connection.query(sql, [new_order_test.id]);
      connection.release();
    });

    describe("order product methods", () => {
      it("Should has an show all method", () => {
        expect(order_module_test.get_all_order_products).toBeDefined();
      });
      it("show all method should return All available order products in DB", async () => {
        const orders = await order_module_test.get_all_order_products;
        expect(orders.length).toBe(0);
      });
      it("Should create new order products to be created", async () => {
        const authenticatedUser = await user_test.authenticate(
          "eng.ahmeedbadr20167@gmail.com",
          "paassword123456"
        );
        console.log(authenticatedUser);
        if (authenticatedUser) {
          console.log(`${authenticatedUser} is true`);
          const new_order_test3: orders = {
            status: "complete",
            user_id: authenticatedUser.id as unknown as string,
          };

          const result2 = await order_test.create(new_order_test3);
          console.log(result2);
          const new_product_test2: products = {
            name: "persil",
            price: 10,
          };

          const createProduct = await product_test.create(new_product_test2);
          console.log(createProduct);
          console.log(`${result2.id},${createProduct.id},10`);
          const createOrder = await order_module_test.create(
            result2.id as unknown as string,
            createProduct.id as unknown as string,
            10 as number
          );
          console.log(createOrder);
          expect(createOrder.id).toBe(createOrder.id);
          expect(createOrder.order_id).toBe(result2.id);
          expect(createOrder.product_id).toBe(createProduct.id);
          expect(createOrder.quantity).toBe(10);
        }
      });
      it("Should update order products to be updated", async () => {
        const result = await order_module_test.update_order_product("1", "20");
        expect(result).toBeUndefined();
      });
      it("Should show all orders products to be existed", async () => {
        const result = await order_module_test.get_all_order_products;
        expect(result).toBeDefined();
      });
      it("Should show specific order to be existed", async () => {
        const authenticatedUser = await user_test.authenticate(
          "eng.ahmeedbadr20167@gmail.com",
          "paassword123456"
        );
        if (authenticatedUser) {
          const new_order_test4: orders = {
            status: "complete",
            user_id: authenticatedUser.id as unknown as string,
          };

          const result2 = await order_test.create(new_order_test4);

          const new_product_test2: products = {
            name: "persil",
            price: 10,
          };

          const createProduct = await product_test.create(new_product_test2);
          const createOrder = await order_module_test.create(
            result2.id as unknown as string,
            createProduct.id as unknown as string,
            10
          );
          console.log(createOrder);

          const createUser2 =
            await order_module_test.get_specific_order_product(
              createOrder.id as unknown as string
            );
          if (createUser2) {
            expect(createOrder.order_id).toBe(result2.id);
            expect(createOrder.product_id).toBe(createProduct.id);
            expect(createOrder.quantity).toBe(10);
          }
        }
      });
      it("Should delete order to be deleted", async () => {
        const result = await order_module_test.delete(new_order_test.id || "0");
        expect(result).toBeTruthy;
      });
    });
  });
});

/*import order_product_model from "../order_product_methods";

const order_product_test = new order_product_model();

describe("order_product Model", () => {
  it("should have an index method", () => {
    expect(order_product_test.get_all_order_products).toBeDefined();
  });

  it("should have a show method", () => {
    expect(order_product_test.get_specific_order_product).toBeDefined();
  });

  it("should have a create method", () => {
    expect(order_product_test.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(order_product_test.update_order_product).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(order_product_test.delete).toBeDefined();
  });

  it("index method should return a list of order_products", async () => {
    const result = await order_product_test.get_all_order_products();
    expect(result).toEqual([]);
  });

  it("show method should return the correct order_product", async () => {
    const result = await order_product_test.get_specific_order_product("1");
    expect(result).toBeFalsy();
  });

  it("delete method should remove the order_product", async () => {
    // order_product_test.delete();
    const result = await order_product_test.delete("1");

    expect(result).toBeFalsy();
  });
});*/
