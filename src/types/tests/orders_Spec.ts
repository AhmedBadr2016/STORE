import { orders } from "../orders";

const order: orders = {
  id: "1",
  status: "active",
  user_id: "1",
};

describe("order type test", () => {
  it("Should the type be defind", () => {
    expect(order).toBeDefined();
  });
});
