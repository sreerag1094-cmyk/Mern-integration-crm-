# MERN CRM (Assignment 14: MERN Integration)

A Customer Relationship Management app built with MongoDB, Express, React (Vite) and Node.js, styled with Tailwind CSS.

## Features

- Register / Login with bcrypt-hashed passwords and JWT tokens
- Full customer CRUD (add, view, update, delete), scoped to the logged-in user
- Request validation middleware and centralized error handling with status codes
- Responsive UI (table on desktop, cards on mobile) with client-side form validation

## Project structure

```
project-root/
├── client/                 # React frontend
│   └── src/
│       ├── api/axios.js
│       ├── components/     # Navbar, FormField, CustomerForm, CustomerList, ProtectedRoute
│       ├── context/        # AuthContext
│       ├── pages/          # Register.jsx, Login.jsx, Userdata.jsx
│       ├── App.jsx
│       └── index.jsx
├── server/                 # Express backend
│   ├── config/db.js
│   ├── controllers/        # UserController, CustomerController
│   ├── middleware/         # Auth, validate, errorHandler
│   ├── models/             # UserModel, CustomerModel
│   ├── routes/             # UserRoutes, CustomerRoutes
│   └── app.js
├── .gitignore
└── README.md
```

## Setup

Requires Node.js 18+ and a running MongoDB (local or Atlas).

### Backend

```bash
cd server
npm install
cp .env.example .env     # then set JWT_SECRET and MONGO_URI
npm run dev              # http://localhost:5000
```

### Frontend

```bash
cd client
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:5000/api
npm start                # http://localhost:5173
```

## API reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint          | Auth | Description              |
|--------|-------------------|------|--------------------------|
| POST   | /auth/register    | No   | Create account, returns token |
| POST   | /auth/login       | No   | Login, returns token     |
| GET    | /auth/me          | Yes  | Current user             |
| GET    | /customers        | Yes  | List customers           |
| POST   | /customers        | Yes  | Create customer          |
| GET    | /customers/:id    | Yes  | Get one customer         |
| PUT    | /customers/:id    | Yes  | Update customer          |
| DELETE | /customers/:id    | Yes  | Delete customer          |

Protected routes need the header `Authorization: Bearer <token>`.

Customer body: `{ "name", "email", "phone", "company", "status": "Lead|Active|Inactive", "notes" }`. Name, email and phone are required.

### Error format

```json
{ "message": "Validation failed", "errors": ["A valid email is required"] }
```

Status codes used: 400 validation, 401 unauthorized, 404 not found, 409 duplicate email, 500 server error.

## Testing with Postman

1. `POST /api/auth/register` with name, email, password and copy the `token`.
2. In Postman, set the collection's Authorization to Bearer Token and paste it.
3. Exercise the `/api/customers` endpoints (create, list, update, delete).
4. Try invalid input (bad email, missing fields) and no token to see the 400 / 401 responses.

## Submission checklist

- [ ] Commit in small, meaningful steps (e.g. `feat: add auth routes`)
- [ ] Push to GitHub
- [ ] Record a screen video: register, login, add/edit/delete customer, validation errors, logout
"# Mern-integration-crm-" 
