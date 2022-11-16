const Student = require("../models/student.model");

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Student name can not be empty",
    });
  }

  // Create a Student
  const student = new Student({
    name: req.body.name || "Untitled Student",
    age: req.body.age,
  });

  // Save Student in the database
  student
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating a Student.",
      });
    });
};

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
  Student.find()
    .then((students) => {
      res.send(students);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Students.",
      });
    });
};

// Find a single student with a studentID
exports.findOne = (req, res) => {
  Student.findById(req.params.studentId)
    .then((stu) => {
      if (!stu) {
        return res.status(404).send({
          message: "student not found with id " + req.params.studentId,
        });
      }
      res.send(stu);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "stu not found with id " + req.params.studentId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving stu with id " + req.params.studentId,
      });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Student name can not be empty",
    });
  }

  // Find note and update it with the request body
  Student.findByIdAndUpdate(
    req.params.studentId,
    {
      name: req.body.name || "Untitled stu",
      age: req.body.age,
    },
    { new: true }
  )
    .then((stu) => {
      if (!stu) {
        return res.status(404).send({
          message: "stu not found with id " + req.params.studentId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "student not found with id " + req.params.studentId,
        });
      }
      return res.status(500).send({
        message: "Error updating student with id " + req.params.studentId,
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Student.findByIdAndRemove(req.params.studentId)
    .then((student) => {
      if (!student) {
        return res.status(404).send({
          message: "Student not found with id " + req.params.studentId,
        });
      }
      res.send({ message: "Student deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Student not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Could not delete Student with id " + req.params.studentId,
      });
    });
};
