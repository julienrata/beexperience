import app from './app';
import config from './config/config';
import dbConnection from './db/connection';

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await dbConnection.connect();
    
    // Start listening for requests
    const server = app.listen(config.port, () => {
      console.log(`Server running in ${config.env} mode on port ${config.port}`);
    });

    // Unhandled rejection handler
    process.on('unhandledRejection', (err) => {
      console.error('UNHANDLED REJECTION! Shutting down...');
      console.error(err);
      
      // Graceful shutdown
      server.close(() => {
        process.exit(1);
      });
    });
    
    // SIGTERM handler
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(async () => {
        await dbConnection.disconnect();
        console.log('Process terminated!');
      });
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Initialize server
startServer();