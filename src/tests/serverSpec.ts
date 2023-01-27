// import supertest from "supertest";
// import app from "../server";
import { users } from "../types/users";
import { userStore, hash_password } from "../models/user_methods";
// import { orders } from "../types/orders";
import order_model from "../models/order_methods";
// import { products } from "../types/products";
import product_model from "../models/product_methods";
// import { order_products } from "../types/order_products";
import order_product_model from "../models/order_product_methods";
import config from "../config";
//create a request object
// const test = supertest(app);
const user_test = new userStore();
const order_test = new order_model();
const product_test = new product_model();
const order_product_test = new order_product_model();

describe("user Model test", () => {
  const new_user_test: users = {
    first_name: "ahmed",
    last_name: "badr",
    email: "eng.ahmedbadr2016@gmail.com",
    username: "ahmed_badr",
    password: "password123456",
  };

  const pass = hash_password("password123456");
  const pass_2 = hash_password("pass3456");

  const createdUser = {
    first_name: "ahmed",
    last_name: "badr",
    email: "eng.ahmedbadr2016@gmail.com",
    username: "ahmed_badr",
  };

  const new_user_test_2: users = {
    first_name: "amr",
    last_name: "badr",
    email: "eng.ahmedbadr2016@gmail.com",
    username: "amr_badr",
    password: "password123456",
  };

  const new_user_test_3: users = {
    first_name: "amr",
    last_name: "badr",
    email: "eng.ahmedbadr2017@gmail.com",
    username: "amr_badr",
    password: "password123456",
  };

  const createdUser_2 = {
    id: "6",
    first_name: "ahmed",
    last_name: "badr",
    email: "eng.ahmedbadr2016@gmail.com",
    username: "ahmed_badr",
  };

  // const new_product_test: products = {
  // name: "apple",
  // price: 30,
  // };
  // const createdProduct: products = { ...new_product_test, id: "1" };

  // const new_order_test: orders = {
  //  status: "active",
  // user_id: "1",
  // };
  // const createdOrder: orders = { ...new_order_test, id: "1" };

  // const new_order_product_test: order_products = {
  // order_id: "1",
  // product_id: "1",
  // quantity: 4,
  // };
  // const createdOrder_product: order_products = {
  //  ...new_order_product_test,
  //  id: "1",
  // };

  describe("user methods", () => {
    it("Should has an index method", () => {
      expect(user_test.index).toBeDefined();
    });
    it("index method Should return a list of users", async () => {
      const output = await user_test.index();
      expect(output).toEqual([]);
    });
    it("Should create new user to be created", async () => {
      const result = await user_test.create(new_user_test);
      expect(result?.username).toEqual("ahmed_badr");
    });
    it("Should authenticate user to be authenticated", async () => {
      const result = await user_test.authenticate(
        new_user_test.email,
        new_user_test.password
      );
      expect(result?.username).toEqual("ahmed_badr");
    });
    it("Should update user to be updated", async () => {
      const result = await user_test.update(new_user_test_2);
      expect(result).toBeUndefined();
    });
    it("Should show all users to be existed", async () => {
      const result = await user_test.index();
      expect(result).toBeDefined();
    });
    it("Should show specific user to be existed", async () => {
      const result = await user_test.show(new_user_test_2.email);
      expect(result.username).toEqual("amr_badr");
    });
    it("Should delete user to be deleted", async () => {
      const result = await user_test.delete(new_user_test.email);
      expect(result).toBeTruthy;
    });
  });
});

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
});

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
  /*
  it("create method should add a new order", async () => {
    const result = await order_test.create({
      status: "complete",
      user_id: "2",
    });
    expect(result).toBeFalse();
  });
*/
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
});

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
  /*
  it("create method should add a order_product", async () => {
    const result = await order_product_test.create({
      order_id: "1",
      product_id: "1",
      quantity: 10,
    });
    expect(result).toBeFalse();
  });
*/
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
});
