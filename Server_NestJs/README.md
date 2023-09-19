# Nest.js Server

This is the server-side codebase for the Messaging App, built using Nest.js.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database](#database)


## Introduction

This Nest.js server is the backbone of our Messaging App, handling user authentication, real-time messaging, and more. Below, you'll find information on setting up and running the server.

## Getting Started

To get the server up and running locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Fares-Basousy/messaging-app.git
cd messaging-app/Server_NestJs
```
2. Install dependenies:
   ```
     npm install
   ```
   
3. Set up environment variables by creating a .env file in the server directory. You can use the example             env.example file as a reference.
  
4. Start the server in development mode:

     ```
     npm run start:dev
     ```
     
   the server should be running locally on port 4000

## Project Structure
The project structure follows Nest.js conventions. Here's an overview of important directories and files:

- `src/`: Contains the source code.
  - `auth/`: Auth Module.
    - `dto/`: DTOs need for the auth module.
    - `strategy/` : jwt strategy applied for authentication.
    - `auth.(controller,module,service)`: Auth Module's controller, module, and service files.
  - `messages/`: Messages Module's (websockets gateway).
    - `dto/`: DTO needed for the messages gateway.
    - `auth.(gateway,module)`: Messages' gateway and module files.
  - `user/`: User Module.
    - `dto/`: DTOs need for the User module.
    - `user.(controller,module,service)`: user Module's controller, module, and service files.
- `Scheema/`: Database scheemas.

## Environment Variables

To run the server, you'll need to configure the following environment variables in your `.env` file:

- `DB-Uri`: Connection string for your database.
- `jwtPass`: Secret key for JWT token generation.

## API Endpoints

Our server provides the following API endpoints to interact with the Messaging App:

### `POST /auth/signup`

- **Description**: Used to register user.
- **Request Body**: an auth DTO.
  - `name` (string): The username of the new user.
  - `email` (string): The email address of the new user.
  - `password` (string): The password of the new user.

- **Response**:
  - `201 OK`: Successfully created user.
  - `403 Not Found`: if email or username is already taken.

### `POST /auth/signin/`

- **Description**: login a user using Auth.signin DTO.
- **Request body**:
  - `email` (string): The email of the user.
  - `password` (string): The email address of the new user.
- **Response**:
  - `200 OK`: Successfully fetched the user with a jwt access token that is valid for 24 hours and  has the id     of the user and email.
  - `403 Not Found`: whether the creds (username) or password is wrong.

### `POST /user/createchat`

- **Description**: Create a new room for a with another user to chat .
- **Request Body**:
  - `user id` (string): id of the current user which is imported from the cookies.
  - `the other user` (string): The name of the other user.
- **Response**:
  - `201 Created`: User room created successfully.
  - `400 Bad Request`: other user not found.

## Websocket Messages: 
   the websockets are on port 5000 because when have the same as the rest of the app          (authentication) they will triggger without a connection

### `onconnection`
- **Description**: on connection sends the user's rooms.
- **query**:
  - `id` (string): The id of the user to get his rooms and subscribe him .

### `sendmsg`

- **Description**: gets a message then adds it to the room and returns it to the client for displaying.
- **Parameters**:
  - `Message DTO` : Includes sender room and text.

### `openchat`
- **Description**: gets the room's messages.
- **query**:
  - `id` (string): The id of the room.

## Authentication 
  the strategy takes the user's id and email and makes a jwt access_token and it gets stored in the client side as a cookie
  where the access token must be valid and sent with the headers for the user to continue
  
## Database

There are 2 scheems One for the user and one for the Room
### User
- **id** : object Od 
- **name** : string
- **rooms** : array of object Ids
- **email**: user email
- **password** : user's password which is encrypted in the database
### Room
- **id** : Object Id
- **users** : array of object Ids
- **names** : array of user names
- **messages** : array of message objects
