import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const RegistrationForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Destructure the values to exclude confirmPassword
    const { name, email, password } = values;
    const user = { name, email, password };

    axios.post('http://localhost:5000/api/auth/register', user)
      .then(response => {
        console.log('Registration successful:', response.data);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        setSubmitting(false);
        
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Registration error:', error);
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required')
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="p-4 border rounded">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field name="confirmPassword" type="password" className="form-control" />
            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
          </div>
          <Button type="submit" disabled={isSubmitting} variant="primary">
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
