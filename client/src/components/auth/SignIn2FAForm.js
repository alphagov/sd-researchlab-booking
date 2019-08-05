import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Link, navigate } from '@reach/router';

import { ENTER_2FA_CODE } from '../../queries';
import { useForm } from '../../hooks/useForm';

import Error from '../../containers/Error';
import Spinner from '../shared/Spinner';

const initialState = {
  mfacode: { value: '', valid: true, reason: '' }
};

const initialErrorState = {
  status: false,
  error: ''
};

const Login2FAForm = () => {
  const [values, validateInputs, handleChange] = useForm(initialState);
  const [errorState, setErrorState] = useState(initialErrorState);
  const [enterMFACode, { loading }] = useMutation(ENTER_2FA_CODE);

  // clearState = () => {
  //   this.setState({ ...initialState });
  // };

  // handleChange = (event) => {
  //   const { name, value } = event.target;
  //   this.setState({ [name]: value });
  // };

  // validateForm = () => {
  //   const { mfaCode } = this.state;
  //   const isInValid = !mfaCode || mfaCode.length < 5;
  //   return isInValid;
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    // enter2FACode()
    //   .then(async ({ data }) => {
    //     const { ok, _id } = data.enter2FACode;
    //     if (ok) {
    //       console.log(_id);
    //       // if ok then redirect to calendar page
    //     } else {
    //       console.log('not ok');
    //     }
    //   })
    //   .catch((error) => console.log(error));
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h2 className="govuk-heading-l">Check your phone</h2>
            <p className="govuk-body">
              We’ve sent you a text message with a security code.
            </p>
          </legend>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div
              className={`govuk-form-group ${!values.mfacode.valid &&
                `govuk-form-group--error`}`}
            >
              <label htmlFor="mfacode" className="govuk-label">
                Text message code
              </label>

              {!values.mfacode.valid && (
                <span id="event-name-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Enter
                  the text message code
                </span>
              )}
              <input
                type="number"
                className={`govuk-input govuk-input--width-5 ${!values.mfacode
                  .valid && `govuk-input--error`}`}
                name="mfacode"
                id="mfacode"
                onChange={handleChange}
                value={values.mfacode.value}
              />
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <button type="submit" className="govuk-button">
                Continue
              </button>
            )}
          </form>
        </fieldset>
        <Link className="govuk-link" to="/sign-in/resend-code">
          Not received a text message?
        </Link>
        {errorState.status && (
          <div className="govuk-grid column-full">
            <Error error={errorState.error} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login2FAForm;
