const express = require("express");
const app = express();
const { uuid, isUuid } = require("uuidv4");
app.use(express.json());

const projects = [];

//Middleware
function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()} ${url}]`;

  console.log(logLabel);

  return next();
}
function validId(req, res, next){
    const {id } = req.params;

    if(!isUuid(id)){
        return res.status(400).json({error: "Invalid project id."});
    }

    return next();
}
app.use(logRequests);
app.use('/delproject/:id',validId);
app.use('/updateproject/:id',validId);

//GET
app.get("/projects", (req, res) => {
  const { title } = req.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return res.json(results);
});

// POST
app.post("/addproject", (req, res) => {
  // salva os itens do parametros do body em json
  const { title, owner } = req.body;

  // adicionar o id usando o metodo uuid
  const project = { id: uuid(), title, owner };

  //empuura o item para o array
  projects.push(project);

  return res.json(project);
});

//PUT
app.put("/updateproject/:id",  (req, res) => {
  const { id } = req.params;

  const { title, owner } = req.body;
  //percorre o array projects e procura pelo item do index que o id é igual ao id do params
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: "project não encontrado!" });
  }
  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;
  return res.status(200).json(project);
});

//DELETE

app.delete("/delproject/:id", (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: "project não encontrado!" });
  }

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

app.listen(3000, () => {
  console.log("server iniciado!");
});
