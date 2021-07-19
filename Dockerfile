FROM node:14.17.3

WORKDIR /frontend

COPY . /frontend

EXPOSE 3000

RUN npm install

CMD npm start