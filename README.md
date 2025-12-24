# Sochub Test Backend

A RESTful backend API built as part of a technical assessment, demonstrating
authentication, validation, security best practices, and database integration
using modern Node.js tooling.

## Tech Stack
- Node.js (ES Modules)
- Express.js
- Prisma ORM
- PostgreSQL
- JWT (JOSE)
- Joi validation
- Passport (Bearer strategy)
- Docker-ready
- Jest (testing)

## Features
- User authentication using Bearer tokens
- Secure password hashing with bcrypt
- Input validation using Joi
- Database access via Prisma ORM
- Security hardening with Helmet & CORS
- Environment-based configuration

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm

### Installation
```bash
git clone https://github.com/donprolad/sochub-test-backend.git
cd sochub-test-backend
npm install
