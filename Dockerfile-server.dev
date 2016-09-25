FROM mhart/alpine-node:5.6.0

EXPOSE 3001
WORKDIR /app
ENV NODE_ENV development

# add package.json and  run npm install before adding rest of the files
ADD ./server/package.json /app
RUN npm install