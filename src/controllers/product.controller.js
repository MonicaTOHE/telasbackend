const db = require("../services/database");
const { ObjectId } = require("mongodb");

const dbProductCollection = "products";

async function addProduct(req, res) {
  try {
    const data = req.body;
    if (Array.isArray(data)) {
      const result = await db.createDocuments(dbProductCollection, data);
      res.status(201).send({
        message: `${result.insertedCount} productos creados exitosamente`,
        insertedIds: result.insertedIds,
      });
    } else {
      const result = await db.createDocument(dbProductCollection, data);
      res.status(201).send({
        message: "Producto creado exitosamente",
        insertedId: result.insertedId,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error al crear los productos", details: error });
  }
}

async function getProduct(req, res) {
  try {
    const query = req.query;
    const products = await db.readDocuments(dbProductCollection, query);
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Error al obtener los productos", details: error });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await db.readDocuments(dbProductCollection, {
      _id: new ObjectId(id),
    });
    if (!product.length) {
      return res.status(404).send({ error: "Producto no encontrado" });
    }
    res.status(200).send(product[0]);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error al obtener el producto", details: error });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const result = await db.updateDocument(
      dbProductCollection,
      { _id: new ObjectId(id) },
      updateData
    );
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error al actualizar el producto", details: error });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const result = await db.deleteDocument(dbProductCollection, {
      _id: new ObjectId(id),
    });
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error al eliminar el producto", details: error });
  }
}

module.exports = {
  addProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
