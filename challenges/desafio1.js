const filters = {};
const fields = {
  $set: {
    criadoPor: "Ronald McDonald",
  },
};

db.produtos.updateMany(filters, fields);
db.produtos.find({}, { nome: 1, criadoPor: 1, _id: 0 });