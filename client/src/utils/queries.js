import { gql } from '@apollo/client';

export const GET_ME = gql`
	query {
		me {
			_id
			username
			email
			bookCount
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
				__typename
			}
			__typename
		}
	}
`;

export const SEARCH_BOOKS = gql`
	query searchBooks($query: String!) {
		searchBooks(query: $query) {
			bookId
			authors
			description
			title
			image
			link
		}
	}
`;
