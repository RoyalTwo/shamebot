FROM node:lts-alpine

ARG COUNTING_CHANNEL
ARG MESSAGE_CHANNEL
ARG BOT_TOKEN

ENV COUNTING_CHANNEL=$COUNTING_CHANNEL
ENV MESSAGE_CHANNEL=$MESSAGE_CHANNEL
ENV BOT_TOKEN=$BOT_TOKEN
ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN chown -R node /usr/src/app
USER node
CMD ["node", "main.js"]
