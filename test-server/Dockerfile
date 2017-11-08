FROM node:6-alpine

# Create server working directory
RUN mkdir -p /home/node/test
WORKDIR /home/node/test

# Install app dependencies
COPY /test-server/package.json /home/node/test
RUN npm install

# Bundle test source
COPY /test-server/test.js /home/node/test

EXPOSE 9000

CMD ["npm", "start"]
