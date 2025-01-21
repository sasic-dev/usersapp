# Task management app

## Description
It is a web app to manage tasks created by user.

## Installation

### Prerequisites
- Nodejs, npm, Docker Desktop

### Steps
- Unzip a zip file in your project root folder
- Run "npm install" cmd to intall required dependencies of project
- Configure the databse detail in ".env" file
Ex.
    DB_HOST="mysqldb" - specify docker service name
    DB_USERNAME="user_manager"
    DB_PASSWORD="usersapp@321"
    DB_NAME="usersapp"

- Run "npm run start" cmd to start the application

## Project Structure
├── src
│   ├── config
│   │   └── data-source.ts
│   │   └── database.ts
│   │   └── env.ts
│   ├── controllers
│   │   └── task.controller.ts
│   │   └── user.controller.ts
│   ├── entities
│   │   └── Task.ts
│   ├── interfaces
│   │   └── common.ts
│   │   └── config.ts
│   ├── middlewares
│   │   └── error_handler.ts
│   │   └── jwt_auth.ts
│   │   └── maintenance.ts
│   ├── migrations
│   │   └── create_task_table.ts
│   │   └── create_user_table.ts
│   ├── models
│   │   └── task.model.ts
│   │   └── user.model.ts
│   ├── routes
│   │   └── task.routes.ts
│   ├── services
│   │   └── task.service.ts
│   │   └── user.service.ts
│   ├── utils
│   │   └── common.ts
│   │   └── crypto.ts
│   │   └── error_handler.ts
│   │   └── jwt.ts
│   │   └── user_auth.ts
├── .env
├── package.json
├── README.md
└── tsconfig.json

## Contact
If you have any questions or issues, please feel free to contact:
1. Name: Sasic Dev
2. Email: sasics.2394@gmail.com
