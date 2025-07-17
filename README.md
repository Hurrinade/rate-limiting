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
- key for user tracking is ip adress

  Problem:

  - if user spams all his requests at the end of first time windows and start of the second window, he sent double amount of requests in very short time which can be very vulnerable

2. **Fixed limit windows with user initiated timing**

- another simple fixed aproach which start window for limiting when user sends his first request, window is lasting for n (minutes, seconds, days...) and once it expires user can initiate new window limit which will again count number of requests
- key for user tracking is ip adress

  Problem:

  - user can initiate window with one request, wait until window endtime and spam rest of the requests as well as new window requests right away which can again be very vulerable

## Tech Stack

### Frontend

- **React** - Modern UI library for building interactive user interfaces
- **TypeScript** - Type-safe JavaScript for better development experience

### Backend

- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast and minimalist web framework
- **TypeScript** - Type-safe server-side development

Libraries:

- express-rate-limit - for simplest user initiated limiting technique

### Infrastructure

- **Docker** - Containerization for consistent development and deployment`
- **Docker Compose** - Multi-container orchestration for easy setup`

## Features

- **Fixed limit windows with server timing**: Server defined time windows for limiting
- **Fixed limit windows with user initiated timing**: User initiated time windows for limiting
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Containerized Environment**: Docker setup for easy development and deployment

## Quick Start

### Setup env variables

Two files:

- .env

Content:

```bash
# Server port
PORT=3000
# Server env
NODE_ENV=development
# Time window in which requests will be tracked
TIME_WINDOW=15000 # 15 seconds, set in miliseconds
# Number of reuqests per time window
REQUESTS_LIMIT=10
```

### Start application

```bash
docker compose up -d
```

### **Usage**

- ## Five modes:
