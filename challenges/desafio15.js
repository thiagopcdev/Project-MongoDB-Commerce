const regex = /(mc)/i;

db.produtos.find({ nome: regex }).count();