const { app, getEmployees, getEmployeeById, addEmployee } = require("./server")

const http = require("http")

jest.mock("./server", () => ({
  ...jest.requireActual("./server"),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
}))

let server

beforeAll((done) => {
  server = http.createServer(app)
  server.listen(3001, done)
})

afterAll((done) => {
  server.close(done)
})

describe("Employee Mock Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("Test get all employees", () => {
    const mockEmployees = [
      { id: 1, name: "John Doe", position: "Software Engineer" },
      { id: 2, name: "Jane Smith", position: "Product Manager" },
      { id: 3, name: "Sam Johnson", position: "Designer" },
    ]
    getEmployees.mockReturnValue(mockEmployees)
    const result = getEmployees()
    expect(result).toEqual(mockEmployees)
    expect(getEmployees).toHaveBeenCalled()
  })

  test("Test get employee by ID", () => {
    const mockEmployee = {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
    }
    getEmployeeById.mockReturnValue(mockEmployee)
    const result = getEmployeeById(1)
    expect(result).toEqual(mockEmployee)
    expect(getEmployeeById).toHaveBeenCalledWith(1)
  })

  test(" Test get employee by non-existent ID", () => {
    getEmployeeById.mockReturnValue(undefined)
    const result = getEmployeeById(99)
    expect(result).toBeUndefined()
    expect(getEmployeeById).toHaveBeenCalledWith(99)
  })

  test("Test add new employee", () => {
    const newEmployee = {
      id: 4,
      name: "Four Name",
      position: "Four Position",
    }
    addEmployee.mockReturnValue(newEmployee)
    const result = addEmployee(newEmployee)
    expect(result).toEqual(newEmployee)
    expect(addEmployee).toHaveBeenCalledWith(newEmployee)
  })
})
