function headers() {
	return {
		'Content-Type': 'application/json',
		Accepts: 'application/json',
		Authorization: localStorage.getItem('token')
	}
}

const baseUrl = `http://localhost:4000`

export class RestfulAdapter {
	static login(username, password, route) {
		return fetch(`${baseUrl}/${route}`, {
			method: 'POST',
			headers: headers(),
			body: JSON.stringify({
				username: username,
				password: password
			})
		}).then(r => r.json())
	}

	static signup(username, password, route) {
		return fetch(`${baseUrl}/${route}`, {
			method: 'POST',
			headers: headers(),
			body: JSON.stringify({
				username: username,
				password: password
			})
		}).then(r => r.json())
	}

  static getUser(token, route) {
    return fetch(`${baseUrl}/${route}`, {
      headers: {
        "Authorization": 'Bearer ' + token
      }
    }).then(r => r.json())
  }
}
