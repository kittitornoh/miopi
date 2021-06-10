import * as yup from 'yup';

export const userRegistrationValidationSchema = yup.object().shape({
  first_name: yup.string().required('First name is required.'),
  last_name: yup.string().required('Last name is required.'),
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: yup.string().required('Password is required.'),
});
