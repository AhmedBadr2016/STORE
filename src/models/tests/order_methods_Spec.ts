import { orders } from "../../types/orders";
import { users } from "../../types/users";
import { userStore } from "../user_methods";
import order_model from "../order_methods";
import Client from "../../database";

const user_test = new userStore();
const order_test = new order_model();

describe("order methods tests", () => {
  describe("Test methods exists", () => {
    it("should have a Get One order method", () => {
      expect(order_test.get_specific_order).toBeDefined();
    });

    it("should have a Create order method", () => {
      expect(order_test.create).toBeDefined();
    });

    it("should have a Update order method", () => {
      expect(order_test.update_order).toBeDefined();
    });

    it("should have a Delete order method", () => {
      expect(order_test.delete).toBeDefined();
    });
  });

  describe("order Model test", () => {
    const test_user: users = {
      first_name: "atlas",
      last_name: "string",
      email: "string2@gmail.com",
      username: "hello",
      password: "ahmed",
    };

    beforeAll(async () => {
      const createdUser = await user_test.create(test_user);
      const test_user_id = createdUser?.id as unknown as string;

      if (createdUser) {
        const new_order_test: orders = {
          status: "complete",
          user_id: createdUser.id as unknown as string,
        };
        console.log("ids:      ", new_order_test.id, test_user_id);

        return { createdUser, new_order_test };
      }
    });

    const new_order_test2: orders = {
      status: "complete",
      user_id: test_user.id as unknown as string,
    };

    afterAll(async () => {
      const connection = await Client.connect();
      const sql = "DELETE FROM users WHERE email= ($1)";
      await connection.query(sql, ["string2@gmail.com"]);
      connection.release();
    });

    describe("order methods", () => {
      it("Should has an show all method", () => {
        expect(order_test.get_all_orders).toBeDefined();
      });
      it("show all method should return All available orders in DB", async () => {
        const orders = await order_test.get_all_orders;
        expect(orders.length).toBeTruthy;
      });
      it("Should create new order to be created", async () => {
        const authenticatedUser = await user_test.authenticate(
          "eng.ahmeedbadr20167@gmail.com",
          "paassword123456"
        );
        if (authenticatedUser) {
          const new_order_test3: orders = {
            status: "complete",
            user_id: authenticatedUser.id as unknown as string,
          };
          console.log(new_order_test3);
          const result = await order_test.create(new_order_test3);
          console.log(result);
          // expect(result.status).toEqual("complete");
          expect(result.user_id).toEqual(new_order_test3.user_id);
        }
      });
      it("Should update order to be updated", async () => {
        const authenticatedUser = await user_test.authenticate(
          "eng.ahmeedbadr20167@gmail.com",
          "paassword123456"
        );
        if (authenticatedUser) {
          const new_order_test3: orders = {
            status: "complete",
            user_id: authenticatedUser.id as unknown as string,
          };

          const result = await order_test.create(new_order_test3);

          if (result.id) {
            const result2 = await order_test.update_order(result.id, "active");
            expect(result2.status).toEqual("active");
            expect(result.user_id).toEqual(new_order_test3.user_id);
          }
        }
      });
      it("Should show all orders to be existed", async () => {
        const result = await order_test.get_all_orders;
        expect(result).toBeDefined();
      });
      it("Should show specific order to be existed", async () => {
        const result = await order_test.get_specific_order(
          new_order_test2.id || "0"
        );
        expect(result).toBeDefined;
      });
      it("Should delete order to be deleted", async () => {
        const result = await order_test.delete(new_order_test2.user_id);
        expect(result).toBeTruthy;
      });
    });
  });
});

/*import order_model from "../order_methods";

const order_test = new order_model();

describe("order Model", () => {
  it("should have an index method", () => {
    expect(order_test.get_all_orders).toBeDefined();
  });

  it("should have a show method", () => {
    expect(order_test.get_specific_order).toBeDefined();
  });

  it("should have a create method", () => {
    expect(order_test.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(order_test.update_order).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(order_test.delete).toBeDefined();
  });

  it("index method should return a list of orders", async () => {
    const result = await order_test.get_all_orders();
    expect(result).toEqual([]);
  });

  it("show method should return the correct order", async () => {
    const result = await order_test.get_specific_order("1");
    expect(result).toBeFalsy();
  });

  it("delete method should remove the order", async () => {
    // order_test.delete();
    const result = await order_test.delete("1");

    expect(result).toBeUndefined();
  });
});*/
