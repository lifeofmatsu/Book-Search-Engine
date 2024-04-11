import { useState, useEffect } from 'react';
import {
	Container,
	Col,
	Form,
	Button,
	Card,
	Row,
	Modal
} from 'react-bootstrap';
import Auth from '../utils/auth';
import { saveBookIds } from '../utils/localStorage';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_ME, SEARCH_BOOKS } from '../utils/queries';
import { SAVE_BOOK } from '../utils/mutations';

const SearchBooks = () => {
	const [searchInput, setSearchInput] = useState('');
	const [searchedBooks, setSearchedBooks] = useState([]);
	const [savedBookIds, setSavedBookIds] = useState();

	const [selectedBook, setSelectedBook] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const { data: userData } = useQuery(GET_ME, {
		fetchPolicy: 'network-only'
	});

	const [startBookSearch, { loading }] = useLazyQuery(SEARCH_BOOKS, {
		onCompleted: (data) => {
			console.log('Query completed: ', data);
			const processedBooks = data.searchBooks.map((book) => ({
				...book
			}));
			console.log('Processed Books: ', processedBooks);
			setSearchedBooks(processedBooks);

			console.log(
				'Book ID Check: ',
				processedBooks.map((book) => book.bookId)
			);
		},
		onError: (error) => {
			console.error('Error message:', error.message);
			console.error('Error network:', error.networkError);
			if (error.graphQLErrors) {
				error.graphQLErrors.forEach((graphQLError) => {
					console.error('GraphQL Error:', graphQLError.message);
					console.error('Location:', graphQLError.locations);
					console.error('Path:', graphQLError.path);
					console.error('Extensions:', graphQLError.extensions);
				});
			}
		}
	});

	const [saveBook, { error }] = useMutation(SAVE_BOOK);

	useEffect(() => {
		const userSavedBookIds =
			userData?.me?.savedBooks?.map((book) => book.bookId) || [];
		setSavedBookIds(userSavedBookIds);
		saveBookIds(userSavedBookIds); // sync with localStorage
	}, [userData]);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		if (!searchInput) return;

		try {
			console.log('Query:', SEARCH_BOOKS);
			console.log('Variables:', { query: searchInput });
			startBookSearch({ variables: { query: searchInput } });
			console.log('startBookSearch was called: ', searchInput);
		} catch (error) {
			console.error('Caught error during startBookSearch:', error);
		}
	};

	const handleSaveBook = async (bookId) => {
		console.log('Attempting to save book with ID:', bookId);
		console.log('Current searchedBooks state:', searchedBooks);

		const bookToSave = searchedBooks.find((book) => book.bookId === bookId); // find the book in `searchedBooks` state by the matching id
		const token = Auth.loggedIn() ? Auth.getToken() : null; // get token

		if (!token) {
			alert('You must be logged in to save books.');
			return false;
		}

		if (!bookToSave) {
			console.error('Book to save not found.');
			return;
		}

		console.log('Book to save:', bookToSave);

		if (savedBookIds.includes(bookId)) {
			alert('This book has already been saved!');
			return;
		}

		try {
			const { bookId, authors, description, title, image, link } =
				bookToSave;
			await saveBook({
				variables: {
					newBook: {
						bookId,
						authors,
						description,
						title,
						image,
						link
					},
					token
				}
			});

			const newSavedBookIds = [...savedBookIds, bookId];
			setSavedBookIds(newSavedBookIds);
			saveBookIds(newSavedBookIds);
			alert('Book saved successfully!');
		} catch (err) {
			console.error('Error saving book:', err);
			alert('An error occurred while saving the book.');
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

	return (
		<>
			<Container fluid className='search-container'>
				<div className='search-title'>
					<h2>Search for Books!</h2>
				</div>
				<Form className='search-form-grid' onSubmit={handleFormSubmit}>
					<Form.Control
						className='search-bar'
						name='searchInput'
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						type='text'
						placeholder='Search for a book'
					/>
					<Button
						className='search-book-button'
						type='submit'
						variant='success'
					>
						Submit Search
					</Button>
				</Form>
			</Container>

			<div className='searched-books-grid'>
				<h3 className='search-subtitle'>
					{loading
						? 'Loading...'
						: `${
								searchedBooks.length
									? `Viewing ${searchedBooks.length} results:`
									: `— search for a book to begin —`
						  }`}
				</h3>
				{searchedBooks.map((book) => {
					return (
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
									{Auth.loggedIn() && (
										<Button
											disabled={savedBookIds?.includes(
												book.bookId
											)}
											className='save-book-button'
											onClick={(event) => {
												event.stopPropagation(); // Prevent card click when clicking the button
												handleSaveBook(book.bookId);
											}}
										>
											{savedBookIds?.includes(book.bookId)
												? 'Book has been saved'
												: 'Save this Book!'}
										</Button>
									)}
								</Card.Body>
								{error && <div>Something Went Wrong..</div>}
							</Card>
						</div>
					);
				})}
			</div>
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						{selectedBook ? selectedBook.title : ''}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Check if selectedBook is not null before rendering its details */}
					{selectedBook ? (
						<>
							<img
								src={selectedBook.image}
								alt={`Cover for ${selectedBook.title}`}
							/>
							<p>Authors: {selectedBook.authors.join(', ')}</p>
							<p>{selectedBook.description}</p>
						</>
					) : (
						<p>No book selected</p>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default SearchBooks;
