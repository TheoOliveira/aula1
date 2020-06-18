const express = require("express");
const app = express();
const { uuid } = require("uuidv4");
app.use(express.json());

const projects = [];
//GET
let id = uuid();

app.get("/projects", (req, res) => {
  return res.json(projects);
});

// POST
app.post("/addproject", (req, res) => {
  const { title, owner } = req.body;
  const project = { id, title, owner };
  projects.push(project);
  return res.json(project);
});

//PUT
app.put("/updateproject/:id", (req, res) => {});
//DELETE
app.delete("/delproject", (req, res) => {});

app.listen(3000, () => {
  console.log("server iniciado!");
});
