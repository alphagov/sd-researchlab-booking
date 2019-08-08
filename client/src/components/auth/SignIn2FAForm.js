import React, { useState, useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { Link, navigate } from '@reach/router';

import { ENTER_2FA_CODE } from '../../queries';
import { useForm } from '../../hooks/useForm';
import { checkUser } from '../../utils/authUtils';

import Error from '../../containers/Error';
import Spinner from '../shared/Spinner';

import { UserContext } from '../../contexts/UserContext';

const initialState = {
  mfaCode: { value: '', valid: true, reason: '' }
};

const Login2FAForm = () => {
  const [values, validateInputs, handleChange] = useForm(initialState);
  const [errorState, setErrorState] = useState(null);
  const [userValues, setUserValues] = useContext(UserContext);
  const [enterMFACode, { data, loading }] = useLazyQuery(ENTER_2FA_CODE);
  const [isUser, setIsUser] = useState(null);

  // this isn't really working here either
  // but it is the best I can do
  useEffect(() => {
    if (data && data.enter2FACode) {
      setIsUser(data.enter2FACode);
    }
  }, [data, isUser, errorState]);

  useEffect(() => {
    if (isUser) {
      setErrorState(checkUser(isUser));
    }
  }, [isUser]);

  if (errorState && errorState.error.status && errorState.navigate) {
    setTimeout(() => {
      navigate(errorState.navigate.url);
    }, 6000);
  }

  if (errorState && !errorState.error.status) {
    // need to update a user context here.....so pull more information from the query
    setUserValues({
      isLoggedIn: true,
      id: isUser.user.id,
      firstName: isUser.user.firstName,
      lastName: isUser.user.lastName
    });
    // if everything is ok navigate to user area
    navigate('/user/user-home');
  }

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
          <form>
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
                onClick={() =>
                  enterMFACode({
                    variables: { mfaCode: parseInt(values.mfaCode.value) }
                  })
                }
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
        {errorState && errorState.error.status && (
          <div className="govuk-grid column-full">
            <Error error={errorState.error} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login2FAForm;
