import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

const testEmail = "email@test.com";
const testPassword = "test_password";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  // TODO: clean e2e test db (tests are currently linked and it's bad practice)
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const masterLogin = async () => {
    const loginResponse = await request(app.getHttpServer())
      .post("/user/login")
      .send({ email: process.env.MASTER_USER, password: testPassword })
      .expect(201)
      .expect("Content-Type", /json/);
    expect(loginResponse.body.access_token).toBeDefined();
    return loginResponse.body.access_token;
  };

  it("should have correct secrets", () => {
    expect(process.env.SECRET_JWT).toBe("test-jwt-secret");
    expect(process.env.SECRET_PASSWORD_SALT).toBe("test-password-salt");
  });

  it("should create successfully", async () => {
    const token = await masterLogin();
    const createResponse = await request(app.getHttpServer())
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: testEmail, password: testPassword, role: "USER" })
      .expect(201)
      .expect("Content-Type", /json/);
    expect(createResponse.body.id).toMatch(
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
    );
  });

  it("should fail user creation on missing data", async () => {
    const token = await masterLogin();
    return await request(app.getHttpServer())
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: testEmail })
      .expect(400);
  });

  it("should fail user creation on unexpected data", async () => {
    const token = await masterLogin();
    return await request(app.getHttpServer())
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: testEmail,
        password: testPassword,
        role: "USER",
        something: "strange",
      })
      .expect(400);
  });

  it("should fail user creation on non admin role", async () => {
    const loginResponse = await request(app.getHttpServer())
      .post("/user/login")
      .send({ email: testEmail, password: testPassword })
      .expect(201)
      .expect("Content-Type", /json/);
    expect(loginResponse.body.access_token).toBeDefined();
    const token = loginResponse.body.access_token;

    return await request(app.getHttpServer())
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "somebody",
        password: "else",
        role: "USER",
      })
      .expect(401);
  });

  it("should login successfully", async () => {
    const loginResponse = await request(app.getHttpServer())
      .post("/user/login")
      .send({ email: testEmail, password: testPassword })
      .expect(201)
      .expect("Content-Type", /json/);
    expect(loginResponse.body.access_token).toBeDefined();
  });

  it("should fail login on invalid login", async () => {
    const loginResponse = await request(app.getHttpServer())
      .post("/user/login")
      .send({ email: "invalid login", password: testPassword })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(loginResponse.body.access_token).toBeUndefined();
  });

  it("should fail login on invalid password", async () => {
    const loginResponse = await request(app.getHttpServer())
      .post("/user/login")
      .send({ email: testEmail, password: "invalid password" })
      .expect(401)
      .expect("Content-Type", /json/);
    expect(loginResponse.body.access_token).toBeUndefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
