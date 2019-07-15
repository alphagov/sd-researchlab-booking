import React from 'react';
import { useForm } from '../../hooks/useForm';

const initialState = {
  moreDetail: { value: '', valid: true, reason: '' }
};

const BookingFormDetails = ({ history }) => {
  const [values, validateInputs, handleChange] = useForm(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    // if everything works ok move to next part of form with
    // summary of booking
    // history.push('/book-a-research-lab/booking-details');
  };
  return (
    <div className="govuk-grid-row">
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
                    Can you provide some detail?
                  </label>
                  <span id="more-detail-hint" className="govuk-hint">
                    Do not include personal information.
                  </span>
                  <textarea
                    className="govuk-textarea"
                    id="more-detail"
                    name="moreDetail"
                    rows="5"
                    aria-describedby="more-detail-hint"
                    onChange={handleChange}
                    value={values.moreDetail.value}
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
    </div>
  );
};

export default BookingFormDetails;
