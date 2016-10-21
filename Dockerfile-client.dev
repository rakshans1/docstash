FROM node:latest

EXPOSE 3000
WORKDIR /app


# add package.json and  run npm install before adding rest of the files
ADD ./client/package.json /app
RUN npm install