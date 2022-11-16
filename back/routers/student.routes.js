module.exports = (app) => {
  const students = require("../controllers/student.controller");

  // Create a new Note
  app.post("/students", students.create);

  // Retrieve all students
  app.get("/students", students.findAll);

  // Retrieve a single Note with studentId
  app.get("/students/:studentId", students.findOne);

  // Update a Note with studentId
  app.put("/students/:studentId", students.update);

  // Delete a Note with studentId
  app.delete("/students/:studentId", students.delete);
};
