import { products } from "../products";

const product: products = {
  id: "1",
  name: "apple",
  price: 30,
};

describe("product type test", () => {
  it("Should the type be defind", () => {
    expect(product).toBeDefined();
  });
});
