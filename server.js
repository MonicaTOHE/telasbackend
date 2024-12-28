const { connectDB } = require("./src/services/database");
const app = require("./app");

async function startServer() {
  try {
    const dataBase = await connectDB();

    process.on("SIGINT", async () => {
      console.log("Cerrando conexión con MongoDB...");
      await dataBase.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
  }
}

startServer();

const port = 3000;

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
