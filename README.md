# Smart Laundry Booking System

A web-based application that enables hostel residents to check washing machine availability and reserve laundry slots online, reducing waiting time and improving machine utilization.

## Problem Statement

The current hostel laundry process lacks a centralized system to manage washing machine usage. Students are unable to check machine availability before visiting the laundry room, leading to unnecessary waiting, repeated visits, and inconvenience. This results in inefficient utilization of washing machines and a poor user experience.

## Motivation

Managing hostel laundry manually is time-consuming and inconvenient for students. The absence of a booking mechanism often results in uncertainty regarding machine availability and unnecessary trips to the laundry room.

This project aims to simplify the laundry process by providing an organized, digital platform for checking machine availability and booking washing machines in advance.

## Solution Overview

The Smart Laundry Booking System is a web-based application that allows hostel residents to:

- View real-time washing machine availability
- Reserve laundry slots online
- Manage their bookings
- Improve machine utilization
- Reduce waiting time and unnecessary visits

## Features

- Secure user authentication
- Real-time machine availability
- Online slot booking
- Booking management
- Automatic slot expiry
- Responsive user interface

## Technology Stack

| Technology | Purpose |
|------------|---------|
| **React.js** | Frontend framework for building the user interface |
| **React Router** | Enables seamless navigation between application pages |
| **Firebase Authentication** | Secure user authentication and session management |
| **Cloud Firestore** | Real-time NoSQL database for storing application data |

### Frontend – React.js

- Built a responsive and interactive user interface using reusable components.
- Implemented smooth navigation between **Login**, **Home**, **Booking**, **Machine List**, and **Dashboard** using React Router.
- Utilized React Hooks (`useState`, `useEffect`) for efficient state management and dynamic rendering.

### Backend & Database – Firebase

#### Firebase Authentication
- Provides secure user registration and login using institute email IDs.
- Supports password reset through email verification.
- Maintains authenticated user sessions across the application.

#### Cloud Firestore
- Stores user profiles, machine information, and booking records.
- Provides real-time synchronization of booking data.
- Prevents duplicate bookings through validation before confirmation.

## System Architecture

The **Smart Laundry Booking System** follows a three-layer architecture consisting of the frontend, authentication service, and cloud database.

### Architecture Flow

```text
                 User
                   │
                   ▼
          React Frontend
      ┌─────────────────────┐
      │ • Login / Signup    │
      │ • Dashboard         │
      │ • Machine List      │
      │ • Booking Module    │
      └─────────────────────┘
                   │
                   ▼
    Firebase Authentication
      ┌─────────────────────┐
      │ • User Registration │
      │ • Secure Login      │
      │ • Session Management│
      │ • Password Reset    │
      └─────────────────────┘
                   │
                   ▼
       Cloud Firestore
      ┌─────────────────────┐
      │ • User Data         │
      │ • Machine Data      │
      │ • Booking Records   │
      │ • Slot Availability │
      └─────────────────────┘
```

# Setup Instructions

Follow the steps below to run the Smart Laundry Booking System locally.

## 1. Clone the Repository

```bash
git clone https://github.com/ec25i2009-ops/smart-laundry-booking-system.git
```

## 2. Navigate to the Project Directory

```bash
cd smart-laundry-booking-system
```

## 3. Install Dependencies

Make sure you have **Node.js (v18 or later)** and **npm** installed.

```bash
npm install
```

## 4. Configure Firebase

1. Create a project in the **Firebase Console**.
2. Enable **Authentication** (Email/Password).
3. Create a **Cloud Firestore** database.
4. Register a Web App in Firebase.
5. Copy your Firebase configuration.

Open the `src/firebase.js` file and replace the existing Firebase configuration with your own project credentials.

Example:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## 5. Create Firestore Collections

Create the following collections in Cloud Firestore:

- `users`
- `machines`
- `bookings`

Populate the `machines` collection with the required washing machine details before running the application.

## 6. Start the Development Server

```bash
npm run dev
```

The application will start locally.

## 7. Build for Production

```bash
npm run build
```

The optimized production files will be generated inside the `dist/` folder.

---

## Prerequisites

- Node.js (v18 or later)
- npm
- Firebase Project
- Firebase Authentication (Email/Password enabled)
- Cloud Firestore Database

---

## Tech Stack

- React.js
- Vite
- Firebase Authentication
- Cloud Firestore
- React Router
- CSS
