const express = require('express');
const dotenv = require('dotenv');
const { healthRouter, ecomRouter } = require('./routers');

const app = express();
dotenv.config();

const port = process.env.PORT || 8080;
app.use(express.json());
app.use('/health', healthRouter);
app.use('/ecommerce', ecomRouter);

app.listen(port, () => {
  console.log(`server is up ${port}`);
});
