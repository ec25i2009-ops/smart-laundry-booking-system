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

The Smart Laundry Booking System follows a three-layer architecture consisting of the frontend, authentication service, and cloud database.

### Architecture Flow

User
↓
React Frontend
- Login / Signup
- Dashboard
- Machine List
- Booking Module

↓

Firebase Authentication
- User Registration & Login
- Session Management
- Password Reset

↓

Cloud Firestore
- User Data
- Machine Information
- Booking Records
- Slot Availability
