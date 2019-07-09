import React from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

const initialState = {
  moreDetail: { value: '', valid: true, reason: '' }
};

const BookingFormDetails = ({ history }) => {
  const [values, handleChange] = useForm(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    // if everything works ok move to next part of form with
    // summary of booking
    // history.push('/book-a-research-lab/booking-details');
  };
  return (
    <div className="govuk-grid-column-full">
      <div className="govuk-form-group">
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h2 className="govuk-fieldset__heading">
              Enter a brief description of the research session
            </h2>
          </legend>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div style={{ marginBottom: '2rem' }}>
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="moreDetail">
                  Can you provide more detail?
                </label>
                <span id="more-detail-hint" className="govuk-hint">
                  Do not include personal or financial information, like your
                  National Insurance number or credit card details.
                </span>
                <textarea
                  className="govuk-textarea"
                  id="more-detail"
                  name="moreDetail"
                  rows="5"
                  aria-describedby="more-detail-hint"
                />
              </div>
            </div>
            <button type="submit" className="govuk-button">
              Book the lab
            </button>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default withRouter(BookingFormDetails);
