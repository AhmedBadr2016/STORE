import supertest from "supertest";
import Client from "../../database";
import { userStore } from "../../models/user_methods";
import { users } from "../../types/users";
import app from "../../server";

const userModel = new userStore();
const request = supertest(app);
let token = " ";

describe("User API Endpoints", () => {
  const user = {
    email: "test@test.com",
    username: "testUser",
    first_name: "Test",
    last_name: "User",
    password: "test123",
  } as users;

  beforeAll(async () => {
    const createdUser = await userModel.create(user);
    user.id = createdUser?.id;
  });

  afterAll(async () => {
    // clean db
    const connection = await Client.connect();
    `\nALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    const sql = "DELETE FROM users WHERE email = ($1) ";
    await connection.query(sql, ["test@test.com"]);
    connection.release();
  });

  describe("Test Authenticate methods", () => {
    it("should be able to authenticate to get token", async () => {
      const res = await request
        .post("/user/sign_in")
        .set("Content-type", "application/json")
        .send({
          email: "test@test.com",
          password: "test123",
        });
      expect(res.status).toBe(200);
      const {
        id,
        first_name,
        last_name,
        username,
        email,
        password,
        token: userToken,
      } = res.body.data;
      expect(id).toBe(user.id);
      expect(first_name).toBe("Test");
      expect(last_name).toBe("User");
      expect(username).toBe("testUser");
      expect(email).toBe("test@test.com");
      expect(password).toBeDefined();
      token = userToken;
    });

    it("should be failed to authenticate with wrong email", async () => {
      const res = await request
        .post("/user/sign_in")
        .set("Content-type", "application/json")
        .send({
          email: "wrong@email.com",
          password: "test123",
        });
      expect(res.status).toBe(404);
    });
  });

  describe("Test endpoints", () => {
    it("should create new user", async () => {
      const res = await request
        .post("/user/sign_up")
        .set("Content-type", "application/json")
        .send({
          first_name: "Test2",
          last_name: "User2",
          username: "testUser2",
          email: "test2@test2.com",
          password: "test123",
        });
      const { email, username, first_name, last_name } = res.body.data;
      console.log(
        `${email}, ${username}, ${username}, ${first_name}, ${last_name}`
      );
      expect(res.status).toBe(200);
      expect(email).toBe("test2@test2.com");
      expect(username).toBe("testUser2");
      expect(first_name).toBe("Test2");
      expect(last_name).toBe("User2");
    });

    it("should get list of users", async () => {
      const res = await request
        .get("/users")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      console.log(`the token: ${token}`);
      expect(res.status).toBe(200);
      // expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it("should get user info", async () => {
      const res = await request
        .get(`/user/test2@test2.com`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      // expect(res.body.data.username).toBe("testUser");
      // expect(res.body.data.email).toBe("test@test.com");
    });
  });
});
/*
    it("should update user info", async () => {
      const res = await request
        .patch(`/user/edit/${"test2@test2.com"}`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...user,
          username: "mohammedelzanaty",
          first_name: "Mohammed",
          last_name: "Elzanaty",
        });
      expect(res.status).toBe(200);
      /*
      const { id, email, username, first_name, last_name } = res.body.data;
      expect(id).toBe(user.id);
      expect(email).toBe(user.email);
      expect(username).toBe("mohammedelzanaty");
      expect(first_name).toBe("Mohammed");
      expect(last_name).toBe("Elzanaty");
     
    });

    it("should delete user", async () => {
      const res = await request
        .delete(`/user/delete/test2@test2.com`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      // expect(res.body.data.id).toBe(user.id);
      // expect(res.body.data.username).toBe("test2@test2.com");
    });
  });
});



import supertest from "supertest";
import users_handler from "../users_main";

const test = supertest(users_handler);

describe("user basic endpoints responses", () => {
  it("Should has an create endpoint on POST /user/sign_up", async () => {
    const response = await test.post("http://localhost:3000/user/sign_up");
    expect(response.status).toBe(200);
  });

  it("Should has an index endpoint on /users", async () => {
    const response = await test.get("http://localhost:3000/users");
    expect(response.status).toBe(200);
  });

  it("Should has an authenticat endpoint on POST /user/sign_in", async () => {
    const response = await test.post("http://localhost:3000/user/sign_in");
    expect(response.status).toBe(200);
  });

  it("Should has an update endpoint on PATCH /user/edit/:email", async () => {
    const response = await test.patch("http://localhost:3000/user/edit/:email");
    expect(response.status).toBe(200);
  });

  it("Should has an show endpoint on GET /user/:email", async () => {
    const response = await test.get("http://localhost:3000/user/:email");
    expect(response.status).toBe(200);
  });

  it("Should has an delete endpoint on DELETE /user/delete/:email", async () => {
    const response = await test.get("http://localhost:3000/user/delete/:email");
    expect(response.status).toBe(200);
  });
});
*/
