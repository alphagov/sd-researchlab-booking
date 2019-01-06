import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { ApolloConsumer } from 'react-apollo';
import { GET_CALENDAR_FREE_BUSY } from '../../queries';

import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import styles from './ResearchLabCalendar.module.css';

const localizer = BigCalendar.momentLocalizer(moment);

class ResearchLabCalendar extends Component {
  constructor({ calendar }) {
    super();
    this.state = {
      minStart: moment()
        .startOf('day')
        .add(7, 'hours')
        .toDate(),
      maxEnd: moment()
        .endOf('day')
        .subtract(5, 'hours')
        .toDate(),
      maxDate: moment()
        .add(1, 'months')
        .endOf('month'),
      calendar: calendar,
      freeBusy: calendar.freeBusy
    };
  }

  checkDates(e) {
    const { maxDate } = this.state;
    console.log(maxDate);
    console.log(e);
    if (
      moment(e)
        .endOf('month')
        .isAfter(maxDate)
    ) {
      return true;
      // start: maxdate +1 (startofday) end: e (endofday)
      // get the new freebusy array and concenate state free busy array and set state
    }
    return false;
  }

  updateFreeBusy(busy, end) {
    const { freeBusy } = this.state;
    this.setState({ maxDate: end });
    const newFreeBusy = [...freeBusy, ...busy];
    this.setState({ freeBusy: newFreeBusy });
  }

  render() {
    const { maxEnd, minStart, maxDate, freeBusy } = this.state;
    const {
      resourceName,
      floorName,
      building,
      resourceEmail
    } = this.state.calendar;
    const calEvents = freeBusy.map((f) => {
      return {
        title: f.title,
        start: moment(f.start).toDate(),
        end: moment(f.end).toDate()
      };
    });

    return (
      <ApolloConsumer>
        {(client) => (
          <div className={styles.container}>
            <h5>
              {resourceName} - floor {floorName} {building.buildingName}
            </h5>
            <BigCalendar
              views={{ month: true, week: true, day: true }}
              localizer={localizer}
              min={minStart}
              max={maxEnd}
              events={calEvents}
              style={{ height: '400px' }}
              onNavigate={async (e) => {
                if (this.checkDates(e)) {
                  const start = moment(maxDate).startOf('day');
                  const end = moment(e).endOf('month');
                  const { data } = await client.query({
                    query: GET_CALENDAR_FREE_BUSY,
                    variables: {
                      start,
                      end,
                      items: [resourceEmail]
                    }
                  });
                  const { busy } = data.getCalendarFreeBusyList.calendars[0];
                  this.updateFreeBusy(busy, end);
                }
              }}
            />
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default ResearchLabCalendar;
