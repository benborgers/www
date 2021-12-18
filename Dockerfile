# Copied from https://github.com/railwayapp/og-generator/blob/main/Dockerfile

FROM zenika/alpine-chrome:with-node

ARG NODE_ENV
ARG REDIS_URL
ARG PORT
ARG JUMBOCASH_PASSWORD

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

# Install deps
RUN npm install

# Bundle app source
COPY . .

# Build
RUN npm run build
RUN npm run postinstall

# Start
CMD [ "npm", "start" ]
