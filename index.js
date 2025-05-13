const express = require('express');
const { resolve } = require('path');
const fs = require('fs');

const app = express();
const port = 3010;

app.use(express.json());

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number' || isNaN(threshold)) {
    return res.status(400).json({ error: "Invalid threshold value. It must be a number." });
  }

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading student data file." });
    }

    let students;
    try {
      students = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).json({ error: "Error parsing student data." });
    }

    const filteredStudents = students.filter(student => student.total > threshold);

    res.json({
      count: filteredStudents.length,
      students: filteredStudents.map(student => ({
        name: student.name,
        total: student.total
      }))
    });
  });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
