import React, { Component } from 'react';
import moment from 'moment';
// import styles from './EventBooking.module.css';

class EventBooking extends Component {
  state = {
    yesterday: null,
    defaultDate: null
  };

  componentDidMount() {
    this.getDefaultDate();
    this.getYesterday();
  }

  getDefaultDate = () => {
    const defaultDate = moment()
      .minute(Math.floor(moment().minute() / 15) * 15)
      .second(0)
      .add(2, 'hours');

    this.setState({ defaultDate: defaultDate.toDate() });
  };

  getYesterday = () => {
    const yesterday = moment().subtract(1, 'day');
    this.setState({ yesterday: yesterday.toDate() });
  };

  isValid = (current) => {
    return current.isAfter(this.state.yesterday);
  };

  render() {
    const { defaultDate } = this.state;

    return (
      <div className={styles.eventBookingWrapper}>
        <h2>Book a Research Lab</h2>
        <form>
          <div className={styles.bookingForm}>
            <div className={styles.eventTitle}>
              <div className={styles.bookingGrid}>
                <label htmlFor="bookingTitle">Event Title</label>
                <input type="text" name="bookingTitle" />
              </div>
            </div>
            <div className={styles.eventTitle}>
              <div className={styles.bookingGrid}>
                <label htmlFor="bookingDesc">Event Description</label>
                <input type="text" name="bookingDesc" />
              </div>
            </div>

            <div className={styles.bookingGrid}>
              <label htmlFor="bookingDate">Select date</label>
              <input
                type="date"
                name="bookingDate"
                defaultValue={defaultDate}
              />
            </div>
            <div className={styles.bookingGrid}>
              <label htmlFor="bookingTime">Select Time</label>
              <input type="time" defaultValue={moment(defaultDate, 'HH:mm')} />
              <label htmlFor="duration">Duration (hours)</label>
              <input type="number" name="duration" defaultValue={1} />
            </div>
            <div className={styles.bookingGrid}>
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" />
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" />
              <label htmlFor="email">Email</label>
              <input type="email" name="email" />
              <label htmlFor="maxAttendees">Number Attendees</label>
              <input type="number" name="maxAttendees" defaultValue={1} />
            </div>
            <button>Book</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EventBooking;
