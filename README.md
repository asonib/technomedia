# Technomedia Application
REST API server built using Node/Express.js

# Registration(SignUp) API
Registers user and generates a token for automatic login after registration.

**API Address**: `host/api/auth/register`

**Request Format**: `JSON`

**Request Method**: `POST`

```
{
    "name": "Aryan Soni",
    "email": "aryan85tata@gmail.com",
    "password": "aes256",
    "role": "user"
}
```
**Validations -ExpressValidator**:
- `name` required field
- `email` required field
- `password` required field & minimum required Length 5
- `role` required field

**Response Format**: `JSON`
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjg1ZDlkOTg4OTA4MWVjNDQ4OWVlZiIsImlhdCI6MTU5NjQ4MDkyNiwiZXhwIjoxNTk2ODQwOTI2fQ.eTuk5C2-Er4hbOQBxXn-YRb4za4LASxLhVdezYTTKLI"
}
```
<hr/>

# Login(SignIn) API
Login user and generates a token for authorization

**API Address**: `host/api/auth/login`

**Request Format**: `JSON`

**Request Method**: `POST`

```
{
    "email": "aryan85tata@gmail.com",
    "password": "aes256"
}
```
**Validations -ExpressValidator**:
- `name` required field
- `password` required field

**Response Format**: `JSON`
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjg2ODVmNjc0MGY1MWU5Y2ZjM2ExZSIsImlhdCI6MTU5NjQ4NDAwNSwiZXhwIjoxNTk2ODQ0MDA1fQ.BaunpHWG1spxd54E2fDr6Ks1_qXZ-YO-prb-3Ch5kFs"
}
```
<hr/>