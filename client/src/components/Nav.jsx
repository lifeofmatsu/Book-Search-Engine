import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Modal, Tab, Nav, Image, Form, Button } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
	// State for showing the signup modal
	const [showSignupModal, setShowSignupModal] = useState(false);

	// State for showing the login modal
	const [showLoginModal, setShowLoginModal] = useState(false);

	const closeLoginModal = () => setShowLoginModal(false);

	return (
		<>
			<Navbar className='nav-container'>
				<div className='navbar-content'>
					<div id='title' className='page-title'>
						<Image
							src='/BookFinderLogo_recolored.svg'
							alt='BookFinder Logo'
							width='125px'
							className='logo-icon'
							fluid
						/>
						<Navbar.Brand as={Link} to='/'>
							<h1>BookFinder</h1>
							<h5>Powered by Google Books.</h5>
						</Navbar.Brand>
					</div>
					<div id='search-books-link' className='action-link'>
						<Nav.Link as={Link} to='/'>
							Search Books
						</Nav.Link>
					</div>
					{Auth.loggedIn() ? (
						<>
							<div
								id='view-saved-books-link'
								className='action-link'
							>
								<Nav.Link as={Link} to='/saved'>
									Saved Books
								</Nav.Link>
							</div>
							<div id='logout-link' className='action-link'>
								<Nav.Link onClick={Auth.logout}>
									Logout
								</Nav.Link>
							</div>
						</>
					) : (
						<>
							<div id='login-link' className='action-link'>
								<Nav.Link onClick={() => setShowLoginModal(true)}>
									Login
								</Nav.Link>
							</div>
							<div id='signup-link' className='action-link'>
								<Nav.Link onClick={() => setShowSignupModal(true)}>
									Create Account
								</Nav.Link>
							</div>
						</>
					)}
				</div>
			</Navbar>

			{/* Sign-Up Modal */}
			<Modal
				size='lg'
				centered
				show={showSignupModal}
				onHide={() => setShowSignupModal(false)}
				aria-labelledby='signup-modal'
				className='modal-signup-content'
			>
				<Tab.Container
					defaultActiveKey='signup'
					onSelect={(k) => setActiveKey(k)}
				>
					<Modal.Header closeButton className='modal-signup-header'>
						<Modal.Title id='signup-modal'>
							<Nav variant='pills'>
								<Nav.Item>
									<Nav.Link eventKey='signup'>
										Create Account
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body className='modal-signup-body'>
						<Tab.Content>
							<Tab.Pane eventKey='signup'>
								<SignUpForm handleModalClose={() => setShowSignupModal(false)}/>
							</Tab.Pane>
						</Tab.Content>
					</Modal.Body>
				</Tab.Container>
			</Modal>

			{/* Login Modal */}
			<Modal
				size='lg'
				centered
				show={showLoginModal}
				onHide={() => setShowLoginModal(false)}
				aria-labelledby='login-modal'
				className='modal-login-content'
			>
				<Tab.Container
					defaultActiveKey='login'
					onSelect={(k) => setActiveKey(k)}
				>
					<Modal.Header closeButton className='modal-login-header'>
						<Modal.Title id='login-modal'>
							<Nav variant='pills'>
								<Nav.Item>
									<Nav.Link eventKey='login'>
										Login
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body className='modal-login-body'>
						<Tab.Content>
							<Tab.Pane eventKey='login'>
								<LoginForm handleModalClose={() => setShowLoginModal(false)}/>
							</Tab.Pane>
						</Tab.Content>
					</Modal.Body>
				</Tab.Container>
			</Modal>
		</>
	);
};

export default AppNavbar;
