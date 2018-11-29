## Research Lab Booking Service

This is a prototype booking service to scope out a more ideal way to book the Research Labs at GDS.

It is by intention deliberately lean without much testing in order to prototype as quickly as possible.
Once an ideal technology stack has been implemented the code will be refactored to include testing.

Part of the ambition is to allow any Government Dept to be able to use the service to book time in the GDS research facilities.
This will require some form of user registration as well as verifying the email (and to check the domain of the email).
It is envisaged that it will follow a tried and tested method similar to Notify:

1. [ ] User registers name, email address & mobile number
2. [ ] Link is sent to users email address redirecting to 2FA page.
3. [ ] User is sent a text with a code.
4. [ ] User enters code.
5. [ ] Verification complete.

The booking process will be very simple. The Lab calendars will be displayed (Free/Busy only) and a simple date/time picker and a notes section.
Once the user has submitted the booking it will be displayed as a tentative booking until such time as (by whoever will manage the process) has confirmed the booking. Initially the confirmation can be done (as it will be GDS) through the Google Calendar itself.

All notifications will be either through Google itself (initially) and/or Notify.
