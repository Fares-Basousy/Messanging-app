# Next.js Client

This is the client-side codebase for the Messaging App, built using Next.js.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Usage](#usage)

## Introduction

The Next.js client is the user interface for our Messaging App. It provides a seamless and interactive experience for users. Below, you'll find information on setting up and running the client-side application.

## Getting Started

To get the client-side application up and running locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/your-username/messaging-app.git
cd messaging-app/client
```

2. install dependencies:
   ```
   npm install
   ```
   
3 start the development server:
```
npm run dev
```
The client-side application should now be running locally on port 3000.

## Project Structure

The project structure follows Next.js conventions. Here's an overview of important directories and files:

- `src/app`: Contains the pages of the application.
  - `api`: Contains the API endpoints of the application.
    - `createroom`: Api  to create a room for the user.
    - `login`: Api file to login in the user.
    - `reg`: Api file to register the user.
  - `auth`: Contains the login pages of the application.
    - `login`: Contains the login page.
    - `register`: Contains the register page.
    - `dashboard`: Contains the dashbord/chat room.
- `layout`: the layout foulder

## Features

Our Messaging App's client-side interface offers a range of features to enhance your messaging experience:

- **User Authentication:** Seamlessly log in to your account and enjoy secure access to the app. (Authentication is handled on the server.)

- **Authorization:** Access the app's features with ease using cookies that store your access token. Feel confident that your interactions are secure.

- **User Registration:** New users can quickly sign up, providing a unique username, unique email and a secret password to get started.

- **User Dashboard:** Your personal dashboard is the control center of your messaging experience. It includes:

  - **Chat/Rooms List:** Browse and choose from a list of available chat rooms, making it easy to connect with others.

  - **Chat Interface:** Engage in real-time conversations within the selected chat room in realtime. Our user-friendly interface ensures smooth communication.

## Usage

Basically the users signs up and login and then adds other users by their usernames and can begin to chat in no time
