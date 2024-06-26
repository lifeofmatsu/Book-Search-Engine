import decode from 'jwt-decode';

class AuthService {
	getProfile() {
		return decode(this.getToken());
	}

	loggedIn() {
		const token = this.getToken();
		return token && !this.isTokenExpired(token) ? true : false;
	}

	isTokenExpired(token) {
		const decoded = decode(token);
		return decoded.exp < Date.now() / 1000;
	}

	getToken() {
		return localStorage.getItem('id_token');
	}

	login(idToken) {
		localStorage.setItem('id_token', idToken);
		window.location.assign('/');
	}

	logout() {
		localStorage.removeItem('id_token');
		localStorage.clear();
		window.location.assign('/');
	}
}

export default new AuthService();
