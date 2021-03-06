# Technomedia Application
REST API server built using Node/Express.js

**Server Link(Host)**: `https://technomedia-server.herokuapp.com/`

## Registration(SignUp) API
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

## Login(SignIn) API
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

## Create Profile For User - API
Create a profile for the authenticated user & returns the created profile

**API Address**: `host/api/user/profile`

**Request Format**: `JSON`

**Request Method**: `POST`

```
{
    "phone":"+91 0000254126",
    "website":"devport-app.herokuapp.com",
    "location":"BLR, IND",
    "department":"Software Development",
    "skills":"MERN Stack, Java, JavaScript, Python",
    "bio":"Love To Code!!",
    "githubusername":"asonib",
    "youtube":"",
    "twitter":"https://twitter.com/asonib",
    "linkedin":"https://linkedin.com/aryansoni",
    "facebook":"",
    "instagram":"https://www.instagram.com/aryansoniburman"
}
```
**Validations -ExpressValidator**:
- `phone` required field
- `department` required field
- `skills` required field
- `department` required field

**Response Format**: `JSON`
```
{
    "social": {
        "twitter": "https://twitter.com/asonib",
        "linkedin": "https://linkedin.com/aryansoni",
        "instagram": "https://www.instagram.com/aryansoniburman"
    },
    "skills": [
        "MERN Stack, Java, JavaScript, Python"
    ],
    "_id": "5f285a492a9e330017c12d05",
    "user": "5f2859b4bf5357184ceb40b5",
    "phone": "8340505682",
    "website": "devport-app.derokeapp.com",
    "location": "BLR, IND",
    "department": "Software Development",
    "bio": "Love To Code!!",
    "githubusername": "asonib",
    "experience": [],
    "date": "2020-08-03T18:41:13.950Z",
    "__v": 0
}
```
<hr/>

## Fetch All Profiles - API
return details of all registered users to the authenticated user

**API Address**: `host/api/user/all`

**Request Format**: `JSON`

**Request Method**: `GET`

**Response Format**: `JSON`
```
[
    {
        "social": {
            "twitter": "https://twitter.com/asonib",
            "linkedin": "https://linkedin.com/aryansoni",
            "instagram": "https://www.instagram.com/aryansoniburman"
        },
        "skills": [
            "MERN Stack, Java, JavaScript, Python"
        ],
        "_id": "5f2868756740f51e9cfc3a1f",
        "user": {
            "_id": "5f28685f6740f51e9cfc3a1e",
            "name": "Aryan Sonir",
            "email": "aryan85tata@gmail.com",
            "avatar": "https://gravatar.com/avatar/010a87ebd6eb452d7f0b358fef53ef4d?d=mm&r=pg&s=200",
            "public_key": "9ce698f6-e4a1-4d02-80d5-9a61f974b666"
        },
        "phone": "8340505682",
        "website": "devport-app.derokeapp.com",
        "location": "BLR, IND",
        "department": "Software Development",
        "bio": "Love To Code!!",
        "githubusername": "asonib",
        "experience": [],
        "date": "2020-08-03T19:41:41.981Z",
        "__v": 0
    },
    {
        "social": {
            "twitter": "https://twitter.com/amankr",
            "linkedin": "https://linkedin.com/amankumar",
            "instagram": "https://www.instagram.com/iam_ak"
        },
        "skills": [
            "Java, JavaScript, Python"
        ],
        "_id": "5f286eae6740f51e9cfc3a21",
        "user": {
            "_id": "5f286e3b6740f51e9cfc3a20",
            "name": "Aman Kumar",
            "email": "amana@gmail.com",
            "avatar": "https://gravatar.com/avatar/91a1b0cbd7e670306be721ec81956010?d=mm&r=pg&s=200",
            "public_key": "20cddc11-e50c-463d-b486-4b00cceb967d"
        },
        "phone": "+91 4563218791",
        "website": "aman.com",
        "location": "JPR, IND",
        "department": "Software Tester",
        "bio": "Tech Enthusiast",
        "githubusername": "amankr",
        "experience": [],
        "date": "2020-08-03T20:08:14.843Z",
        "__v": 0
    }
    .......more........
]
```
<hr/>

## Delete Account - API
Deletes all the user data for logged In user(Closes the account).

`All the chats in the forum by the user will also be deleted.`

**API Address**: `host/api/user/deleteuser`

**Validation**: `user token will be verified before deleting the account`

**Request Method**: `DELETE`

**Response Format**: `JSON`
```
{
    "msg": "User deleted Successfully!"
}
```
<hr/>

## Posts - API
Authenticated users can post messages in a chat forum

**API Address**: `host/api/forum`

**Request Format**: `JSON`

**Request Method**: `POST`

```
{
    "text": "i love this platform!!"
}
```
**Validations -ExpressValidator**:
- `text` required field

**Response Format**: `JSON`
```
{
    "post": {
        "date": "2020-08-04T10:36:45.769Z",
        "_id": "5f293bfde3d5bb1ab43aaef1",
        "user": "5f28685f6740f51e9cfc3a1e",
        "text": "this platform is very user friendly!!!",
        "__v": 0
    }
}
```
<hr/>

## Get All Posts  - API
Authenticated users can see all other posts

**API Address**: `host/api/forum`

**Request Format**: `JSON`

**Request Method**: `GET`

**Validations**: `only authenticated user can get all posts`

**Response Format**: `JSON`
```
{
    "msg": [
        {
            "date": "2020-08-04T10:12:44.752Z",
            "_id": "5f2935122ae39820f423e3eb",
            "user": {
                "_id": "5f2934b72ae39820f423e3e9",
                "name": "Test",
                "email": "test@gmail.com",
                "avatar": "https://gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?d=mm&r=pg&s=200"
            },
            "text": "i love this paltfrom!",
            "__v": 0
        },
        {
            "date": "2020-08-04T10:12:44.752Z",
            "_id": "5f2939162ae39820f423e3ec",
            "user": {
                "_id": "5f2934b72ae39820f423e3e9",
                "name": "Test",
                "email": "test@gmail.com",
                "avatar": "https://gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?d=mm&r=pg&s=200"
            },
            "text": "i got a new and a better job today!",
            "__v": 0
        },
        ......more.......
    ]
}
```
<hr/>

## Delete a Post - API
Users can delete posted messages

**API Address**: `host/api/forum/:<post_id>`

**Request Format**: `JSON`

**Request Method**: `DELETE`

**Validations**: `user can delete his/her posts only`

**Failed Validation Response**
```
{
    "msg": "Not authorized to delete"
}
```

**Response Format**: `JSON`
```
{
    "msg": "post deleted"
}
```
<hr/>