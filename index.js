require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandlingMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
