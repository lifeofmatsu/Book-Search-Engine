const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const fetch = require('node-fetch');

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id });
			}
			return null;
		},

		searchBooks: async (_, { query }) => {
			if (!query) return [];

			const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
				query
			)}`;

			try {
				const response = await fetch(endpoint);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const dataset = await response.json();
				return dataset.items.map((book) => ({
					bookId: book.id,
					authors: book.volumeInfo.authors || [
						`No author(s) to display`
					],
					description: book.volumeInfo.description,
					title: book.volumeInfo.title,
					image: book.volumeInfo.imageLinks?.thumbnail || '',
					link: book.volumeInfo.infoLink
				}));
			} catch (error) {
				console.error('Error fetching book data:', error);
				throw new Error('Error fetching book data');
			}
		}
	},
	Mutation: {
		addUser: async (parent, args) => {
			//args = { username, email, password }
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},

		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw AuthenticationError;
			}

			const correctPwd = await user.isCorrectPassword(password);

			if (!correctPwd) {
				throw AuthenticationError;
			}

			const token = signToken(user);

			return { token, user };
		},

		saveBook: async (parent, { newBook }, context) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { savedBooks: newBook } },
					{ new: true }
				);
				return updatedUser;
			}
			throw new AuthenticationError('Not logged in');
		},

		removeBook: async (parent, { bookId }, context) => {
			if (context.user) {
				const updatedUser = await User.findByIdAndUpdate(
					context.user._id,
					{ $pull: { savedBooks: { bookId } } },
					{ new: true }
				);
				return updatedUser;
			}
			throw new AuthenticationError('You need to be logged in!');
		}
	}
};

module.exports = resolvers;
