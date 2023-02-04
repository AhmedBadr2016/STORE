import { userStore } from "../../models/user_methods";
import jwt from "jsonwebtoken";
import config from "../../config";

const our_user_main = new userStore();

describe("Validation test", () => {
  it("Should Validation function work correctly", async () => {
    const new_user = await our_user_main.authenticate(
      " req.body.email",
      "req.body.password"
    );
    console.log(new_user);
    const token_1 = jwt.sign(
      { new_user },
      config.tokensecret as unknown as string
    );
    console.log(token_1);
    expect(token_1).toBeDefined();
  });
  // };
});
