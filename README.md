## Projeto MongoDB Commerce!

### Habilidades

  * Utilizar o método `updateOne()` e `updateMany()`

  * Utilizar os operadores `$set`, `$mul`, `$inc`, `$min`, `$max` e `$currentDate`

  * Renomear campos e remover campos

  * Incorporar dados aos documentos através de arrays

  * Utilizar os operadores `$pop`, `$pull` e `$push`
  
  * Utilizar o operador `$addToSet`

  * Utilizar os operadores `$each`, `$slice` e `$sort`

  * Utilizar o operador `$all` para filtrar documentos

  * Utilizar o operador `$elemMatch` para filtrar documentos

  * Utilizar o operador `$size` para filtrar documentos pelo tamanho de arrays

  * Utilizar o operador `$expr` para criar expressões de agregação

  * Utilizar expressões regulares e o operador `$regex` para buscar documentos

  * Utilizar o índice textual e o operador `$text`

  * Utilizar o operador `$mod`

---

Projeto com o codinome _commerce_. Neste projeto, eu pratiquei alguns conceitos mais profundos de **MongoDB**.

A ideia é trabalhar com o banco de dados `commerce`, que contém dados do cardápio do **McDonald's**, como ingredientes, valores nutricionais e dados fictícios de vendas. 

---

### Requisitos do projeto

#### 1 - Inclua o campo `criadoPor` em todos os documentos, colocando `"Ronald McDonald"` no valor desse campo.

Para isso, escreva no arquivo `desafio1.js` duas queries, **nesta ordem**:

1. Crie uma query que adicione o campo `criadoPor` em todos os documentos, colocando `"Ronald McDonald"` no valor desse campo.

2. Crie uma query que retorne o `nome` e `criadoPor` de todos os produtos.

~~~javascript
  const filters = {};
  const fields = {
    $set: {
      criadoPor: "Ronald McDonald",
    },
  };

  db.produtos.updateMany(filters, fields);
  db.produtos.find({}, { nome: 1, criadoPor: 1, _id: 0 });
~~~

#### 2 - Inclua o campo `valorUnitario` em todos os documentos em que esse campo não existe e atribua a ele o valor `"0.00"`, com o tipo `NumberDecimal`.

Para isso, escreva no arquivo `desafio2.js` duas queries, **nesta ordem**:

1. Crie uma query que adicione o campo `valorUnitario` em todos os documentos em que esse campo não existe e atribua a ele o valor `"0.00"`, com o tipo `NumberDecimal`.

2. Crie uma query que retorne o `nome` e `valorUnitario` de todos os produtos.

~~~javascript
  const filters = {
    valorUnitario: { $exists: false },
  };

  const fields = {
    $set: { valorUnitario: NumberDecimal("0.00") },
  };

  db.produtos.updateMany(filters, fields);
  db.produtos.find({}, { nome: 1, valorUnitario: 1, _id: 0 });
~~~

#### 3 - Adicione o campo `avaliacao` em todos os documentos da coleção e efetue alterações nesse campo.

Para isso, escreva no arquivo `desafio3.js` quatro queries, **nesta ordem**:

1. Crie uma query que inclua o campo `avaliacao` do tipo `NumberInt` e com o valor `0` em todos os documentos da coleção.

2. Crie uma query que incremente o valor do campo `avaliacao` em `5` em todos os sanduíches de carne do tipo `bovino`. Dica: utilize como filtro o campo `tags`.

3. Crie uma query que incremente o valor do campo `avaliacao` em `3` em todos os sanduíches de `ave`.

4. Crie uma query que retorne o `nome` e `avaliacao` de todos os sanduíches.

~~~javascript
  db.produtos.updateMany({}, { $set: { avaliacao: NumberInt(0) } });

  db.produtos.updateMany({ tags: "bovino" }, { $inc: { avaliacao: 5 } });

  db.produtos.updateMany({ tags: "ave" }, { $inc: { avaliacao: 3 } });

  db.produtos.find({}, { nome: 1, avaliacao: 1, _id: 0 });
~~~

#### 4 - Atribua a data corrente ao campo `ultimaModificacao` no sanduíche `Big Mac`.

Para isso, escreva no arquivo `desafio4.js` duas queries, **nesta ordem**:

1. Crie uma query que atribua a data corrente ao campo `ultimaModificacao` no sanduíche `Big Mac`. Para a data corrente faça uso do tipo `Date`.

2. Crie uma query que retorne o `nome` de todos os documentos em que o campo `ultimaModificacao` existe.

~~~javascript
  db.produtos.updateOne(
    { nome: "Big Mac" }, 
    { $currentDate: { ultimaModificacao: { $type: "date" } } },
  );

  db.produtos.find({ ultimaModificacao: { $exists: true } }, { nome: 1, _id: 0 });
~~~

#### 5 - Adicione `ketchup` aos `ingredientes` para todos os sanduíches menos o `McChicken`, garantindo que não haja duplicidade nos `ingredientes`.

Para isso, escreva no arquivo `desafio5.js` duas queries, **nesta ordem**:

1. Crie uma query que adicione `ketchup` aos `ingredientes` para todos os sanduíches menos o `McChicken`, garantindo que não haja duplicidade nos `ingredientes`.

2. Crie uma query que retorne o `nome` e `ingredientes` de todos os documentos.

~~~javascript
  db.produtos.updateMany(
    { nome: { $ne: "McChicken" } },
    { $addToSet: { ingredientes: "ketchup" } },
  );

  db.produtos.find({}, { nome: 1, ingredientes: 1, _id: 0 });
~~~

#### 6 - Inclua `bacon` no final da lista de `ingredientes` dos sanduíches `Big Mac` e `Quarteirão com Queijo`.

Para isso, escreva no arquivo `desafio6.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a inclusão de `bacon` no final da lista de `ingredientes` dos sanduíches `Big Mac` e `Quarteirão com Queijo`.

2. Crie uma query que retorne o `nome` e `ingredientes` de todos os documentos.

~~~javascript
  db.produtos.updateMany(
    { nome: { $in: ["Big Mac", "Quarteirão com Queijo"] } },
    { $addToSet: { ingredientes: "bacon" } },
  );

  db.produtos.find({}, { nome: 1, ingredientes: 1, _id: 0 });
~~~

#### 7 - Remova o item `cebola` de todos os sanduíches.

Para isso, escreva no arquivo `desafio7.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a remoção do item `cebola` em todos os sanduíches.

2. Crie uma query que retorne o `nome` e `ingredientes` de todos os documentos.

~~~javascript
  db.produtos.updateMany(
    {},
    { $pull: { ingredientes: "cebola" } },
  );

  db.produtos.find({}, { nome: 1, ingredientes: 1, _id: 0 });
~~~

#### 8 - Remova o **primeiro** `ingrediente` do sanduíche `Quarteirão com Queijo`.

Para isso, escreva no arquivo `desafio8.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a remoção do **primeiro** `ingrediente` no sanduíche `Quarteirão com Queijo`.

2. Crie uma query que retorne o `nome` e `ingredientes` de todos os documentos.

~~~javascript
  db.produtos.updateMany(
    { nome: "Quarteirão com Queijo" },
    { $pop: { ingredientes: -1 } },
  );

  db.produtos.find({}, { nome: 1, ingredientes: 1, _id: 0 });
~~~

#### 9 - Remova o **último** `ingrediente` do sanduíche `Cheddar McMelt`.

Para isso, escreva no arquivo `desafio9.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a remoção do **último** `ingrediente` no sanduíche `Cheddar McMelt`.

2. Crie uma query que retorne o `nome` e `ingredientes` de todos os documentos.

~~~javascript
  db.produtos.updateMany(
    { nome: "Cheddar McMelt" },
    { $pop: { ingredientes: 1 } },
  );

  db.produtos.find({}, { nome: 1, ingredientes: 1, _id: 0 });
~~~

#### 10 - Adicione a quantidade de vendas dos sanduíches por dia da semana.

Para isso, escreva no arquivo `desafio10.js` quatro queries, **nesta ordem**:

1. Crie uma query que inclua um _array_ com sete posições em todos os sanduíches. Cada uma delas representará um dia da semana, e cada posição iniciará em `0`. O _array_ deve se parecer como abaixo:
   ```json
   "vendasPorDia": [0, 0, 0, 0, 0, 0, 0]
   ```

- O primeiro item desse _array_ representa as vendas no **domingo**, o segundo item representa as vendas na **segunda-feira**, e assim até chegar ao último item, que representa as vendas no **sábado**.

2. Crie uma query que incremente as vendas de `Big Mac` às **quartas-feiras** em `60`.

3. Crie uma query que incremente as vendas de todos os sanduíches de carne do tipo `bovino` e `pão` aos **sábados** em `120`.

4. Crie uma query que retorne o `nome` e `vendasPorDia` de todos os documentos.

~~~javascript
  db.produtos.updateMany(
    {},
    { $set: { vendasPorDia: [0, 0, 0, 0, 0, 0, 0] } },
  );

  db.produtos.updateMany(
    { nome: "Big Mac" },
    { $inc: { "vendasPorDia.3": 60 } },
  );

  db.produtos.updateMany(
    { tags: { $in: ["bovino", "pão"] } },
    { $inc: { "vendasPorDia.6": 120 } },
  );

  db.produtos.find({}, { nome: 1, vendasPorDia: 1, _id: 0 });
~~~

#### 11 - Insira os elementos `combo` e `tasty` no _array_ `tags` de todos os sanduíches e aproveite para deixar os elementos em ordem alfabética ascendente.

Para isso, escreva no arquivo `desafio11.js` duas queries, **nesta ordem**:

1. Crie uma query que faça tanto a inserção dos elementos `combo` e `tasty` no _array_ `tags` de todos os sanduíches quanto a ordenação dos elementos de `tags` em ordem alfabética ascendente.

2. Crie uma query que retorne o `nome` e `tags` de todos os documentos.

~~~javascript
  db.produtos.updateMany(
    {},
    { $push: { tags: { $each: ["combo", "tasty"], $sort: 1 } } },
  );

  db.produtos.find({}, { nome: 1, tags: 1, _id: 0 });
~~~

#### 12 - Ordene em todos os documentos os elementos do _array_ `valoresNutricionais` pelo campo `percentual` de forma descendente.

Para isso, escreva no arquivo `desafio12.js` duas queries, **nesta ordem**:

1. Crie uma query que faça em todos os documentos a ordenação dos elementos do _array_ `valoresNutricionais` pelo campo `percentual` de forma descendente. Dica: mesmo sem adicionar nenhum novo elemento, para essa operação é necessário utilizar também o modificador `$each`.

2. Crie uma query que retorne o `nome` e `valoresNutricionais` de todos os documentos.

~~~javascript
  db.produtos.updateMany(
    {},
    { $push: { valoresNutricionais: { $each: [], $sort: { percentual: -1 } } } },
  );

  db.produtos.find({}, { nome: 1, valoresNutricionais: 1, _id: 0 });
~~~

#### 13 - Adicione o elemento `muito sódio` ao final do _array_ `tags` nos produtos em que o `percentual` de `sódio` seja maior ou igual a `40`.

Para isso, escreva no arquivo `desafio13.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a adição do elemento `muito sódio` ao final do _array_ `tags` nos produtos em que o `percentual` de `sódio` seja maior ou igual a `40`.

2. Crie uma query que retorne o `nome` e `tags` de todos os documentos.

~~~javascript
  db.produtos.updateMany(
    {
    valoresNutricionais: {
      $elemMatch: {
        tipo: "sódio",
        percentual: { $gt: 39 },
      },
    },
    },
    { $push: { tags: "muito sódio" } },
  );

  db.produtos.find({}, { nome: 1, tags: 1, _id: 0 });
~~~

#### 14 - Adicione o elemento `contém sódio` ao final do _array_ `tags` nos produtos em que o `percentual` de `sódio` seja maior do que `20` e menor do que `40`.

Para isso, escreva no arquivo `desafio14.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a adição do elemento `contém sódio` ao final do _array_ `tags` nos produtos em que o `percentual` de `sódio` seja maior do que `20` e menor do que `40`.

2. Crie uma query que retorne o `nome` e `tags` de todos os documentos.

~~~javascript
  db.produtos.updateMany(
    {
    valoresNutricionais: {
      $elemMatch: {
        tipo: "sódio",
        percentual: { $gt: 20, $lt: 40 },
      },
    },
    },
    { $push: { tags: "contém sódio" } },
  );

  db.produtos.find({}, { nome: 1, tags: 1, _id: 0 });
~~~

#### 15 - Conte quantos produtos contêm `Mc` no nome, sem considerar letras maiúsculas ou minúsculas.

~~~javascript
  const regex = /(mc)/i;

  db.produtos.find({ nome: regex }).count();
~~~

#### 16 - Conte quantos produtos têm `4` ingredientes.

~~~javascript
  db.produtos.find({ ingredientes: { $size: 4 } }).count();
~~~

#### 17 - Conte quantos documentos contêm as palavras `frango` ou `hamburguer` utilizando o operador `$text`.

Para isso, escreva no arquivo `desafio17.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a criação de um índice do tipo `text` no campo `descricao` com o idioma padrão `portuguese`.

2. Crie uma query que retorne a quantidade de documentos que contêm as palavras `frango` ou `hamburguer` utilizando o operador `$text`.

~~~javascript
  db.produtos.createIndex({ descricao: "text" }, { default_language: "portuguese" });
  db.produtos.find({ $text: { $search: "frango hamburguer" } }).count();
~~~

#### 18 - Conte quantos documentos contêm a **expressão** `feito com` utilizando o operador `$text`.

Para isso, escreva no arquivo `desafio18.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a criação de um índice do tipo `text` no campo `descricao` com o idioma padrão `portuguese`.

2. Crie uma query que retorne a quantidade de documentos que contêm a **expressão** `feito com` utilizando o operador `$text`.

~~~javascript
  db.produtos.createIndex({ descricao: "text" }, { default_language: "portuguese" });
  db.produtos.find({ $text: { $search: "\"feito com\"" } }).count();
~~~

#### 19 - Renomeie o campo `descricao` para `descricaoSite` em todos os documentos.

Para isso, escreva no arquivo `desafio19.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a renomeação do campo `descricao` para `descricaoSite` em todos os documentos.

2. Crie uma query que retorne o `nome`, `descricao` e `descricaoSite` de todos os documentos.

~~~javascript
  db.produtos.updateMany({}, { $rename: { descricao: "descricaoSite" } });
  db.produtos.find({}, { nome: 1, descricaoSite: 1, _id: 0 });
~~~

#### 20 - Remova o campo `curtidas` do item `Big Mac`.

Para isso, escreva no arquivo `desafio20.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a remoção do campo `curtidas` do item `Big Mac`.

2. Crie uma query que retorne o `nome` e `curtidas` de todos os documentos.

~~~javascript
  db.produtos.updateMany({ nome: "Big Mac" }, { $unset: { curtidas: "" } });
  db.produtos.find({}, { nome: 1, curtidas: 1, _id: 0 });
~~~

#### 21 - Retorne o `nome` dos sanduíches em que o número de `curtidas` é maior que o número de sanduíches `vendidos`.

~~~javascript
  db.produtos.find({ $expr: { $gt: ["$curtidas", "$vendidos"] } }, { nome: 1, _id: 0 });
~~~

#### 22 - Retorne o `nome` e a quantidade de vendas (`vendidos`) dos sanduíches em que o número de vendas é múltiplo de `5`.

~~~javascript
  db.produtos.find({ vendidos: { $mod: [5, 0] } }, { nome: 1, vendidos: 1, _id: 0 });
~~~
