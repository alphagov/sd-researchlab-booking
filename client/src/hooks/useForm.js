import { useState } from 'react';

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
    const { name, value } = event.target;
    event.persist();

    // check length of the value
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
  };

  return [values, validateInputs, handleChange];
};

const checkLength = (value) => {
  if (value.length > 0) {
    return true;
  }
  return false;
};
