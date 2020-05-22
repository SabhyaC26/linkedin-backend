FROM node

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Build code (TS --> JS)
RUN npm run build

# Copy important files over to dist
COPY ormconfig.json ./dist
COPY .env ./dist

# Change working directory
WORKDIR ./dist

EXPOSE 8080
CMD node index.js