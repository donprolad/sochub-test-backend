FROM node:20

WORKDIR /sochub-test-backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
