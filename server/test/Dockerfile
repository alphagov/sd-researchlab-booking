FROM sd-researchlab-booking_booking_server
RUN npm install -g mocha
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# COPY package.json /usr/src/app
ENV NODE_ENV dev
# RUN npm install
EXPOSE 4060
CMD ["mocha", "test/test.js"]
