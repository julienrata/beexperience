/**
 * Central configuration settings
 * Uses environment variables with sensible defaults
 */
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface ServerConfig {
  env: string;
  port: number;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  corsOrigins: string[];
}

// Default configuration with fallbacks for missing values
const config: ServerConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/beexperience',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  corsOrigins: process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',') 
    : ['http://localhost:4200']
};

// Validate required config values
const requiredEnvVars = ['MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export default config;