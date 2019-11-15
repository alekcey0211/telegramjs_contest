export class MainPage {
	init(container) {
		this.container = container;
		this.usersList = [];
		this.initContactList();
		this.render();
	}

	initContactList() {
		let usersIdList = [];
		client
			.getContacts()
			.then(async (result) => {
				console.log('receive result', result);
				usersIdList = result['user_ids'];
				this.usersList = await usersIdList.map(async (userId) => {
					let str = '';
					await client.getUser(userId).then((result) => {
						str = `${result['first_name']} ${result['last_name']}`;
						return `${result['first_name']} ${result['last_name']}`
					});
					return str;
				});
				return result;
			})
			.then((result) => {
				console.log(this.usersList);
				this.render();
			})
			.catch((error) => {
				console.error('catch error', error);
				throw error;
			});
	}

	render() {
		console.log(this);
		this.container.innerHTML = this.markup(this);
	}

	markup({ usersList }) {
		return `
      <section class="main-page-section">
        <h1>Пользователь уже авторизирован!</h1>
				<h2>Список контактов:</h2>
        <ul>
          ${this.usersList.map((user) => `<li>${user}</li>`).join('\n')}
        </ul>
      </section>
    `;
	}

	constructor(container) {
		this.init(container);
	}
}
