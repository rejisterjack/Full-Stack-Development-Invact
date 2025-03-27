const request = require("supertest")
const app = require("./app")

// 1. Missing Fields Test : ( Test case name: Handle missing email or password fields.)
// Description: Handle scenarios where email or password fields are missing.
// 2. Rate Limiting Test : ( Test case name: Block login attempts exceeding 5 attempts within one minute)
// Description: Simulate 5 failed attempts within one minute and ensure the API blocks the next attempt with the following message:
// {
//     "error": "Too many login attempts. Try again later."
// }

describe("Login API", () => {
  it("should handle scenarios where email or password fields are missing", async () => {
    const response = await request(app).post("/login").send({
      email: "user@example.com",
    })

    console.log(response, "response")

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty(
      "message",
      "Email and password are required"
    )
  })

  it("Simulate 5 failed attempts within one minute and ensure the API blocks the next attempt with the following message", async () => {
    for (let i = 0; i < 5; i++) {
      await request(app).post("/login").send({
        email: "user@example.com",
        password: "password",
      })
    }

    const response = await request(app).post("/login").send({
      email: "user@example.com",
      password: "password",
    })

    expect(response.status).toBe(429)
    expect(response.body).toHaveProperty(
      "error",
      "Too many login attempts. Try again later."
    )
  })

  
})
