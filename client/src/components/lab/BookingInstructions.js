import React from 'react';
import { Link } from 'react-router-dom';

const BookingInstructions = () => {
  return (
    <div className="govuk-grid-column-full">
      <span className="govuk-caption-xl">Booking instructions</span>
      <h1 className="govuk-heading-xl">Book the lab</h1>
      <p className="govuk-body">
        You can book the lab up to 10 weeks ahead. Teams that cancel lab days
        with less than 4 weeks’ notice may have their access to the lab
        restricted.
      </p>
      <p className="govuk-body">
        GDS teams have exclusive access to the labs on Tuesday, Wednesday, and
        Thursday. Teams from other government organisations have priority on
        Monday and Friday.
      </p>
      <p className="govuk-body">
        Only Civil Servants and Local Government employees are able to book the
        labs.
      </p>

      <p className="govuk-body">
        In order to use this service your will need to{' '}
        <Link to="/register-to-book-the-lab" className="govuk-link">
          register
        </Link>
        . During the registration you will need access to a mobile phone to
        complete two factor authentication.
      </p>
    </div>
  );
};

export default BookingInstructions;
