# User Management App with Roles

## Description
A web application designed to manage users with role-based access control.

## Installation

### Prerequisites
- Node.js
- npm
- Docker Desktop

### Steps
1. Unzip the provided zip file in your project root folder.
2. Run the following command to install the required dependencies:
   ```bash
   npm install
   ```
3. Configure the database details in the `.env` file. Example:
   ```env
   DB_HOST="mysqldb" # Specify Docker service name
   DB_USERNAME="user_manager"
   DB_PASSWORD="usersapp@321"
   DB_NAME="usersapp"
   ```
4. Start the application by running:
   ```bash
   npm run start
   ```
### Running Migrations in Docker

1. **Install TypeORM inside the Docker container** (if not already installed):
   ```bash
   docker exec -it <container_name> npm install typeorm --save
   ```

2. **Build the project** (if you haven't done this yet):
   ```bash
   npm run build
   ```

3. **Run the migrations**:
   ```bash
   docker exec -it <container_name> npx typeorm migration:run -d ./dist/config/data-source.js
   ```
## Project Structure
```
├── src
│   ├── config
│   │   └── data-source.ts
│   │   └── database.ts
│   │   └── env.ts
│   ├── controllers
│   │   └── user.controller.ts
│   │   └── role.controller.ts
│   ├── entities
│   │   └── User.ts
│   │   └── Role.ts
│   ├── interfaces
│   │   └── common.ts
│   │   └── config.ts
│   ├── middlewares
│   │   └── error_handler.ts
│   │   └── jwt_auth.ts
│   │   └── role_auth.ts
│   │   └── maintenance.ts
│   ├── migrations
│   │   └── create_user_table.ts
│   │   └── create_role_table.ts
│   │   └── create_user_role_mapping.ts
│   ├── models
│   │   └── user.model.ts
│   │   └── role.model.ts
│   ├── routes
│   │   └── user.routes.ts
│   │   └── role.routes.ts
│   ├── services
│   │   └── user.service.ts
│   │   └── role.service.ts
│   ├── utils
│   │   └── common.ts
│   │   └── crypto.ts
│   │   └── error_handler.ts
│   │   └── jwt.ts
│   │   └── role_auth.ts
├── .env
├── package.json
├── README.md
└── tsconfig.json
```

## Features
- Role-based access control for users.
- Secure user authentication using JWT.
- Management of user roles and permissions.
- Middleware for role and maintenance checks.
- Database migrations for user-role schema.

## Contact
If you have any questions or encounter issues, please feel free to contact:
1. **Name**: Sasic Dev
2. **Email**: sasics.2394@gmail.com

