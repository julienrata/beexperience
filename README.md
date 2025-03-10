# BeExperience - Multi-Repo Application

This project has been refactored into a multi-repo structure with separated client, admin, and shared libraries. All applications are built with Angular 19.

## Project Structure

This project is organized into three main components:

1. **Client App** (`/client-app`)
   - Client-facing blog application
   - Features: Blog posts, tag filtering, responsive design
   
2. **Admin App** (`/admin-app`)
   - Administrative interface for content management
   - Features: Dashboard, blog and tag management, styleguide
   
3. **Shared Libraries** (`/shared-libs`)
   - `@beexperience/models`: Shared data models and interfaces
   - `@beexperience/services`: Shared services for blog operations
   - `@beexperience/ui-components`: Shared UI components with styleguide

## Technology Stack

- **Frontend**: Angular 19
- **Styling**: Tailwind CSS 
- **Backend**: Node.js/Express
- **Database**: MongoDB (through Mongoose)

## Getting Started

Each application can be run independently:

### Running the Client App

```bash
cd client-app
npm install
npm start
```

App will be available at http://localhost:4200

### Running the Admin App

```bash
cd admin-app
npm install
npm start
```

App will be available at http://localhost:4201

### Building Shared Libraries

```bash
# Build models library
cd shared-libs/models
npm install
npm run build

# Build services library
cd ../services
npm install
npm run build

# Build UI components library
cd ../ui-components
npm install
npm run build
```

## API Server

The backend API is located in the `/server` directory and can be run with:

```bash
cd server
npm install
npm start
```

## Component Library

The shared UI components library (`@beexperience/ui-components`) provides consistent UI elements across all applications:

- Button: Various styles and sizes of buttons
- Card: Content containers with header and footer options
- Input: Form input elements with validation support
- Select: Dropdown menus with options
- Badge: Status indicators
- Modal: Dialog windows

For detailed documentation, see the [UI Components README](./shared-libs/ui-components/README.md).

## Deployment

Each application can be deployed independently to different environments.

## Further Information

See the README.md files in each application directory for more specific information:

- [Client App README](./client-app/README.md)
- [Admin App README](./admin-app/README.md)
- [Shared Libraries README](./shared-libs/README.md)
