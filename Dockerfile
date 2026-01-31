FROM node:20

# Downgrade npm to 9
RUN npm install -g npm@9

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN if [ "$NODE_ENV" = "development" ]; then \
      npm install --omit=optional; \
    else \
      npm install --omit=dev --omit=optional; \
    fi

# Copy rest of the source code
COPY . .

ENV PORT=3000
EXPOSE $PORT

CMD ["node", "index.js"]
