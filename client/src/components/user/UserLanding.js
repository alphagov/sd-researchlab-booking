import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { GET_BOOKED_EVENTS_BY_USER } from '../../queries';

import Spinner from '../shared/Spinner';
import Error from '../../containers/Error';

const UserLanding = () => {
  const { data, loading, error } = useQuery(GET_BOOKED_EVENTS_BY_USER);

  console.log(data);

  return <div>User Landing Page</div>;
};

export default UserLanding;