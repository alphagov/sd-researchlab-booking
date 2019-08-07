import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { navigate } from '@reach/router';
import { RESEND_2FA_CODE } from '../../queries';
import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';

const initialErrorState = {
  status: false,
  error: ''
};

const SignIn2FAResend = () => {
  const [resendMFA, { loading }] = useLazyQuery(RESEND_2FA_CODE);
  const [errorState, setErrorState] = useState(initialErrorState);

  const resendMFACode = async () => {
    // resend the code....

    try {
      const newMFA = await resendMFA();

      const { resend2FACode } = newMFA.data;

      if (!resend2FACode.success) {
        console.log(resend2FACode.reason);
        setErrorState({ status: true, error: resend2FACode.reason });
        return;
      }

      // if successful then navigate back to enter code
      navigate('/sign-in/2fa');
    } catch (error) {
      console.log(error);
      setErrorState({ status: true, error });
      return;
    }
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h2 className="govuk-heading-l">Resend security code</h2>
            <p className="govuk-body">
              Text messages sometimes take a few minutes to arrive. If you do
              not receive the text message, you can resend it.
            </p>
            <p className="govuk-body">
              If you no longer have access to the phone with the number you
              registered for this service, speak to your service manager to
              reset the number.
            </p>
          </legend>
          {loading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="govuk-button"
              onClick={resendMFACode}
            >
              Resend security code
            </button>
          )}
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

export default SignIn2FAResend;
