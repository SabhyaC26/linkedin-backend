# part 1 - build the code
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# part 2 -
FROM node as runner
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /usr/app/dist ./dist
COPY ormconfig.json .
COPY .env .
EXPOSE 8080
CMD node dist/index.js