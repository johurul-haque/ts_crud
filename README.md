# Overview
A REST API project for managing user data. It was built using the following tools
- **Express** - For handling requests and responses.
- **TypeScript** - For type safety.
- **Zod** - Parsing incoming payloads and infering types.
- **Mongoose & MongoDB** - For data modeling and storing.

It adheres the modular pattern for structuring the application. More on app structure is described in later section.

## Getting started
After installing all the dependencies using `npm install` create a `.env` file in the root of this project. It should contain the following variables:

```
MONGODB_URI=mongodb+srv...
BCRYPT_SALT_ROUNDS=10 // Optional, a fallback is set to 8.
PORT=8080 // Optional, a fallback is set to 8080.
```
### Dev server
1. Start the application in development using
   ```
   npm run dev
   ```
   This will launch the server using `ts-node-dev`, which automatically restarts on file changes.

2. Open your browser and navigate to `http://localhost:YOUR_PORT` to access the application. Replace YOUR_PORT with the port specified in the `.env` file.

### Production build
```
npm run build
```
This command transpiles TypeScript files into JavaScript in the dist directory.

### Running in production
```
npm start
```
This command will run the compiled JavaScript located in the `dist` directory using `node`.

## App structure

```json
├── src
│   ├── server.ts // Main entry point for the application.
│   └── app.ts // Default exports the `app` from express for routing.  
├── config
│   └── index.ts // Default exports environment variables
│   ├── modules
│   │   ├── user
│   │   │   ├── user.interface.ts
│   │   │   ├── user.route.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.model.ts
│   │   │   ├── user.service.ts
├── .env
├── .gitignore
├── package.json
├── vercel.json
└── tsconfig.json
```
## User type
This is how a user is being stored in database.

```ts
type User = {
    userId: number;
    username: string;
    password: string;
    fullName: {
        firstName: string;
        lastName: string;
    };
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: {
        street: string;
        city: string;
        country: string;
    };
    orders?: {
        productName: string;
        price: number;
        quantity: number;
    }[] | undefined;
}
```

## API endpoints

### Create new user
- **POST** - `/api/users`
- JSON Payload
  
  ```json
  {
    "userId": 2003,
    "username": "johurul_haque",
    "password": "hello_JS_1997",
    "fullName": {
        "firstName": "Johurul",
        "lastName": "Haque"
    },
    "age": 20,
    "email": "johurul@nno.org",
    "hobbies": [
        "YouTube",
        "Coding"
    ],
    "address": {
        "street": "Bolbo na",
        "city": "Faridpur",
        "country": "Bangladesh"
    },
    "isActive": true
  } 
  ```
### Get all users
- **GET** - `/api/users`
- **Response**
  
  ```json
  {
    "success": true,
    "message": "Users fetched successfully!",
    "data": [
        {
            "userId": 2003,
            "username": "johurul_haque",
            "fullName": {
                "firstName": "Johurul",
                "lastName": "Haque"
            },
            "age": 20,
            "email": "johurul@nno.org",
            "hobbies": [
                "YouTube",
                "Coding"
            ],
            "address": {
                "street": "Bolbo na",
                "city": "Faridpur",
                "country": "Bangladesh"
            },
            "isActive": true
        } 
        // more...
    ]
  }
  ```

### Get user by userId
- **GET** - `/api/users/{userId}`
- **Response** 
  
    ```json
    {
        "success": true,
        "message": "User fetched successfully!",
        "data": {
            "userId": 2003,
            "username": "johurul_haque",
            "fullName": {
                "firstName": "Johurul",
                "lastName": "Haque"
            },
            "age": 20,
            "email": "johurul@nno.org",
            "hobbies": [
                "YouTube",
                "Coding"
            ],
            "address": {
                "street": "Bolbo na",
                "city": "Faridpur",
                "country": "Bangladesh"
            },
            "isActive": true
        }
    }
    ```

### Update user
> ⚠️ Don't update the `order` field using this route. This would overwrite the field with new data and we don't want that. Instead use `/api/users/{userId}/orders`

- **PUT** - `/api/users/{userId}`

- JSON payload should only contain fields defined in the **user type**.

### Add products
- **PUT** - `/api/users/{userId}/orders`
- JSON payload
  
  ```json
  {
    "productName": "M3 Macbook Air",
    "price": 150000,
    "quantity": 1
  }
  ```
### Get all orders done by user
- **GET** - `/api/users/{userId}/orders`
- **Response**
  
  ```json
  {
    "success": true,
    "message": "Order fetched successfully!",
    "data": {
      "orders": [
        {
          "productName": "M3 Macbook Air",
          "price": 150000,
          "quantity": 1
        },
        {
          "productName": "Iphone 15 pro",
          "price": 148000,
          "quantity": 1
        }
      ]
    }
  }
  ```

### Get the total-price of orders for a user
- **GET** - `/api/users/{userId}/orders/total-price`
- **Response**
  ```json
  {
    "success": true,
    "message": "Total price calculated successfully!",
    "data": {
        "totalPrice": 298000
    }
  }
  ```

### Delete user
- **DELETE** - `/api/users/{userId}`
