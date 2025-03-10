# Shared Libraries

This directory contains shared libraries used by multiple applications in the BeExperience multi-repo setup.

## Libraries

### @beexperience/models

Shared data models and interfaces used across applications.

#### Features

- Blog and Tag interfaces
- Form data interfaces
- Query and pagination types

#### Usage

```typescript
import { Blog, Tag, BlogFormData } from '@beexperience/models';
```

### @beexperience/services

Shared services that provide common functionality across applications.

#### Features

- BlogService with CRUD operations for blogs and tags
- Configurable API URL
- Error handling with RxJS

#### Usage

```typescript
import { BlogService } from '@beexperience/services';

// In your component or service
constructor(private blogService: BlogService) {
  // Initialize the API URL
  this.blogService.setApiUrl(environment.apiUrl);
}

// Then use the service
this.blogService.getBlogs().subscribe(blogs => {
  // Do something with the blogs
});
```

## Building the Libraries

Each library needs to be built before it can be used by the applications.

```bash
# Build models library
cd models
npm install
npm run build

# Build services library
cd ../services
npm install
npm run build
```

## Using in Local Development

For local development, you can use these libraries by linking them to your applications:

```bash
# From the services directory
npm link

# From your application directory
npm link @beexperience/services
```

Or by setting up your package.json to use the local paths:

```json
"dependencies": {
  "@beexperience/models": "file:../shared-libs/models",
  "@beexperience/services": "file:../shared-libs/services"
}
```