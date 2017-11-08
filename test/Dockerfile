FROM node:6-alpine

# Create server working directory
RUN mkdir /test
WORKDIR /test

# Install app dependencies
COPY package.json /test
RUN npm install

# Bundle test source
COPY . /test

EXPOSE 9000
