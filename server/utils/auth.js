const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY || 'fallback_secret';
const expiration = '2h';

module.exports = {
	AuthenticationError: new GraphQLError('Failed to authenticate user.', {
		extensions: {
			code: 'UNAUTHENTICATED'
		}
	}),

	authMiddleware: ({ req }) => {
		let token = req.body.token || req.query.token || req.headers.authorization;

		// ["Bearer", "<tokenvalue>"]
		if (req.headers.authorization) {
			token = token.split(' ').pop().trim();
		}

		if (!token) {
			return req;
		}

		try {
			const { data } = jwt.verify(token, secret, { maxAge: expiration });
			req.user = data;
		} catch (err) {
			console.error(err, 'Invalid token');
		}

		return req;
	},
	
	signToken: ({ email, username, _id }) => {
		const payload = { email, username, _id };
		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
	}
};
