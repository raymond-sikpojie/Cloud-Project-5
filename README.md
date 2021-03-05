# Serverless Todo Application

This application will allow a registered user to create, update, read and delete todo items. An image can be optionally added to each todo item. A user will only have access to todo items that has been created by them.

## Prerequisites

### Node.js

Ensure that Node.js is installed.

### Amazon Web Services

To deploy the application, an AWS account is required.

### Serverless Framework

The application is built and deployed to AWS using Serverless Framework.

### AuthO

User authentication is handled using AuthO

## Getting Started

### Backend

1. From the root directory, `cd backend`
2. Run `npm install` to install all dependencies
3. Deploy application to AWS using `sls deploy -v`

### Frontend

1. From the root directory, `cd client`
2. Run `npm install` to install all dependencies
3. Start the client app using `npm run start`
