require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');
const logger = require('./utils/logger');
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    const server = app.listen(PORT, () => {
        logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    })
}

startServer()