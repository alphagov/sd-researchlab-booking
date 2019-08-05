import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Link, navigate } from '@reach/router';

import { ENTER_2FA_CODE } from '../../queries';
import { useForm } from '../../hooks/useForm';

import Error from '../../containers/Error';
import Spinner from '../shared/Spinner';

const initialState = {
  mfaCode: { value: '', valid: true, reason: '' }
};

const initialErrorState = {
  status: false,
  error: ''
};

const Login2FAForm = () => {
  const [values, validateInputs, handleChange] = useForm(initialState);
  const [errorState, setErrorState] = useState(initialErrorState);
  const [enterMFACode, { loading }] = useMutation(ENTER_2FA_CODE);
  const [codeAttempts, setCodeAttempts] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { mfaCode } = values;

    console.log(values);

    // if what is entered it not a number
    if (isNaN(mfaCode.value)) {
      setErrorState({
        status: true,
        error: { message: 'You must enter a number' }
      });
      return;
    }

    try {
      let checkCode = await enterMFACode({
        variables: { mfaCode: mfaCode.value }
      });

      const { enter2FACode } = checkCode.data;

      // if no success
      if (!enter2FACode.success) {
        switch (enter2FACode.reason) {
          case 'TokenNotPresent':
            setErrorState({
              status: true,
              error: { message: 'Unable to verify user' }
            });
            setTimeout(() => {
              navigate('/sign-in/email-password');
            }, 10000);
            break;
          case 'TokenExpiredError':
            setErrorState({
              status: true,
              error: { message: 'Your token has expired please sign in again' }
            });
            setTimeout(() => {
              navigate('/sign-in/email-password');
            }, 10000);
            break;
          case 'IncorrectMFACode':
            setCodeAttempts(codeAttempts + 1);
            if (codeAttempts > 3) {
              navigate('/sign-in/resend-code');
            }
            break;
          default:
            navigate('/sign-in/email-password');
            break;
        }
      }

      // if no user object redirect to register
    } catch (error) {
      console.log(error);
      setErrorState({
        status: true,
        error
      });
    }
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
              className={`govuk-form-group ${!values.mfaCode.valid &&
                `govuk-form-group--error`}`}
            >
              <label htmlFor="mfaCode" className="govuk-label">
                Text message code
              </label>

              {!values.mfaCode.valid && (
                <span id="event-name-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Enter
                  the text message code
                </span>
              )}
              <input
                type="number"
                className={`govuk-input govuk-input--width-5 ${!values.mfaCode
                  .valid && `govuk-input--error`}`}
                name="mfaCode"
                id="mfaCode"
                onChange={handleChange}
                value={values.mfaCode.value}
              />
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="govuk-button"
                disabled={values.mfaCode.value.length < 5}
              >
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
