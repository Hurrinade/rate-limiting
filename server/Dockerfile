FROM node:22-alpine

# Set working directory
WORKDIR /app/server

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies including dev dependencies
RUN pnpm install

COPY . .