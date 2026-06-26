require('dotenv').config();
const app       = require('./app');
const connectDB = require('./config/database');
const logger    = require('./utils/logger');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err) => {
            logger.error(`Unhandled Rejection: ${err.message}`);
            server.close(() => process.exit(1));
        });

    } catch (error) {
        logger.error(`Server failed to start: ${error.message}`);
        process.exit(1);
    }
};

startServer();