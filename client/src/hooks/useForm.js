import { useState } from 'react';
import dateFns from 'date-fns';
import {
  checkDay,
  checkMonth,
  checkYear,
  dateIsNot48,
  dateIsMoreThan10Weeks,
  dateIsWeekend
} from '../utils/dateUtils';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const validateInputs = (name, obj) => {
    let value = '';
    let valid = false;
    let reason = '';

    const {
      bookAMPM,
      bookDate,
      firstName,
      lastName,
      email,
      bookingDetail
    } = values;

    switch (name) {
      case 'bookDate':
        if (dateIsNot48(obj.value)) {
          value = dateFns.format(new Date());
          valid = false;
          reason = 'You can only book 48hrs in advance';
        } else if (dateIsMoreThan10Weeks(obj.value)) {
          value = dateFns.format(new Date());
          valid = false;
          reason = 'You cannot book more than 10 weeks in advance';
        } else if (dateIsWeekend(obj.value)) {
          value = obj.value;
          valid = false;
          reason = 'You cannot book the research lab on a weekend';
        } else {
          value = obj.value;
          valid = true;
          reason = '';
        }

        bookDate.reason = reason;
        bookDate.valid = valid;
        bookDate.value = value;

        setValues({
          ...values,
          bookDate
        });

        break;

      case 'bookAMPM':
        let falseCount = 0;
        for (let key in obj) {
          if (!obj[key].value) falseCount += 1;
        }
        // console.log(falseCount);
        if (falseCount === 2) {
          bookAMPM.reason = 'You must select either AM or PM or both';
          bookAMPM.valid = false;
          bookAMPM.value = false;
        } else {
          bookAMPM.reason = '';
          bookAMPM.valid = true;
          bookAMPM.value = true;
        }

        setValues({
          ...values,
          bookAMPM
        });
        break;

      case 'firstName':
        // console.log(obj);
        if (!checkLength(obj.value)) {
          firstName.value = '';
          firstName.valid = false;
          firstName.reason = 'You must enter a first name';
        } else {
          firstName.value = obj.value;
          firstName.valid = true;
          firstName.reason = '';
        }
        setValues({
          ...values,
          firstName
        });
        break;

      case 'lastName':
        if (!checkLength(obj.value)) {
          lastName.value = '';
          lastName.valid = false;
          lastName.reason = 'You must enter a last name';
        } else {
          lastName.value = obj.value;
          lastName.valid = true;
          lastName.reason = '';
        }
        setValues({
          ...values,
          lastName
        });
        break;

      case 'email':
        // need to do more checking on email
        if (!checkLength(obj.value)) {
          email.value = '';
          email.valid = false;
          email.reason = 'You must enter a valid email address';
        } else {
          email.value = obj.value;
          email.valid = true;
          email.reason = '';
        }
        setValues({
          ...values,
          email
        });
        break;

      case 'bookingDetail':
        if (!checkLength(obj.value)) {
          bookingDetail.value = '';
          bookingDetail.valid = false;
          bookingDetail.reason =
            'Please enter some details about the research session';
        } else {
          bookingDetail.value = obj.value;
          bookingDetail.valid = true;
          bookingDetail.reason = '';
        }
        setValues({
          ...values,
          bookingDetail
        });
        break;

      case 'bookingSlots':
        bookDate.reason = obj.reason;
        bookDate.valid = obj.valid;
        bookDate.value = obj.value;

        setValues({
          ...values,
          bookDate
        });
        break;

      default:
        break;
    }

    // check password length
    // if (name === 'password' && checkLength(value) && value.length < 10) {
    //   console.log('Yeah it is a password', value.length);
    //   setValues({
    //     ...values,
    //     [name]: {
    //       value,
    //       valid: false,
    //       reason: 'Password must be at least 10 characters.'
    //     }
    //   });
    // }

    // check it is a gov.uk email address
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    event.persist();

    // console.log(event.target.type);

    switch (type) {
      case 'checkbox':
        setValues({
          ...values,
          [name]: {
            value: event.target.checked,
            valid: true,
            reason: ''
          }
        });

        break;

      case 'number':
        if (name === 'bookDay') {
          setValues({
            ...values,
            [name]: {
              value,
              valid: checkDay(value),
              reason: ''
            }
          });
        }
        if (name === 'bookMonth') {
          setValues({
            ...values,
            [name]: {
              value,
              valid: checkMonth(value),
              reason: ''
            }
          });
        }
        if (name === 'bookYear') {
          setValues({
            ...values,
            [name]: {
              value,
              valid: checkYear(value),
              reason: ''
            }
          });
          if (name === 'bookingAttend') {
            console.log(value);
            setValues({
              ...values,
              [name]: {
                value,
                valid: true,
                reason: ''
              }
            });
          }
        }

        break;

      case 'text':
        if (name === 'firstName' || name === 'lastName') {
          setValues({
            ...values,
            [name]: {
              value,
              valid: checkLength(value),
              reason: ''
            }
          });
        }

        break;

      case 'email':
        setValues({
          ...values,
          [name]: {
            value,
            valid: checkLength(value),
            reason: ''
          }
        });

        break;

      case 'bookingDetail':
        setValues({
          ...values,
          [name]: {
            value,
            valid: checkLength(value),
            reason: ''
          }
        });

        break;

      default:
        if (!checkLength(value)) {
          setValues({
            ...values,
            [name]: {
              value,
              valid: false,
              reason: ''
            }
          });
        } else {
          setValues({
            ...values,
            [name]: {
              value,
              valid: true,
              reason: ''
            }
          });
        }
        break;
    }
  };

  return [values, validateInputs, handleChange];
};

const checkLength = (value) => {
  if (value.length > 0) {
    return true;
  }
  return false;
};
