import { merge } from 'lodash';

import Calendar from './calendar';
import Auth from './auth';

const resolvers = merge(Calendar, Auth);

export default resolvers;
