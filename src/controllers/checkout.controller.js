const mercadopago = require("mercadopago");
const client = new mercadopago.MercadoPagoConfig({
  accessToken:
    "APP_USR-2357933235894367-122722-a851e1ad58f4259919d1f933c8f39275-2183697570",
});

async function createCheckout(req, res) {
  try {
    const items = req.body;
    console.log("entro createCheckout");
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .send({ error: "El payload debe ser un array de productos" });
    }
    const preference = new mercadopago.Preference(client);
    preference
      .create({
        body: {
          items,
        },
      })
      .then((response) => {
        res.status(200).send({
          preference_id: response.id,
        });
      })
      .catch(console.log);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error al crear el checkout", details: error.message });
  }
}

module.exports = {
  createCheckout,
};
