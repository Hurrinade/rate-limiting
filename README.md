# Project description

This is a full-stack rate limiting demonstration project. The application showcases different aproaches to rate limiting on a server. Appliation provides rate limiting pratical examples.

**Note**

- rate limiting would usually be done on all routes level but for project demonstration it is done per route

# 🚧 STILL IN WORK

- server
  - [x] Fixed limit windows with server timing
  - [x] Fixes limit windows with user initiated start (express-rate-limit)
  - [] Sliding limit windows
  - [] Floating limit window
  - [] Bucket limiting
- client
  - visual representation of limiting

## What is going on 🤓

1. **Fixed limit windows with server timing**

- this is very simple aproach which creates fixed timewindow on server which resets requests receieved counter every n (minutes, seconds, days...)
- user is sending requests which are counted in each window, if user reaches request limit all other requests are blocked until specified time window ends

Problem:

- if user spams all his requests at the end of first time windows and start of the second window, he sent double amount of requests in very short time which can be very vulnerable

2. **Fixed limit windows with user initiated timing**

- TODO: docs

## Tech Stack

### Frontend

- **React** - Modern UI library for building interactive user interfaces
- **TypeScript** - Type-safe JavaScript for better development experience

### Backend

- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast and minimalist web framework
- **TypeScript** - Type-safe server-side development

Libraries:

- express-rate-limit - for simplest rate limitng technique

### Infrastructure

- **Docker** - Containerization for consistent development and deployment`
- **Docker Compose** - Multi-container orchestration for easy setup`

## Features

- **Fixed limit windows with server timing**: Server defined timewindows for limiting
- **Fixed limit windows with user initiated timing**: User initiated timewindows for limiting
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Containerized Environment**: Docker setup for easy development and deployment

## Quick Start

### Setup env variables

Two files:

- .env

Content:

```bash
# development
# Server port
PORT=3000
# Server env
NODE_ENV=development
```

### Start application

```bash
docker compose up -d
```

### **Usage**

- ## Five modes:
