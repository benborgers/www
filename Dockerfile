# Copied from https://github.com/railwayapp/og-generator/blob/main/Dockerfile

FROM zenika/alpine-chrome:with-node

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

# Install deps
RUN npm install

# Bundle app source
COPY . .

# Build
RUN npm run postinstall
RUN npm run build

# Start
CMD [ "npm", "start" ]
