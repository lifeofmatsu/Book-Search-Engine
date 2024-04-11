export const getSavedBookIds = () => {
	const savedBookItem = localStorage.getItem('saved_books');
	console.log('Retrieved saved_books from localStorage:', savedBookItem);

	if (!savedBookItem) {
		return [];
	}

	try {
		return JSON.parse(savedBookItem);
	} catch (error) {
		console.error('Error parsing saved books from localStorage:', error);
		return [];
	}
};

export const saveBookIds = (bookIdArray) => {
	if (bookIdArray.length) {
		localStorage.setItem('saved_books', JSON.stringify(bookIdArray));
	} else {
		localStorage.removeItem('saved_books');
	}
};

export const removeBookId = (bookId) => {
	const savedBookIds = localStorage.getItem('saved_books')
		? JSON.parse(localStorage.getItem('saved_books'))
		: null;

	if (!savedBookIds) {
		return false;
	}

	const updatedSavedBookIds = savedBookIds?.filter(
		(savedBookId) => savedBookId !== bookId
	);
	localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

	return true;
};
