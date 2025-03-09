/**
 * Database connection manager
 * Implements Singleton pattern to ensure only one database connection
 */
import mongoose from 'mongoose';
import config from '../config/config';

class DatabaseConnection {
  private static instance: DatabaseConnection;

  private constructor() {
    // Private constructor to prevent direct construction calls with `new`
  }

  /**
   * Get the singleton instance
   */
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  /**
   * Connect to MongoDB
   */
  public async connect(): Promise<mongoose.Connection> {
    try {
      const mongoUri = config.mongoUri;
      
      if (!mongoUri) {
        throw new Error('MongoDB URI is not defined');
      }
      
      await mongoose.connect(mongoUri);
      
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
      return mongoose.connection;
    } catch (error) {
      const err = error as Error;
      console.error(`Error connecting to MongoDB: ${err.message}`);
      process.exit(1);
    }
  }

  /**
   * Disconnect from MongoDB
   */
  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
    } catch (error) {
      const err = error as Error;
      console.error(`Error disconnecting from MongoDB: ${err.message}`);
    }
  }
}

export default DatabaseConnection.getInstance();