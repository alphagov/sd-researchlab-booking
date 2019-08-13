FROM node:latest
LABEL maintainer="adrian.durran@digital.cabinet-office.gov.uk"
RUN yarn add global  nodemon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN yarn install
EXPOSE 4050
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
RUN chmod +x /wait
CMD /wait && yarn start
