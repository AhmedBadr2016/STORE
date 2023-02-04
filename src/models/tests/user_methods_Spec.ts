import { users } from "../../types/users";
import { userStore } from "../user_methods";
import Client from "../../database";

const user_test = new userStore();

describe("Authentication Module", () => {
  describe("Test methods exists", () => {
    it("should have an Authenticate User method", () => {
      expect(user_test.authenticate).toBeDefined();
    });

    it("should have a Get One User method", () => {
      expect(user_test.show).toBeDefined();
    });

    it("should have a Create User method", () => {
      expect(user_test.create).toBeDefined();
    });

    it("should have a Update User method", () => {
      expect(user_test.update).toBeDefined();
    });

    it("should have a Delete User method", () => {
      expect(user_test.delete).toBeDefined();
    });
  });

  describe("user Model test", () => {
    const new_user_test: users = {
      first_name: "ahmed",
      last_name: "badr",
      email: "eng.ahmedbadr2016321@gmail.com",
      username: "ahmed_badr",
      password: "password123456",
    };

    const new_user_test_2: users = {
      first_name: "amr",
      last_name: "badr",
      email: "eng.ahmedbadr2016321@gmail.com",
      username: "amr_badr",
      password: "password123456",
    };
    beforeAll(async () => {
      const createUser = await user_test.create(new_user_test);
      new_user_test.id = createUser?.id;
    });
    afterAll(async () => {
      const connection = await Client.connect();
      const sql =
        "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;";
      await connection.query(sql);
      connection.release();
    });

    describe("user methods", () => {
      it("Should has an index method", () => {
        expect(user_test.index).toBeDefined();
      });
      it("Get Many method should return All available users in DB", async () => {
        const users = await user_test.index();
        expect(users.length).toBeDefined();
      });
      it("Should create new user to be created", async () => {
        const result = await user_test.create({
          first_name: "aomr",
          last_name: "baadr",
          username: "aamr_badr",
          email: "eng.ahmedbadr2016789@gmail.com",
          password: "paassword123456",
        });
        expect(result?.id).toBe(result?.id);
        expect(result?.first_name).toBe("aomr");
        expect(result?.last_name).toBe("baadr");
        expect(result?.email).toBe("eng.ahmedbadr2016789@gmail.com");
        expect(result?.username).toBe("aamr_badr");
      });
    });
    it("Should authenticate user to be authenticated", async () => {
      const result = await user_test.authenticate(
        new_user_test.email as string,
        new_user_test.password as string
      );
      expect(result?.email).toBe(new_user_test.email);
    });
    it("Should update user to be updated", async () => {
      const result = await user_test.update(
        "ahmed",
        "badr",
        new_user_test.email as string,
        "ahmed_badr",
        "password123456"
      );
      expect(result).toBeDefined();
    });
    it("Should show all users to be existed", async () => {
      const result = await user_test.index();
      expect(result).toBeDefined();
    });
    it("Should show specific user to be existed", async () => {
      const result = await user_test.show(new_user_test_2.email);
      expect(result.username).toEqual("ahmed_badr");
    });
    it("Should delete user to be deleted", async () => {
      const result = await user_test.delete("eng.ahmedbadr2016789@gmail.com");
      expect(result).toBeTruthy;
    });
  });
});
