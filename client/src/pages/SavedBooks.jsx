import { useState } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

const SavedBooks = () => {
	const { loading, data, error } = useQuery(GET_ME);
	const userData = data?.me || {};
	const [removeBook] = useMutation(REMOVE_BOOK);

	const [selectedBook, setSelectedBook] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const handleDeleteBook = async (bookId) => {
		if (!Auth.loggedIn()) {
			console.log('You must be logged in to remove books.');
			return false;
		}

		try {
			await removeBook({ variables: { bookId } });
			removeBookId(bookId);
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	};

	const handleCardClick = (book) => {
		setSelectedBook(book);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setSelectedBook(null);
		setShowModal(false);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>An error occurred: {error.message}</div>;

	return (
		<>
			<Container fluid className='save-container'>
				<div className='save-title'>
					<h2>My Saved Books</h2>
				</div>
				<div className='saved-books-grid'>
					<h3 className='save-subtitle'>
						{userData.savedBooks.length
							? `Viewing ${userData.savedBooks.length} saved ${
									userData.savedBooks.length === 1
										? 'book'
										: 'books'
							  }:`
							: '— You have no saved books! —'}
					</h3>
					{userData.savedBooks.map((book) => (
						<div
							className='book-card'
							key={book.bookId}
							onClick={() => handleCardClick(book)}
						>
							<Card className='card-item'>
								{book.image && (
									<Card.Img
										className='card-img-top'
										src={book.image}
										alt={`The cover for ${book.title}`}
										variant='top'
									/>
								)}
								<Card.Body className='card-body'>
									<Card.Title className='book-title'>
										{book.title}
									</Card.Title>
									<p className='authors'>
										{book.authors.join(', ')}
									</p>
									<div className='card-text'>
										{book.description}
										<br></br>
										<br></br>
										{book.link && (
											<div className='book-link'>
												Google Books Link:{' '}
												<a
													href={book.link}
													target='_blank'
													rel='noopener noreferrer'
												>
													{book.title}
												</a>
											</div>
										)}
									</div>

									<Button
										className='remove-book-button'
										onClick={(event) => {
											event.stopPropagation();
											handleDeleteBook(book.bookId);
										}}
									>
										Remove Book
									</Button>
								</Card.Body>
								{error && <div>Something Went Wrong..</div>}
							</Card>
						</div>
					))}
				</div>
			</Container>

			<div className='.modal-book-card'>
				<Modal
					className='modal-card-item'
					show={showModal}
					onHide={handleCloseModal}
				>
					<Modal.Header closeButton>
						<Modal.Title className='modal-book-title'>
							{selectedBook ? selectedBook.title : ''}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body className='model-card-body'>
						{selectedBook ? (
							<>
								<img
									className='modal-card-img-top'
									src={selectedBook.image} //opt for high-res image if available
									alt={`Cover for ${selectedBook.title}`}
								/>
								<div className='modal-book-title'>
									{selectedBook ? selectedBook.title : ''}
								</div>
								<p className='modal-authors'>
									{selectedBook.authors.join(', ')}
								</p>
								<div className='modal-card-text'>
									{selectedBook.description}
									<br></br>
									<br></br>
									{selectedBook.link && (
										<div className='modal-link'>
											Google Books Link:{' '}
											<a
												href={selectedBook.link}
												target='_blank'
												rel='noopener noreferrer'
											>
												{selectedBook.title}
											</a>
										</div>
									)}
								</div>
							</>
						) : (
							<p>No book selected</p>
						)}
					</Modal.Body>
				</Modal>
			</div>
		</>
	);
};

export default SavedBooks;
