import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useMutation } from 'react-apollo-hooks';
import { navigate } from '@reach/router';

import Error from '../../containers/Error';

import { REGISTER_USER } from '../../queries';
import Spinner from '../shared/Spinner';

const initialState = {
  firstName: { value: '', valid: true, reason: '' },
  lastName: { value: '', valid: true, reason: '' },
  email: { value: '', valid: true, reason: '' },
  mobilePhone: { value: '', valid: true, reason: '' },
  password: { value: '', valid: true, reason: '' }
};

const initialErrorState = {
  status: false,
  error: ''
};

const RegisterForm = () => {
  const [values, validateInputs, handleChange] = useForm(initialState);
  const [addNewUser, { loading }] = useMutation(REGISTER_USER);
  const [regState, setRegState] = useState({
    loading: false,
    registered: false
  });
  const [errorState, setErrorState] = useState(initialErrorState);

  const handleSubmit = (event) => {
    event.preventDefault();

    // need to add validation here
    // check it is only gov.uk email addresses etc.......

    // if all works out ok then register
    registerNewLabUser(values);
  };

  const registerNewLabUser = async (user) => {
    const { firstName, lastName, email, mobilePhone, password } = user;

    setRegState({
      ...regState,
      loading: true
    });

    let regResult;

    try {
      regResult = await addNewUser({
        variables: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
          mobilePhone: mobilePhone.value
        }
      });
    } catch (error) {
      console.log(error);
      setErrorState({ status: true, error });
      setRegState({
        registered: true,
        loading: false
      });
      return;
    }

    const { registerNewUser } = regResult.data;

    if (!registerNewUser.success) {
      setErrorState({
        status: true,
        error: { message: 'Unable to register user' }
      });
      setRegState({
        registered: false,
        loading: false
      });
      return;
    }

    // save token to localstorage
    localStorage.setItem('labtoken', registerNewUser.token);

    // navigate to the confirmation page
    navigate(`/register/confirm/${registerNewUser.user.id}`);
  };

  return (
    <>
      <div className="govuk-grid-column-two-thirds">
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h2 className="govuk-fieldset__heading">Enter your details</h2>
          </legend>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div
              className={`govuk-form-group ${!values.firstName.valid &&
                `govuk-form-group--error`}`}
            >
              <label htmlFor="firstName" className="govuk-label">
                First name
              </label>
              {!values.firstName.valid && (
                <span id="event-name-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Enter
                  your first name
                </span>
              )}
              <input
                type="text"
                className={`govuk-input govuk-!-width-two-thirds ${!values
                  .firstName.valid && `govuk-input--error`}`}
                name="firstName"
                id="firstName"
                onChange={handleChange}
                value={values.firstName.value}
              />
            </div>
            <div
              className={`govuk-form-group ${!values.lastName.valid &&
                `govuk-form-group--error`}`}
            >
              <label htmlFor="lastName" className="govuk-label">
                Last name
              </label>
              {!values.lastName.valid && (
                <span id="event-name-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Enter
                  your last name
                </span>
              )}
              <input
                type="text"
                className={`govuk-input govuk-!-width-two-thirds ${!values
                  .lastName.valid && `govuk-input--error`}`}
                name="lastName"
                id="lastName"
                onChange={handleChange}
                value={values.lastName.value}
              />
            </div>
            <div
              className={`govuk-form-group ${!values.email.valid &&
                `govuk-form-group--error`}`}
            >
              <label htmlFor="email" className="govuk-label">
                Email address
              </label>
              <span id="email-hint" className="govuk-hint">
                This must be a Government or Local Government address.
              </span>
              {!values.email.valid && (
                <span id="event-name-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Enter
                  your email address
                </span>
              )}
              <input
                type="email"
                className={`govuk-input ${!values.email.valid &&
                  `govuk-input--error`}`}
                name="email"
                id="email"
                onChange={handleChange}
                value={values.email.value}
              />
            </div>
            <div
              className={`govuk-form-group ${!values.mobilePhone.valid &&
                `govuk-form-group--error`}`}
            >
              <label htmlFor="mobilePhone" className="govuk-label">
                Mobile phone number
              </label>
              {!values.mobilePhone.valid && (
                <span id="event-name-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Enter
                  your mobile phone number
                </span>
              )}
              <input
                type="tel"
                className={`govuk-input govuk-!-width-two-thirds ${!values
                  .mobilePhone.valid && `govuk-input--error`}`}
                name="mobilePhone"
                id="mobilePhone"
                onChange={handleChange}
                value={values.mobilePhone.value}
                autoComplete="tel"
              />
            </div>
            <div
              className={`govuk-form-group ${!values.password.valid &&
                `govuk-form-group--error`}`}
            >
              <label htmlFor="password" className="govuk-label">
                Password
              </label>
              <span id="password-hint" className="govuk-hint">
                Your password must be a least 10 characters in length
              </span>
              {!values.password.valid && (
                <span id="event-name-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span>
                  {values.password.reason
                    ? values.password.reason
                    : `Enter a
                password`}
                </span>
              )}
              <input
                type="password"
                className={`govuk-input govuk-!-width-two-thirds ${!values
                  .password.valid && `govuk-input--error`}`}
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={validateInputs}
                value={values.password.value}
              />
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="govuk-button"
                disabled={regState.registered}
              >
                Save and continue
              </button>
            )}
          </form>
        </fieldset>
        {errorState.status && (
          <div className="govuk-grid column-full">
            <Error error={errorState.error} />
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterForm;
