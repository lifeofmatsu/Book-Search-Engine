import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

// login form component for user authentication
const LoginForm = () => {
	const [userFormData, setUserFormData] = useState({
		email: '',
		password: ''
	});
	const [validated] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [login, { error }] = useMutation(LOGIN_USER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	// handle user login form submission
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		try {
			const { data } = await login({
				variables: { ...userFormData }
			});

			Auth.login(data.login.token);
		} catch (err) {
			console.error(err);
			setShowAlert(true);
		}

		setUserFormData({ username: '', email: '', password: '' });
	};

	// render login form
	return (
		<>
			<Form noValidate validated={validated} onSubmit={handleFormSubmit}>
				<Alert
					dismissible
					onClose={() => setShowAlert(false)}
					show={showAlert}
					variant='danger'
				>
					Something went wrong with your login credentials!
				</Alert>
				<Form.Group className='mb-3 form-group'>
					<Form.Label htmlFor='email'>Email</Form.Label>
					<Form.Control
						type='text'
						placeholder='Your email'
						name='email'
						className='form-input'
						onChange={handleInputChange}
						value={userFormData.email}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						An email is required!
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
						A password is required!
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
			{error && <div>Login failed</div>}
		</>
	);
};

export default LoginForm;
