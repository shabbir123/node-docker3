FROM node:20

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Declare build argument (default: development)
ARG NODE_ENV

# Install dependencies conditionally
RUN if [ "$NODE_ENV" = "development" ]; then \
      npm ci; \
    else \
      npm ci --only=production; \
    fi

# Copy remaining source code
COPY . .

# Set environment variable and expose port
ENV PORT=3000
EXPOSE $PORT

# Start the app
CMD ["node", "index.js"]
