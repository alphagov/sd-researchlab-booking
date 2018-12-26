import { mergeSchemas } from 'graphql-tools';

import userDefs from './userDefs';
import resourceCalendarDefs from './resourceCalendarDefs';

const typeDefs = resourceCalendarDefs;

export default typeDefs;
