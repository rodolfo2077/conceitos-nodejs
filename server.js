import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";

const app = express();
const prisma = new PrismaClient();

const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acesse pelo http://localhost:${port}`);
});

// Criar rota POST para criar usuario no banco de dados mongo via framework prisma
app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(201).json(user);
});

// Cria rota GET para listar todos usuarios da tabela user do mongodb
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

// Criar rota PUT para editar , atualizar o usuario pelo id
app.put("/users/:id", async (req, res) => {
  const users = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(200).json(users);
});

// Criar rota DELETE
app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Usuário deletado com sucesso!" });
});

// CRUD Finalizado
