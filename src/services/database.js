const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://pass:word@cluster0.nfeoy.mongodb.net/?retryWrites=true&w=majority&tls=true&ssl=true&appName=Cluster0";

const client = new MongoClient(uri, {
  tls: true,
  tlsInsecure: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Conexión exitosa a MongoDB.");
    return client.db("Cluster0");
  } catch (error) {
    console.error("Error conectándose a MongoDB:", error);
    throw error;
  }
}

async function createDocument(collectionName, data) {
  const database = client.db("Cluster0");
  const collection = database.collection(collectionName);
  const result = await collection.insertOne(data);
  return result;
}

async function createDocuments(collectionName, dataArray) {
  const database = client.db("Cluster0");
  const collection = database.collection(collectionName);
  const result = await collection.insertMany(dataArray);
  return result;
}

async function readDocuments(collectionName, query = {}) {
  const database = client.db("Cluster0");
  const collection = database.collection(collectionName);
  const documents = await collection.find(query).toArray();
  return documents;
}

async function updateDocument(collectionName, filter, update) {
  const database = client.db("Cluster0");
  const collection = database.collection(collectionName);
  const result = await collection.updateOne(filter, { $set: update });
  return result;
}

async function deleteDocument(collectionName, filter) {
  const database = client.db("Cluster0");
  const collection = database.collection(collectionName);
  const result = await collection.deleteOne(filter);
  return result;
}

module.exports = {
  connectDB,
  createDocument,
  createDocuments,
  readDocuments,
  updateDocument,
  deleteDocument,
};
