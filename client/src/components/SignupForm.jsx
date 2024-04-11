import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
	const [userFormData, setUserFormData] = useState({
		username: '',
		email: '',
		password: ''
	}); // state for user form data
	const [validated, setValidated] = useState(false); // set state for form validation
	const [showAlert, setShowAlert] = useState(false); // set state for alert
	const [alertMessage, setAlertMessage] = useState('');
	const [addUser, { error }] = useMutation(ADD_USER); // mutation hook for creating new user

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.stopPropagation();
			setValidated(true); // trigger validation feedback
			return; // stop the form submission if validation fails
		}

		try {
			const { data } = await addUser({
				variables: { ...userFormData }
			});

			if (data.addUser.token) {
				Auth.login(data.addUser.token);
			} else {
				throw new Error('Signup failed, no token received');
			}
		} catch (err) {
			console.error('Signup error:', err);
			setShowAlert(true);
			setAlertMessage(
				err.message || 'An error occurred. Please try again.'
			);
		}

		setUserFormData({ username: '', email: '', password: '' });
		setValidated(false); // reset validation state
	};

	return (
		<>
			<Form noValidate validated={validated} onSubmit={handleFormSubmit}>
				<Alert
					dismissible
					onClose={() => setShowAlert(false)}
					show={showAlert}
					variant='danger'
				>
					{alertMessage} {/* display dynamic alert message */}
				</Alert>

				<Form.Group className='mb-3 form-group'>
					<Form.Label htmlFor='username'>Username</Form.Label>
					<Form.Control
						type='text'
						placeholder='Your username'
						name='username'
						className='form-input'
						onChange={handleInputChange}
						value={userFormData.username}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Username is required!
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className='mb-3 form-group'>
					<Form.Label htmlFor='email'>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='Your email address'
						name='email'
						className='form-input'
						onChange={handleInputChange}
						value={userFormData.email}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Email is required!
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className='mb-3 form-group'>
					<Form.Label htmlFor='password'>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Your password'
						name='password'
						className='form-input'
						onChange={handleInputChange}
						value={userFormData.password}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Password is required!
					</Form.Control.Feedback>
				</Form.Group>
				<Button
					type='submit'
					variant='success'
					className='submit-button'
				>
					Submit
				</Button>
			</Form>
			{error && <div>Sign up failed: {error.message}</div>}{' '}
			{/* Display mutation error */}
		</>
	);
};

export default SignupForm;
