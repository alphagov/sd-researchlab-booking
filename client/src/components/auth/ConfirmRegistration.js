import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { CONFIRM_REGISTRATION } from '../../queries';

const ConfirmRegistration = ({ userId, history }) => {
  return (
    <Mutation mutation={CONFIRM_REGISTRATION} variables={{ _id: userId }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading information...........</div>;
        if (error) return <div>Ooops! {error}</div>;
        // const { ok, _id } = data.confirmRegistration;
        console.log(data);

        // if (ok) {
        //   return (
        //     <Fragment>
        //       <button
        //         className="button-primary"
        //         onClick={() => history.push(`/login/2fa/${_id}`)}
        //       >
        //         Complete login
        //       </button>
        //     </Fragment>
        //   );
        // }
      }}
    </Mutation>
  );
};

export default withRouter(ConfirmRegistration);
