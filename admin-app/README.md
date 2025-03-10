# Admin App

This is a standalone admin application built with Angular 19. It provides an administrative interface for managing blog content.

## Features

- Dashboard with statistics
- Blog management (CRUD operations)
- Tag management (CRUD operations)
- Styleguide reference
- Responsive design

## Architecture

This application is part of a multi-repo setup that includes:

1. **Admin App** (this repository) - Administrative interface for managing blog content
2. **Client App** - Client-facing blog application
3. **Shared Libraries**:
   - `@beexperience/models` - Shared data models and interfaces
   - `@beexperience/services` - Shared services including the BlogService
   - `@beexperience/ui-components` - Shared UI components library

## Getting Started

```bash
# Install dependencies
npm install

# Install shared libraries (if developing locally)
cd ../shared-libs/models
npm install
npm run build
cd ../services
npm install
npm run build
cd ../ui-components
npm install
npm run build

# Start development server
npm start
```

## API Configuration

The application expects an API endpoint at `http://localhost:3000/api` by default. This can be configured in the `environment.ts` file.

## Folder Structure

- `src/app/blog-admin` - Blog management module and components
- `src/app/dashboard` - Dashboard component
- `src/app/styleguide` - Styleguide component
- `src/app/not-found` - 404 page component

## UI Components

This application uses the shared UI components library for consistent styling:

- Buttons, Cards, Inputs, Selects, Badges, and Modals
- All styled with Tailwind CSS
- Component styling matches the styleguide reference

## Styling

The application uses Tailwind CSS for styling with custom components from the UI library.