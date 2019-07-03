import { useState } from 'react';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  // const handleSubmit = (event) => {
  //   if (event) event.preventDefault();
  //   console.log(values);
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    event.persist();

    if (value.length === 0) {
      setValues({
        ...values,
        [name]: {
          value,
          valid: false
        }
      });
    } else {
      setValues({
        ...values,
        [name]: {
          value,
          valid: true
        }
      });
    }
  };

  return [values, handleChange];
};
