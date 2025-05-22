# ExpressJWT API Documentation

## Overview

This project provides a RESTful API with JWT-based authentication using Express.js.

---

## Authentication

### Register

**POST** `/api/v1/auth/register`

Register a new user.

#### Request Headers

- `Content-Type: application/json`

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "your_password"
}
```

#### Response Body

```json
{
  "success": true,
  "message": "User registered successfully.",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Login

**POST** `/api/v1/auth/login`

Authenticate a user and receive access and refresh tokens as cookies.

#### Request Headers

- `Content-Type: application/json`

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "your_password"
}
```

#### Response Body

```json
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Cookies

- `accessToken`: JWT access token (HttpOnly)
- `refreshToken`: JWT refresh token (HttpOnly)

---

### Refresh Token

**POST** `/api/v1/auth/refresh`

Refresh the access token using the refresh token cookie.

#### Request Headers

- (Cookies must include `refreshToken`)

#### Response Body

```json
{
  "success": true,
  "message": "Access token refreshed successfully.",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Logout

**POST** `/api/v1/auth/logout`

Logs out the user by clearing authentication cookies.

#### Response Body

```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

## Categories

All category endpoints are prefixed with `/api/v1/category`.

### Create Category

**POST** `/api/v1/category/`

Create a new category.

#### Request Headers

- `Content-Type: application/json`

#### Request Body

```json
{
  "name": "Technology",
  "slug": "technology",
  "isActive": true
}
```

#### Response Body

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Technology",
    "slug": "technology",
    "isActive": true
  }
}
```

---

### Get All Categories

**GET** `/api/v1/category/`

Retrieve all categories.

#### Response Body

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Technology",
      "slug": "technology",
      "isActive": true
    }
    // ...
  ]
}
```

---

### Get Category by ID

**GET** `/api/v1/category/{id}`

Retrieve a category by its ID.

#### URL Params

- `id`: Category UUID

#### Response Body

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Technology",
    "slug": "technology",
    "isActive": true
  }
}
```

---

### Update Category

**PUT** `/api/v1/category/{id}`

Update a category by its ID.

#### URL Params

- `id`: Category UUID

#### Request Body

```json
{
  "name": "Tech",
  "slug": "tech",
  "isActive": false
}
```

#### Response Body

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Tech",
    "slug": "tech",
    "isActive": false
  }
}
```

---

### Soft Delete Category

**DELETE** `/api/v1/category/{id}`

Soft delete a category (sets `isActive` to `false`).

#### URL Params

- `id`: Category UUID

#### Response Body

```json
{
  "success": true,
  "message": "Category soft deleted",
  "data": {
    "id": "uuid",
    "name": "Tech",
    "slug": "tech",
    "isActive": false
  }
}
```

---

## Error Responses

### Validation Error

```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": ["Name is required"]
}
```

### Not Found

```json
{
  "success": false,
  "code": "CATEGORY_NOT_FOUND",
  "message": "Category not found."
}
```

### Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized",
  "error": "NO_TOKEN_PROVIDED"
}
```

### Forbidden

```json
{
  "success": false,
  "message": "Access denied. Insufficient role.",
  "error": "Forbidden"
}
```

---

## Example Usage

### Register

```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"your_password"}'
```

### Login

```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"your_password"}' \
  -c cookies.txt
```

### Create Category

```bash
curl -X POST http://localhost:4000/api/v1/category/ \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name":"Technology","slug":"technology"}'
```

### Get All Categories

```bash
curl http://localhost:4000/api/v1/category/ -b cookies.txt
```

---

## Notes

- All protected endpoints require authentication via cookies (`accessToken`).
- Replace `uuid` with actual UUIDs from your database.
- Use the `/api-docs` endpoint for interactive Swagger documentation.
