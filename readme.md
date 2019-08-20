# Research Lab Booking Service

This is a prototype service for booking the GDS Research Labs.

The service uses Google's resource calendars to check availability as well as create an event.
The booking requests can be either AM, PM or a full day (AM + PM) slot. Requests can only be made 48hrs prior to the desired event.
A user will need to register to use the service and only government or local government users can register, although they can submit a booking request on behalf of an external user.

### Registration

Once a user registers (First name, last name, email, mobile phone & password) they will be sent a link to their email address which they will need to click on to verify their address. Once verifified they will be directed through the normal sign in process.

### Sign in

Users sign in with their email and password and then a security code is sent to their phone to complete sign in.

Sign in & register sessions can be set by an environment variable `USER_TOKEN_EXPIRES` and `REG_TOKEN_EXPIRES`

### User area

Once a user has signed in they are able to see the status their booking requests as well as cancel and future bookings.

### Research Lab booking

Once signed in a user is able to view availability and submit a booking request. **You can only view 2 months into the future**. This is a Google API limitation that only allows you to query 2 months worth of free/busy data.

## Technology Stack

The service is a traditonal client server application using `reactjs`, `nodejs` and `mongodb`. The service is using `graphql` in both client and server using the [Apollo](https://www.apollographql.com/) graphql library.
The prototype service is using [Docker](https://www.docker.com/) in both the development environment (for the server and databse) and for the build/dist environment.
During development the `client` can be run in it's own process (`yarn start`)
The application (server) uses an environment variable file `server.env` that will need to be created.
The application (server) also uses a `keys` folder to store a `*.pem` file for Google access as well as RSA private and public keys for encrypting the `jwt`. You will need to create your own keys (or use environment variables).
Client access is controlled via a `jwt` stored in the browser `localStorage`.
Initial emails (for registration verification) and texts (security codes) are using the [GDS Notify api](https://www.notifications.service.gov.uk).
