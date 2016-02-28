const express = require('express');
const corser = require('corser');
const fallback = require('express-history-api-fallback');
const root = `${__dirname}/public`;
const modules = `${__dirname}/node_modules`;
const app = express();

app.use(express.static(root));
app.use(express.static(modules));
app.use(corser.create());

app.use(fallback('index.html', { root, modules }));

app.listen(80, () => {
  console.log('listening');
});