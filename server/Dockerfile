FROM node:latest
LABEL maintainer="adrian.durran@digital.cabinet-office.gov.uk"
RUN npm install -g nodemon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
EXPOSE 4050
CMD ["npm", "start"]
