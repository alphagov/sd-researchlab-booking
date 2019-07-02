import { useState } from 'react';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    console.log(values);
  };

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    event.persist();
    setValues({
      ...values,
      [name]: value
    });
  };

  return [values, handleSubmit, handleChange];
};
