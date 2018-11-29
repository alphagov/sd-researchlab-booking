FROM node:11.3.0
LABEL maintainer="adrian.durran@digital.cabinet-office.gov.uk"
RUN npm install -g nodemon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
EXPOSE 3050
CMD ["nodemon", "index.js"]
