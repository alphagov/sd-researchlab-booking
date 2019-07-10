import { useState } from 'react';
import { checkDay, checkMonth, checkYear } from '../utils/dateUtils';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const validateInputs = (event) => {
    const { name, value } = event.target;
    event.persist();

    // check password length
    if (name === 'password' && checkLength(value) && value.length < 10) {
      console.log('Yeah it is a password', value.length);
      setValues({
        ...values,
        [name]: {
          value,
          valid: false,
          reason: 'Password must be at least 10 characters.'
        }
      });
    }

    // check it is a gov.uk email address
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    event.persist();

    console.log(event.target.type);

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
        }

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
