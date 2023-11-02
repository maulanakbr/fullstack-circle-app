<h2>DUMBWAYS-BE-TASK-2-MAULANA-AKBAR</h2>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/24552207-cbb651fb-32ec-43b9-88d0-62047a9d4a37?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D24552207-cbb651fb-32ec-43b9-88d0-62047a9d4a37%26entityType%3Dcollection%26workspaceId%3D85d21805-694f-4c64-a0db-4cdc1da5da5c)

**Register**

- URL : http://localhost:5000/api/v1/users

- Method: POST

- Required Token: No

- Request Body: Default value of role field is 'STANDARD'

```json
{
  "email": "standard@mail.com",
  "password": "standard123",
  "name": "standard"
}
```

- Response Body :

```json
{
  "data": {
    "email": "standard@mail.com",
    "name": "standard",
    "role": "STANDARD"
  },
  "message": "Created user data"
}
```

**Find All Standard Users**

- URL : http://localhost:5000/api/v1/users

- Method: GET

- Required Token: No

- Response Body :

```json
{
  "data": [
    {
      "id": "56786194-3d4d-47f8-8284-49d37f68fe19",
      "email": "standard@mail.com",
      "name": "standard",
      "vote": null
    },
    {
      "id": "fb34fee0-674e-43e0-8ea2-f1e127c4794f",
      "email": "guest1@mail.com",
      "name": "guest1",
      "vote": {
        "id": "9486a58b-fd0f-4ae5-86c7-b9071f725b5d",
        "candidate": {
          "id": "d80933bc-8ef9-4e0d-94f9-f1008cb089ec",
          "name": "Albert Cynical"
        }
      }
    }
  ],
  "message": "Found all standard users data"
}
```

**Sign In**

- URL : http://localhost:5000/api/v1/auth/signin

- Method: POST

- Required Token: No

- Request Body:

```json
{
  "email": "standard@mail.com",
  "password": "standard123"
}
```

- Response Body :

```json
{
  "data": {
    "id": "56786194-3d4d-47f8-8284-49d37f68fe19",
    "email": "standard@mail.com",
    "name": "standard",
    "role": "STANDARD",
    "created_at": "2023-10-09T02:11:05.066Z",
    "updated_at": "2023-10-09T02:11:05.066Z"
  },
  "message": "Signing in successfully"
}
```

**Sign Out**

- URL : http://localhost:5000/api/v1/auth/signout

- Method: POST

- Required Token: Yes

- Response Body :

```json
{
  "message": "Signing out successfully"
}
```

**Create Vote**

- URL : http://localhost:5000/api/v1/votes

- Method: POST

- Required Token: Yes

- Required Role: STANDARD

- Request Body:

```json
{
  "candidate": "43a8740e-6a61-40e4-b5e2-c0f954daf4ee"
}
```

- Response Body :

```json
{
  "data": {
    "id": "95b394df-a7a5-4a4b-bc4d-ce31a9862b59",
    "candidateId": "43a8740e-6a61-40e4-b5e2-c0f954daf4ee",
    "user": {
      "id": "56786194-3d4d-47f8-8284-49d37f68fe19",
      "email": "standard@mail.com",
      "name": "standard"
    }
  },
  "message": "Created vote data"
}
```

**Find All Votes**

- URL : http://localhost:5000/api/v1/votes

- Method: GET

- Required Token: Yes

- Required Role: STANDARD | ADMINISTRATOR

- Response Body :

```json
{
  "data": [
    {
      "id": "9486a58b-fd0f-4ae5-86c7-b9071f725b5d",
      "candidate": {
        "id": "d80933bc-8ef9-4e0d-94f9-f1008cb089ec",
        "name": "Albert Cynical"
      },
      "user": {
        "id": "fb34fee0-674e-43e0-8ea2-f1e127c4794f",
        "email": "guest1@mail.com",
        "name": "guest1"
      }
    }
  ],
  "message": "Found all votes data"
}
```

**Find All Parties**

- URL : http://localhost:5000/api/v1/parties

- Method: GET

- Required Token: Yes

- Required Role: STANDARD | ADMINISTRATOR

- Response Body :

```json
{
  "data": [
    {
      "id": "095ef002-129d-462f-bc24-2e74b1532954",
      "name": "BARCAF Universal",
      "candidate": {
        "id": "d80933bc-8ef9-4e0d-94f9-f1008cb089ec",
        "name": "Albert Cynical",
        "vision": "Make England great again",
        "image": "https://res.cloudinary.com/dh2nzxc5h/image/upload/v1696811632/refactor-be-task-2-maulana-akbar/hhfhcfgvdwxbzxe7dyjd.jpg"
      }
    },
    {
      "id": "366133fa-d62f-48d7-8cbe-d3154c02c300",
      "name": "DOA",
      "candidate": {
        "id": "d80933bc-8ef9-4e0d-94f9-f1008cb089ec",
        "name": "Albert Cynical",
        "vision": "Make England great again",
        "image": "https://res.cloudinary.com/dh2nzxc5h/image/upload/v1696811632/refactor-be-task-2-maulana-akbar/hhfhcfgvdwxbzxe7dyjd.jpg"
      }
    },
    {
      "id": "b86cbb96-8dac-42ae-b79b-30c2654d7865",
      "name": "National Competindum",
      "candidate": {
        "id": "43a8740e-6a61-40e4-b5e2-c0f954daf4ee",
        "name": "Amelia Dough",
        "vision": "People can visit Moon in 2024",
        "image": "https://res.cloudinary.com/dh2nzxc5h/image/upload/v1696811464/refactor-be-task-2-maulana-akbar/ncled16ora0lqakoay5m.jpg"
      }
    },
    {
      "id": "dadefb15-627e-4ccb-b545-06c06da4346b",
      "name": "Free York Association",
      "candidate": {
        "id": "d80933bc-8ef9-4e0d-94f9-f1008cb089ec",
        "name": "Albert Cynical",
        "vision": "Make England great again",
        "image": "https://res.cloudinary.com/dh2nzxc5h/image/upload/v1696811632/refactor-be-task-2-maulana-akbar/hhfhcfgvdwxbzxe7dyjd.jpg"
      }
    }
  ],
  "message": "Found all parties"
}
```

**Create Candidate**

- URL : http://localhost:5000/api/v1/candidates

- Method: POST

- Required Token: Yes

- Required Role: ADMINISTRATOR

- Request Body:

```json
{
  "name": "candidate",
  "vision": "Candidate vision",
  "image": "https://res.cloudinary.com/dh2nzxc5h/image/upload/v1696813955/refactor-be-task-2-maulana-akbar/yc2swd2s9iyk4lkyyg5g.jpg",
  "parties": [
    {
      "name": "party_1"
    },
    {
      "name": "party_2"
    },
    {
      "name": "party_3"
    }
  ]
}
```

- Response Body :

```json
{
  "data": {
    "id": "7a72812b-60b1-4f65-a1d6-81c1a74a18b4",
    "name": "candidate",
    "vision": "Candidate vision",
    "image": "https://res.cloudinary.com/dh2nzxc5h/image/upload/v1696813955/refactor-be-task-2-maulana-akbar/yc2swd2s9iyk4lkyyg5g.jpg",
    "parties": [
      {
        "id": "d9e23524-1a6f-4247-a655-30ea2139c759",
        "name": "party_1"
      },
      {
        "id": "669980aa-53f3-4f75-a3fd-2cbd0930b696",
        "name": "party_2"
      },
      {
        "id": "2a5326f0-dc8c-4a34-a910-3c4e37447984",
        "name": "party_3"
      }
    ],
    "createdAt": "2023-10-09T01:12:36.032Z",
    "updatedAt": "2023-10-09T01:12:36.032Z"
  },
  "message": "Created candidate data"
}
```

**Find All Candidates**

- URL : http://localhost:5000/api/v1/candidates

- Method: GET

- Required Token: Yes

- Required Role: STANDARD | ADMINISTRATOR

- Response Body :

```json
{
  "data": [
    {
      "id": "43a8740e-6a61-40e4-b5e2-c0f954daf4ee",
      "name": "Amelia Dough",
      "vision": "People can visit Moon in 2024",
      "image": "https://res.cloudinary.com/dh2nzxc5h/image/upload/v1696811464/refactor-be-task-2-maulana-akbar/ncled16ora0lqakoay5m.jpg",
      "votes": [
        {
          "id": "95b394df-a7a5-4a4b-bc4d-ce31a9862b59",
          "user": {
            "id": "56786194-3d4d-47f8-8284-49d37f68fe19",
            "email": "standard@mail.com",
            "name": "standard"
          }
        }
      ],
      "parties": [
        {
          "id": "b86cbb96-8dac-42ae-b79b-30c2654d7865",
          "name": "National Competindum"
        }
      ],
      "createdAt": "2023-10-09T00:31:06.175Z",
      "updatedAt": "2023-10-09T00:31:06.175Z"
    },
    {
      "id": "b42669ff-16b5-4cc2-8977-63b5a4a5ab02",
      "name": "Frances Bean",
      "vision": "London is Red",
      "image": "",
      "votes": [],
      "parties": [
        {
          "id": "877e8038-3172-4a08-bfa6-1f4678888566",
          "name": "IMX"
        },
        {
          "id": "8bf7d93d-1edc-499e-b858-0c391d00bb32",
          "name": "YO-YO"
        }
      ],
      "createdAt": "2023-10-08T10:17:19.947Z",
      "updatedAt": "2023-10-08T10:17:19.947Z"
    },
    {
      "id": "d80933bc-8ef9-4e0d-94f9-f1008cb089ec",
      "name": "Albert Cynical",
      "vision": "Make England great again",
      "image": "https://res.cloudinary.com/dh2nzxc5h/image/upload/v1696811632/refactor-be-task-2-maulana-akbar/hhfhcfgvdwxbzxe7dyjd.jpg",
      "votes": [],
      "parties": [
        {
          "id": "095ef002-129d-462f-bc24-2e74b1532954",
          "name": "BARCAF Universal"
        },
        {
          "id": "366133fa-d62f-48d7-8cbe-d3154c02c300",
          "name": "DOA"
        },
        {
          "id": "dadefb15-627e-4ccb-b545-06c06da4346b",
          "name": "Free York Association"
        }
      ],
      "createdAt": "2023-10-09T00:33:53.612Z",
      "updatedAt": "2023-10-09T00:33:53.612Z"
    }
  ],
  "message": "Found all candidates"
}
```

**Find Candidate By Id**

- URL : http://localhost:5000/api/v1/candidates/:id

- Method: GET

- Required Token: Yes

- Required Role: ADMINISTRATOR

- Response Body :

```json
{
  "data": {
    "id": "43a8740e-6a61-40e4-b5e2-c0f954daf4ee",
    "name": "Amelia Dough",
    "vision": "People can visit Moon in 2024",
    "image": "https://res.cloudinary.com/dh2nzxc5h/image/upload/v1696811464/refactor-be-task-2-maulana-akbar/ncled16ora0lqakoay5m.jpg",
    "createdAt": "2023-10-09T00:31:06.175Z",
    "updatedAt": "2023-10-09T00:31:06.175Z"
  },
  "message": "Found seleceted candidate"
}
```

**Update Candidate**

- URL : http://localhost:5000/api/v1/candidates/:id

- Method: PUT

- Required Token: Yes

- Required Role: ADMINISTRATOR

- Request Body:

```json
{
  "name": "candidate",
  "vision": "Candidate vision"
}
```

- Response Body :

```json
{
  "message": "Candidate updated"
}
```

**Delete Candidate**

- URL : http://localhost:5000/api/v1/candidates/:id

- Method: DELETE

- Required Token: Yes

- Required Role: ADMINISTRATOR

- Response Body :

```json
{
  "message": "Candidate deleted"
}
```
