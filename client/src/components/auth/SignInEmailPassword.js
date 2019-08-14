import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import { useApolloClient } from '@apollo/react-hooks';

import { useForm } from '../../hooks/useForm';

import Error from '../../containers/Error';
import Spinner from '../shared/Spinner';

import { USER_SIGN_IN } from '../../queries';

import styles from '../../css/Auth.module.css';

const initialState = {
  email: { value: '', valid: true, reason: '' },
  password: { value: '', valid: true, reason: '' }
};

const initialErrorState = {
  status: false,
  error: ''
};

const SignInEmailPassword = () => {
  const [values, validateInputs, handleChange] = useForm(initialState);
  const [errorState, setErrorState] = useState(initialErrorState);
  const client = useApolloClient();

  const { email, password } = values;

  let loading = false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // get the values

    loading = true;

    try {
      const { data } = await client.query({
        query: USER_SIGN_IN,
        variables: { email: email.value, password: password.value }
      });

      const { signInUser } = data;
      // if for some reason it failed
      if (!signInUser.success) {
        setErrorState({
          status: true,
          error: { message: 'Unable to sign in - Incorrect credentials' }
        });
        return;
      }

      // if the user is not valid (not completed registration)
      // navigate them back to the resend link
      if (!signInUser.user.isVerified) {
        setErrorState({
          status: true,
          error: {
            message:
              'You have not confirmed you registration. Unable to sign in'
          }
        });

        setTimeout(() => {
          navigate(`/register/confirm/${signInUser.user.id}`);
        }, 10000);
      }

      // if all is good set token and then navigate to 2fa
      await localStorage.setItem('labtoken', signInUser.token);
      navigate('/sign-in/2fa');
    } catch (error) {
      loading = false;
      console.log(error);
      setErrorState({
        status: true,
        error
      });
    }
  };

  return (
    <div className={`govuk-grid-row ${styles.fullHeight}`}>
      <div className="govuk-grid-column-two-thirds">
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h2 className="govuk-heading-l">Sign in</h2>
            <p className="govuk-body">
              If you do not have an account, you can{' '}
              <Link className="govuk-link" to="/register-to-book-the-lab">
                create one now
              </Link>
              .
            </p>
          </legend>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div
              className={`govuk-form-group ${!values.email.valid &&
                `govuk-form-group--error`}`}
            >
              <label htmlFor="email" className="govuk-label">
                Email address
              </label>

              {!values.email.valid && (
                <span id="event-name-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Enter
                  your email address
                </span>
              )}
              <input
                type="email"
                className={`govuk-input govuk-!-width-two-thirds ${!values.email
                  .valid && `govuk-input--error`}`}
                name="email"
                id="email"
                onChange={handleChange}
                value={values.email.value}
              />
            </div>
            <div
              className={`govuk-form-group ${!values.password.valid &&
                `govuk-form-group--error`}`}
            >
              <label htmlFor="password" className="govuk-label">
                Password
              </label>

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
              <button className="govuk-button" type="submit">
                Continue
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
    </div>
  );
};

export default SignInEmailPassword;
