const express = require('express');

const app = express();
const port = 3010;

app.use(express.json());

// Dummy student data
const students = [
  { name: "Alice", total: 85 },
  { name: "Bob", total: 90 },
  { name: "Charlie", total: 72 },
  { name: "David", total: 65 },
  { name: "Eve", total: 95 },
];

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  // Validate threshold input
  if (typeof threshold !== 'number' || isNaN(threshold)) {
    return res.status(400).json({ error: "Invalid threshold value. It must be a number." });
  }

  // Filter students based on threshold
  const filteredStudents = students.filter(student => student.total > threshold);

  // Return the result
  res.json({
    count: filteredStudents.length,
    students: filteredStudents.map(student => ({
      name: student.name,
      total: student.total
    }))
  });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
