const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const PORT = process.env.PORT || 8000;

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

try {
  mongoose.connect(process.env.MONGO_DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})