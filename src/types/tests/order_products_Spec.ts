import { order_products } from "../order_products";

const order_product: order_products = {
  id: "1",
  order_id: "1",
  product_id: "1",
  quantity: 4,
};

describe("order_product type test", () => {
  it("Should the type be defind", () => {
    expect(order_product).toBeDefined();
  });
});
