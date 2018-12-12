FROM node:alpine
ADD . /code
WORKDIR /code
RUN npm install
CMD npm run start