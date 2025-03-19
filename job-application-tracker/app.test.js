const request = require("supertest")
const app = require("./app")
const { sequelize } = require("./config/database")
const Application = require("./models/Application.model")
const Interview = require("./models/Interview.model")

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true })
    await Application.bulkCreate([
      {
        role: "Data Analyst",
        company: "Data Corp",
        appliedAt: "2024-01-25",
        status: "interview",
        interviewRounds: 2,
      },
      {
        role: "Data Analyst",
        company: "Data Corp",
        jdUrl: "",
        appliedAt: "2024-01-25T00:00:00.000Z",
        status: "no reply",
        interviewRounds: 0,
      },
      {
        role: "Frontend Developer",
        company: "Web Solutions",
        jdUrl: "https://websolutions.com/jobs/frontend",
        appliedAt: "2024-03-10T00:00:00.000Z",
        status: "accepted",
        interviewRounds: 0,
      },
      {
        role: "Backend Developer",
        company: "API Builders",
        jdUrl: "https://apibuilders.com/jobs/backend",
        appliedAt: "2024-02-15T00:00:00.000Z",
        status: "rejected",
        interviewRounds: 1,
      },
      {
        role: "Full Stack Developer",
        company: "Dev Hub",
        jdUrl: "https://devhub.com/jobs/fullstack",
        appliedAt: "2024-01-20T00:00:00.000Z",
        status: "selected",
        interviewRounds: 3,
      },
      {
        role: "Product Manager",
        company: "Innovate Inc",
        jdUrl: "https://innovateinc.com/jobs/pm",
        appliedAt: "2024-03-05T00:00:00.000Z",
        status: "interview",
        interviewRounds: 2,
      },
      {
        role: "UI/UX Designer",
        company: "Design Studio",
        jdUrl: "https://designstudio.com/jobs/uiux",
        appliedAt: "2024-02-20T00:00:00.000Z",
        status: "no reply",
        interviewRounds: 0,
      },
      {
        role: "DevOps Engineer",
        company: "CloudOps",
        jdUrl: "https://cloudops.com/jobs/devops",
        appliedAt: "2024-01-30T00:00:00.000Z",
        status: "interview",
        interviewRounds: 1,
      },
      {
        role: "QA Engineer",
        company: "Testify",
        jdUrl: "https://testify.com/jobs/qa",
        appliedAt: "2024-03-01T00:00:00.000Z",
        status: "accepted",
        interviewRounds: 0,
      },
      {
        role: "Machine Learning Engineer",
        company: "AI Labs",
        jdUrl: "https://ailabs.com/jobs/ml",
        appliedAt: "2024-02-25T00:00:00.000Z",
        status: "rejected",
        interviewRounds: 2,
      },
    ])
    await Interview.bulkCreate([
      {
        id: 1,
        applicationId: 1,
        roundNum: 1,
        roundType: "telephonic",
        interviewDate: "2024-02-10T00:00:00.000Z",
        questions: "What is your experience with React?",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:18:01.887Z",
        updatedAt: "2025-03-18T20:18:01.887Z",
      },
      {
        id: 2,
        applicationId: 1,
        roundNum: 2,
        roundType: "live coding",
        interviewDate: "2024-02-15T00:00:00.000Z",
        questions: "Solve a React problem live",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:22:08.603Z",
        updatedAt: "2025-03-18T20:22:08.603Z",
      },
      {
        id: 3,
        applicationId: 6,
        roundNum: 1,
        roundType: "HR screening",
        interviewDate: "2024-03-10T00:00:00.000Z",
        questions: "Tell us about yourself",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:30:00.000Z",
        updatedAt: "2025-03-18T20:30:00.000Z",
      },
      {
        id: 4,
        applicationId: 6,
        roundNum: 2,
        roundType: "technical",
        interviewDate: "2024-03-15T00:00:00.000Z",
        questions: "Explain system design concepts",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:35:00.000Z",
        updatedAt: "2025-03-18T20:35:00.000Z",
      },
      {
        id: 5,
        applicationId: 8,
        roundNum: 1,
        roundType: "technical",
        interviewDate: "2024-02-05T00:00:00.000Z",
        questions: "What is your experience with CI/CD pipelines?",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:40:00.000Z",
        updatedAt: "2025-03-18T20:40:00.000Z",
      },
      {
        id: 6,
        applicationId: 5,
        roundNum: 1,
        roundType: "telephonic",
        interviewDate: "2024-01-25T00:00:00.000Z",
        questions: "What are your strengths?",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:45:00.000Z",
        updatedAt: "2025-03-18T20:45:00.000Z",
      },
      {
        id: 7,
        applicationId: 5,
        roundNum: 2,
        roundType: "technical",
        interviewDate: "2024-01-30T00:00:00.000Z",
        questions: "Explain your experience with full-stack development",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T20:50:00.000Z",
        updatedAt: "2025-03-18T20:50:00.000Z",
      },
      {
        id: 8,
        applicationId: 5,
        roundNum: 3,
        roundType: "final",
        interviewDate: "2024-02-05T00:00:00.000Z",
        questions: "Discuss your salary expectations",
        roleOffered: "Full Stack Developer",
        compensationOffered: "120000",
        createdAt: "2025-03-18T20:55:00.000Z",
        updatedAt: "2025-03-18T20:55:00.000Z",
      },
      {
        id: 9,
        applicationId: 8,
        roundNum: 2,
        roundType: "managerial",
        interviewDate: "2024-02-10T00:00:00.000Z",
        questions: "How do you handle team conflicts?",
        roleOffered: "",
        compensationOffered: "",
        createdAt: "2025-03-18T21:00:00.000Z",
        updatedAt: "2025-03-18T21:00:00.000Z",
      },
      {
        id: 10,
        applicationId: 8,
        roundNum: 3,
        roundType: "final",
        interviewDate: "2024-02-15T00:00:00.000Z",
        questions: "What are your long-term career goals?",
        roleOffered: "DevOps Engineer",
        compensationOffered: "110000",
        createdAt: "2025-03-18T21:05:00.000Z",
        updatedAt: "2025-03-18T21:05:00.000Z",
      },
    ])
  } catch (error) {
    console.error(error.message)
  }
})

describe("POST /applications", () => {
  test("should create a new application successfully with valid data", async () => {
    const response = await request(app).post("/applications").send({
      role: "Software Engineer",
      company: "Tech Solutions",
      jdUrl: "https://techsolutions.com/jobs/software",
      appliedAt: "2024-03-20",
    })
    expect(response.status).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        role: "Software Engineer",
        company: "Tech Solutions",
        jdUrl: "https://techsolutions.com/jobs/software",
        appliedAt: "2024-03-20T00:00:00.000Z",
        status: "no reply",
        interviewRounds: 0,
      })
    )
  })

  test("should return 400 if required fields are missing", async () => {
    const response = await request(app).post("/applications").send({
      company: "Tech Solutions",
    })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: "Role and company are required.",
    })
  })
})

describe("GET /applications", ()=>{

  test("should retrieve all job applications", async()=>{
    const response = await request(app).get("/applications")
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(11)
  })

  test("should return empty array if no applications found", async()=>{
    await Application.destroy({ where: {} })
    const response = await request(app).get("/applications")
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
  })

})

describe("GET /applications/:id", () => {
  test("should retrieve a specific job application successfully", async () => {
    const application = await Application.create({
      role: "Backend Developer",
      company: "API Builders",
      jdUrl: "https://apibuilders.com/jobs/backend",
      appliedAt: "2024-02-15T00:00:00.000Z",
      status: "rejected",
      interviewRounds: 1,
    })

    const response = await request(app).get(`/applications/${application.id}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: application.id,
        role: "Backend Developer",
        company: "API Builders",
        jdUrl: "https://apibuilders.com/jobs/backend",
        appliedAt: "2024-02-15T00:00:00.000Z",
        status: "rejected",
        interviewRounds: 1,
      })
    )
  })

  test("should return 404 if job application is not found", async () => {
    const response = await request(app).get("/applications/9999")
    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: "Application not found.",
    })
  })
})

describe("PUT /applications/:id", () => {
  test("should update a job application successfully", async () => {
    const application = await Application.create({
      role: "Backend Developer",
      company: "API Builders",
      jdUrl: "https://apibuilders.com/jobs/backend",
      appliedAt: "2024-02-15T00:00:00.000Z",
      status: "rejected",
      interviewRounds: 1,
    })

    const response = await request(app).put(`/applications/${application.id}`).send({
      status: "selected",
      interviewRounds: 2,
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: application.id,
        role: "Backend Developer",
        company: "API Builders",
        jdUrl: "https://apibuilders.com/jobs/backend",
        appliedAt: "2024-02-15T00:00:00.000Z",
        status: "selected",
        interviewRounds: 2,
      })
    )
  })

  test("should return 404 if job application is not found for update", async () => {
    const response = await request(app).put("/applications/9999").send({
      status: "selected",
    })

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: "Application not found.",
    })
  })

  test("should return 400 if invalid data is provided", async () => {
    const application = await Application.create({
      role: "Backend Developer",
      company: "API Builders",
      jdUrl: "https://apibuilders.com/jobs/backend",
      appliedAt: "2024-02-15T00:00:00.000Z",
      status: "rejected",
      interviewRounds: 1,
    })

    const response = await request(app).put(`/applications/${application.id}`).send({
      status: "invalid_status",
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: "Invalid update data.",
    })
  })
})

describe("DELETE /applications/:id", () => {
  test("should delete a job application successfully", async () => {
    const application = await Application.create({
      role: "Backend Developer",
      company: "API Builders",
      jdUrl: "https://apibuilders.com/jobs/backend",
      appliedAt: "2024-02-15T00:00:00.000Z",
      status: "rejected",
      interviewRounds: 1,
    })

    const response = await request(app).delete(`/applications/${application.id}`)
    expect(response.status).toBe(204)

    const deletedApplication = await Application.findByPk(application.id)
    expect(deletedApplication).toBeNull()
  })

  test("should return 404 if job application is not found for deletion", async () => {
    const response = await request(app).delete("/applications/9999")
    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: "Application not found.",
    })
  })
})

describe("POST /applications/:id/interview", () => {
  test("should add a new interview round successfully", async () => {
    const application = await Application.create({
      role: "Backend Developer",
      company: "API Builders",
      jdUrl: "https://apibuilders.com/jobs/backend",
      appliedAt: "2024-02-15T00:00:00.000Z",
      status: "rejected",
      interviewRounds: 1,
    })

    const response = await request(app).post(`/applications/${application.id}/interview`).send({
      roundNum: 1,
      roundType: "technical",
      interviewDate: "2024-03-01T00:00:00.000Z",
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        applicationId: application.id,
        roundNum: 1,
        roundType: "technical",
        interviewDate: "2024-03-01T00:00:00.000Z",
      })
    )
  })

  test("should return 400 if required fields are missing", async () => {
    const application = await Application.create({
      role: "Backend Developer",
      company: "API Builders",
      jdUrl: "https://apibuilders.com/jobs/backend",
      appliedAt: "2024-02-15T00:00:00.000Z",
      status: "rejected",
      interviewRounds: 1,
    })

    const response = await request(app).post(`/applications/${application.id}/interview`).send({
      roundNum: 1,
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: "Interview round number, type, and date are required.",
    })
  })

  test("should return 404 if job application is not found for adding an interview", async () => {
    const response = await request(app).post("/applications/9999/interview").send({
      roundNum: 1,
      roundType: "technical",
      interviewDate: "2024-03-01T00:00:00.000Z",
    })

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: "Application not found.",
    })
  })
})

describe("GET /applications/:id/interview", () => {
  test("should retrieve all interview rounds for a job application", async () => {
    const application = await Application.create({
      role: "Backend Developer",
      company: "API Builders",
      jdUrl: "https://apibuilders.com/jobs/backend",
      appliedAt: "2024-02-15T00:00:00.000Z",
      status: "rejected",
      interviewRounds: 1,
    })

    await Interview.create({
      applicationId: application.id,
      roundNum: 1,
      roundType: "technical",
      interviewDate: "2024-03-01T00:00:00.000Z",
    })

    const response = await request(app).get(`/applications/${application.id}/interview`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  test("should return 404 if job application is not found", async () => {
    const response = await request(app).get("/applications/9999/interview")
    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: "Application not found.",
    })
  })
})

describe("GET /applications (Filtering and Sorting)", () => {
  test("should filter job applications by status", async () => {
    const response = await request(app).get("/applications?status=interview")
    expect(response.status).toBe(200)
    expect(response.body.every(app => app.status === "interview")).toBe(true)
  })

  test("should filter job applications by company", async () => {
    const response = await request(app).get("/applications?company=Data Corp")
    expect(response.status).toBe(200)
    expect(response.body.every(app => app.company === "Data Corp")).toBe(true)
  })

  test("should return 200 OK with an empty array when no applications match the filter", async () => {
    const response = await request(app).get("/applications?company=NonExistentCorp")
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
  })
})

describe("GET /reports/applications", () => {
  test("should generate a report of total applications in a time period", async () => {
    const response = await request(app).get("/reports/applications?from=2024-01-01&to=2024-01-31")
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        interview: expect.any(Number),
        "no reply": expect.any(Number),
      })
    )
  })

  test("should generate a report of applications grouped by status", async () => {
    const response = await request(app).get("/reports/applications")
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        interview: expect.any(Number),
        accepted: expect.any(Number),
        rejected: expect.any(Number),
      })
    )
  })
})

afterAll(async () => {
  await sequelize.close()
})
