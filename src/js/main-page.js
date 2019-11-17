export class MainPage {
	init(container) {
		this.container = container;
		this.usersList = [];
		this.chatsList = [];
		this.render();
		// this.getContacts();
		this.getChats();
	}

	loadContacts(usersIdList) {
		return Promise.all(
			usersIdList.map((userId) => {
				return client.getUser(userId).then((res) => {
					return `${res['first_name']} ${res['last_name']}`;
				});
			})
		);
	}

	getContacts() {
		client
			.getContacts()
			.then((result) => {
				this.loadContacts(result['user_ids']).then((res) => {
					this.usersList = res;
					this.render();
				});
				return result;
			})
			.catch((error) => {
				throw error;
			});
	}

	loadChats(chatsIdList) {
		return Promise.all(
			chatsIdList.map((chatId) => {
				return client.getChat(chatId).then((result) => {
					return { ...result };
				});
			})
		);
	}

	getChats() {
		client
			.getChats()
			.then((result) => {
				this.loadChats(result['chat_ids']).then((result) => {
					this.chatsList = result;
					console.log(this.chatsList[0].last_message.content.text.text);
					this.render();
				});
				return result;
			})
			.catch((error) => {
				throw error;
			});
	}

	render() {
		this.container.innerHTML = this.markup();
	}

	markup() {
		return `
		<section class="main-section">
			<aside class="left-block chat-block">
			${this.chatsList
				.map(
					(chat) => `
							<div class="item">
									<img class="item-photo" src="./assets/img/logo.png" alt="photo">
									<div class="item-content">
										<p class="item-content__title">
											${(chat.title.length > 20 ? chat.title.substring(0, 20) + '...' : chat.title)}
										</p>
										<p class="item-content__last-message">
											${
												(chat.last_message.content.text
													? (chat.last_message.content.text.text.length > 35
														? chat.last_message.content.text.text.substring(0, 35) + '...' 
														: chat.last_message.content.text.text)
													: '')
											}
										</p>
									</div>
									<div class="item-info">
										<p class="item-info__time">
										${client.getMessageDate(chat.last_message)}
										</p>
										<div class="item-info__tabs">
											<div class="number ${chat.unread_count > 0 ? '' : 'not-visible'}">
												${chat.unread_count > 0 ? `${chat.unread_count}` : '0'}
											</div>
										</div>
									</div>
								</div>
						`
				)
				.join('\n')}
        
      </aside>
      <div class="center-block">
        
      </div>
      <aside class="right-block">

      </aside>
    `;
	}

	constructor(container) {
		this.init(container);
	}
}
