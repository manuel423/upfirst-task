```markdown
# OAuth 2.0 Server in TypeScript

This repository contains an implementation of an OAuth 2.0 server using TypeScript. It includes endpoints for the authorization code flow, focusing on the `authorize` and `token` endpoints. 

## Features

-**Authorization Endpoint**: Handles the OAuth 2.0 authorization request (`response_type=code`).
-**Token Endpoint**: Processes token requests to exchange authorization codes for access tokens.
-**TypeScript**: Strongly typed server-side JavaScript.
-**Unit and Integration Testing**: Using Jest for comprehensive testing coverage.
-**Docker Support**: Dockerfile included for containerization.
-**GitHub Actions**: Automated testing on pull requests and pushes to `main`.

## Prerequisites

- Node.js (v14.x recommended)
- npm or yarn
- Docker (optional for containerization)

## Getting Started

### Installation

```sh
npm install
# or
yarn install
```

**Running the Server**

**sh**

```text
npm start
# or for development with hot-reloading
npm run dev
```

**Running Tests**

**sh**

```text
npm test
```

**Building for Production**

**sh**

```text
npm run build
```

**Docker**

**Building the Docker Image**

**sh**

```text
docker build -t oauth2-server-ts .
```

**Running the Docker Container**

**sh**

```text
docker run -p 8080:8080 oauth2-server-ts
```

**Project Structure**

* **src/**
  * **controllers/**: Contains the logic for handling requests.
  * **routes/**: Defines the API endpoints.
  * **utils/**: Utility functions, like JWT handling.
  * **server.ts**: Main server file.
  * **tests/**: Unit and integration tests.
* **package.json**: Project dependencies and scripts.
* **jest.config.js**: Jest configuration for testing.
* **tsconfig.json**: TypeScript configuration.
* **Dockerfile**: For Docker containerization.
* **.github/workflows/**: CI/CD with GitHub Actions.

**Testing**

* **Unit Tests**: Located in **src/tests/unit/**. They test individual components or functions in isolation.
* **Integration Tests**: Located in **src/tests/integration/**. These tests check if different parts of the system work together correctly.

**CI/CD**

**A GitHub Action is configured to run tests on every push to **main** and on pull requests. See **.github/workflows/cicd.yml** for details.**
