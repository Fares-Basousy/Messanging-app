# Messaging App

A simple messaging app with authentication and authorization built using Next.js for the front-end and Nest.js for the backend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization.
- Real-time messaging functionality.
- User profile management.
- Secure and scalable architecture.

## Technologies Used

- Front-end:
  - Next.js
  - React
  - Redux (or any state management library of your choice)
  - CSS (or any styling method of your choice)

- Back-end:
  - Nest.js
  - PostgreSQL (or your preferred database)
  - TypeORM
  - JWT for authentication
  - WebSockets for real-time messaging

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL database set up and running.

### Installation

1. Clone the repository.

```
  git clone https://github.com/your-username/messaging-app.git
  cd messaging-app
```
2. Install dependencies for both the front-end and back-end.

```
# Navigate to the Client directory
  cd Client_NextJs
  npm install
```

```
# Navigate to the Server directory
  cd ../Server_NestJs
  npm install
```
3. Set up your environment variables. Create .env files in both the client and server directories and configure them according to your needs,
 you'll need a DB-Uri and a jwtPass.

2. Run the Client and Server applications separately 

```
# Start the Client (NextJs)
  cd Clinet_NextJs
  npm run dev
# Start the Server (NestJs)
  cd ../Server_NestJs
  npm run start:dev
```
Now, you should have the front-end and back-end servers running locally.

## Usage

  Welcome to the Messaging App, a user-friendly platform that combines the best features of WhatsApp Web and Discord. Get started by following these simple steps:
1. Registration and Login

    Register: Begin by creating your account. Click the "Register" button and provide your essential details, including a unique username and a secure password.

    Login: After registration, use your credentials to log in securely. We ensure your data's safety with robust authentication protocols.

2. Explore Your Dashboard

    Dashboard: Upon successful login, you'll be greeted with your personalized dashboard. Here, you have the power to manage your messaging experience.

3. Connect with Others

    Add Contacts: Add friends and fellow users to your network by entering their usernames. This feature lets you connect with them seamlessly.

4. Real-Time Conversations

    Start Chatting: Initiate real-time conversations with your added contacts. Our platform utilizes cutting-edge WebSockets to ensure instant messaging.

5. Stay Secure

    Authorization: Your data's security is our priority. We employ access tokens that are valid for 24 hours from the moment you sign in, ensuring your privacy and peace of mind.

That's it! Enjoy your messaging experience with our user-friendly and secure platform. If you have any questions or encounter any issues, please don't hesitate to reach out to our support team.

Feel free to explore and customize your profile settings, and make the most of our messaging app. Happy messaging!

