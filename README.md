# Overview
A REST API project for managing user data. It was built using the following tools:
- **Express** - For handling requests and responses.
- **TypeScript** - For type safety.
- **Zod** - Parsing incoming payloads and inferring types.
- **Mongoose & MongoDB** - For data modeling and storing.

It adheres to the modular pattern for structuring the application. More on app structure is described in the later section.

## Getting started
After installing create a `.env` file in the root of this project. It should contain the following variables:

```ini
MONGODB_URI = mongodb+srv://...
BCRYPT_SALT_ROUNDS = 10 # Fallback is set to 8.
PORT = 8080 # Fallback is set to 8080.
```

### Running the application
   ```bash
   # development
   $ npm run dev

   # production build
   $ npm run build

   # running in production
   $ npm run start
   ```

## App structure

```
├── src
│   ├── server.ts // Main entry point for the application.
│   └── app.ts // Default exports the `app` from express for routing.  
├── config
│   └── index.ts // Default exports environment variables
├── modules
│   ├── user
│   │   ├── user.interface.ts
│   │   ├── user.route.ts
│   │   ├── user.controller.ts
│   │   ├── user.model.ts
│   │   └── user.service.ts
├── .env
├── .gitignore
├── package.json
├── vercel.json
└── tsconfig.json
```

## User type
This is how a user is stored in the database.

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

### Create a new user
- **POST** - `/api/users`
- JSON Payload
  
  ```json
  {
    "userId": 2023, // Unique and the first digit can't be 0
    "username": "johurul_haque", // Unique
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
            "username": "johurul_haque",
            "fullName": {
                "firstName": "Johurul",
                "lastName": "Haque"
            },
            "age": 20,
            "email": "johurul@nno.org",
            "address": {
                "street": "Bolbo na",
                "city": "Faridpur",
                "country": "Bangladesh"
            },
        } 
        // more...
    ]
  }
  ```

### Get specific user
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
> ⚠️ Don't update the `order` field using this route. This would overwrite the field with new data and we don't want that. Instead, use `/api/users/{userId}/orders`

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
### Get all orders done by a user
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

### Get the total price of orders for a user
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
