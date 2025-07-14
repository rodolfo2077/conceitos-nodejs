import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
app.use(cors()); // Permite qualquer origem

const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acesse pelo http://localhost:${port}`);
});

// Buscar um usuário pelo ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar rota POST para criar usuario no banco de dados mongo via framework prisma
app.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });

    res.status(201).json(`Usuário criado com succeso: ${user}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cria rota GET para listar todos usuarios da tabela user do mongodb
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar rota PUT para editar , atualizar o usuario pelo id
app.put("/users/:id", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar rota DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD Finalizado
