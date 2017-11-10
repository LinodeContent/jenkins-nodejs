FROM node:6-alpine

# Create Reports directory
RUN mkdir -p /JUnit

# Create server working directory
RUN mkdir -p /test-unit
WORKDIR /test-unit

# Install app dependencies
COPY /test-server/package.json /test-unit
RUN npm install

# Bundle test source
COPY /test-server/test.js /test-unit

EXPOSE 9000

CMD ["npm", "start"]
