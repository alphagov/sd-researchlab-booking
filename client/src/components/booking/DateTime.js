import React, { Component } from 'react';
import moment from 'moment';
import styles from './DateTime.module.css';

class DateTime extends Component {
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
      <div className={styles.datetimeWrapper}>
        <h2>Select a Date and Time to Book a Research Lab</h2>
        <form className={styles.bookingForm}>
          <label htmlFor="bookingDate">Select date</label>
          <input type="date" name="bookingDate" defaultValue={defaultDate} />
          <label htmlFor="bookingTime">Select Time</label>
          <input type="time" defaultValue={moment(defaultDate, 'HH:mm')} />
          <label htmlFor="duration">Duration (hours)</label>
          <input type="number" name="duration" defaultValue={1} />
          <button>Book</button>
        </form>
      </div>
    );
  }
}

export default DateTime;
