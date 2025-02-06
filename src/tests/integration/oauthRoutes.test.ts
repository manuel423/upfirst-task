import request from "supertest";
import express from "express";
import oauthRoutes from "../../Routes/oauthRoute";

const app = express();
let token: any = "";
app.use(express.json());
app.use("/api/oauth", oauthRoutes);

describe("OAuth Routes", () => {
  test("GET /authorize with correct parameters", async () => {
    const response = await request(app).get(
      "/api/oauth/authorize?response_type=code&client_id=upfirst&redirect_uri=http://localhost:8081/process"
    );
    const urlString =response.header.location;
    const url = new URL(urlString);
    const code = url.searchParams.get("code");
    token = code;
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toMatch(
      /^http:\/\/localhost:8081\/process\?code=/
    );
  });

  test("POST /token with correct parameters", async () => {
    console.log("token", token);
    const response = await request(app).post("/api/oauth/token").send({
      grant_type: "authorization_code",
      code: token, 
      client_id: "upfirst",
      redirect_uri: "http://localhost:8081/process",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });
});
