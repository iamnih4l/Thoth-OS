# API Specification

## Overview
Base URL: \https://api.example.com/v1\
Authentication: Bearer Token (JWT)

## Endpoints

### 1. Resource Name
#### \GET /resource\
Description of what this endpoint does.

**Parameters**:
- \limit\ (query, optional): Int. Default 20.
- \offset\ (query, optional): Int. Default 0.

**Response (200 OK)**:
\\\json
{
  "data": [],
  "meta": { "total": 0 }
}
\\\

#### \POST /resource\
Creates a new resource.

**Request Body**:
\\\json
{
  "name": "string",
  "required_field": "string"
}
\\\

**Response (201 Created)**:
\\\json
{
  "id": "uuid",
  "name": "string"
}
\\\

## Error Codes
| Code | Meaning |
|---|---|
| 400 | Bad Request (Validation failed) |
| 401 | Unauthorized (Invalid token) |
| 403 | Forbidden (Insufficient permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |
