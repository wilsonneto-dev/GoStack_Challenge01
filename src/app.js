const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.get("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex((item) => item.id === id);

  if (repositoryIndex < 0) {
    return response
      .status(404)
      .json({ success: false, message: "Repository not found" });
  }

  const repository = repositories[repositoryIndex];
  return response.json(repository);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const newRepository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(newRepository);
  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex((item) => item.id === id);

  if (repositoryIndex < 0) {
    return response
      .status(404)
      .json({ success: false, message: "Repository not found" });
  }

  const { title, url, techs } = request.body;

  const repository = repositories[repositoryIndex];
  const updatedRepository = { ...repository, title, url, techs };
  repositories[repositoryIndex] = repository;

  return response.json({ updatedRepository });
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex((item) => item.id === id);

  if (repositoryIndex < 0) {
    return response
      .status(404)
      .json({ success: false, message: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex((item) => item.id === id);

  if (repositoryIndex < 0) {
    return response
      .status(404)
      .json({ success: false, message: "Repository not found" });
  }

  const repository = repositories[repositoryIndex];
  const likes = repository.likes + 1;
  const updatedRepository = { ...repository, likes };
  repositories[repositoryIndex] = updatedRepository;

  return response.json({ updatedRepository });
});

module.exports = app;
