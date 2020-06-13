FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8443
CMD [ "node", "server.js" ]
