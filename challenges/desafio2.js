const filters = {
  valorUnitario: { $exists: false },
};

const fields = {
  $set: { valorUnitario: NumberDecimal("0.00") },
};

db.produtos.updateMany(filters, fields);
db.produtos.find({}, { nome: 1, valorUnitario: 1, _id: 0 });