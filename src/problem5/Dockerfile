# Stage 1: Build the app
FROM node:18-slim AS builder

# Set working directory
WORKDIR /app

# Install build essentials and Python
RUN apt-get update && apt-get install -y build-essential python3

# Install node-pre-gyp globally
RUN npm install -g node-pre-gyp

# Clear npm cache
RUN npm cache clean --force

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Run the app
FROM node:18-slim AS runner

# Install necessary utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    adduser \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user and group explicitly
RUN groupadd -g 1001 nodejs \
    && useradd -u 1001 -g nodejs -s /bin/sh -m nextjs

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./

# Reinstall only production dependencies to ensure correct binaries
RUN npm ci --only=production

# Expose the necessary port
EXPOSE 5555

# Run the application as a non-root user
USER nextjs

# Command to run the application
CMD ["node", "dist/server.js"]
