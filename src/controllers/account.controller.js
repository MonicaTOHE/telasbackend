const db = require("../services/database");
const { ObjectId } = require("mongodb");

const dbUserCollection = "users";

async function registerUser(req, res) {
  try {
    const data = req.body;
    const result = await db.createDocument(dbUserCollection, data);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Error al registrar usuario", details: error });
  }
}

async function validateLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email y password son requeridos" });
    }

    const user = await db.readDocuments(dbUserCollection, { email, password });
    if (user.length === 0) {
      return res.status(401).send({ error: "Credenciales inválidas" });
    }

    res.status(200).send(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al validar login", details: error });
  }
}

async function getUserProfile(req, res) {
  try {
    const { id } = req.params;
    const user = await db.readDocuments(dbUserCollection, {
      _id: new ObjectId(id),
    });
    if (!user.length) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }
    res.status(200).send(user[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Error al obtener el perfil", details: error });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const result = await db.updateDocument(
      dbUserCollection,
      { _id: new ObjectId(id) },
      updateData
    );
    if (result.matchedCount === 0) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }
    res.status(200).send({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Error al actualizar usuario", details: error });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const result = await db.deleteDocument(dbUserCollection, {
      _id: new ObjectId(id),
    });
    if (result.deletedCount === 0) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }
    res.status(200).send({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al borrar usuario", details: error });
  }
}

async function listUsers(req, res) {
  try {
    const users = await db.readDocuments(dbUserCollection);
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al listar usuarios", details: error });
  }
}

module.exports = {
  registerUser,
  validateLogin,
  getUserProfile,
  updateUser,
  deleteUser,
  listUsers,
};
