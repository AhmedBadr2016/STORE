import { users } from "../users";

const user: users = {
  id: "1",
  first_name: "ahmed",
  last_name: "badr",
  email: "engineer1@gmail.com",
  username: "ahmed_badr",
  password: "pass1245",
};

describe("user type test", () => {
  it("Should the type be defind", () => {
    expect(user).toBeDefined();
  });
});
