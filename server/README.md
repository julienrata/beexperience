# BeExperience - Backend API

This is the RESTful API backend for the BeExperience application built with Node.js, Express, TypeScript, and MongoDB.

## Architecture

The application follows a modular architecture organized in a clean, standard structure:

- **Models**: Define data structures and entity schemas
- **Services**: Contain business logic and rules
- **Controllers**: Handle HTTP requests and responses
- **Repositories**: Abstract data access layer
- **Routes**: Define API endpoints
- **Middlewares**: Handle cross-cutting concerns like error handling

## Design Patterns

This project implements several design patterns:

- **Repository Pattern**: Data access abstraction
- **Dependency Injection**: Loose coupling between components
- **Factory Method**: For error handling
- **Adapter/Mapper**: For transforming data between layers (DTOs)
- **Chain of Responsibility**: For error handling middleware
- **Singleton**: For database connection

## Features

- RESTful API endpoints for CRUD operations
- TypeScript for type safety
- MongoDB for data storage
- Input validation
- Error handling
- Testing with Jest

## Project Structure

```
src/
├── config/              # Application configuration
├── controllers/         # Request handlers
├── db/                  # Database connection and setup
├── dtos/                # Data Transfer Objects
├── interfaces/          # Interface definitions
├── middlewares/         # Express middlewares
├── models/              # Data models
├── repositories/        # Data access layer
├── routes/              # API routes
├── services/            # Business logic
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and helpers
│   ├── errors/          # Error classes
│   └── helpers/         # Helper functions
├── validators/          # Request validators
├── app.ts               # Express application setup
├── server.ts            # Server entry point
└── __tests__/           # Tests
```

## Getting Started

### Prerequisites

- Node.js v14+
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file (use `.env.example` as a template)
4. Start the development server
   ```
   npm run dev
   ```

## Available Scripts

- `npm run build` - Build the application
- `npm start` - Start the production server
- `npm run dev` - Start the development server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint the code
- `npm run lint:fix` - Fix linting issues

## API Endpoints

### Users

- `GET /api/users` - Get all users (with pagination and filtering)
- `GET /api/users/:id` - Get a user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user