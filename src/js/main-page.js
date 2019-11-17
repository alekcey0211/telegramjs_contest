export class MainPage {
	init(container) {
		this.container = container;
		this.usersList = [];
		this.chatsList = [];
		this.render();
		this.getChats();
		this.getMe();
	}

	getMe() {
		client
			.getMe()
			.then((result) => {
				this.currentProfile = result;
			})
			.then((result) => {
				client
					.getUserFullInfo(this.currentProfile.id)
					.then((result) => {
						this.currentProfileInfo = result;
						this.render();
					})
					.catch((error) => {
						console.error('Catch error', error);
						throw error;
					});
			})
			.catch((error) => {
				console.error('Catch error', error);
				throw error;
			});
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
				this.loadChats(result['chat_ids'])
					.then((result) => {
						this.chatsList = result;
					})
					.then((result) => {
						client
							.openChat(this.chatsList[0].id)
							.then(() => {
								this.getChatHistory(this.chatsList[0].id);
								setTimeout(() => {
									this.getChatHistory(this.chatsList[0].id);
								}, 1000);
							})	
							.catch((error) => {
								throw error;
							})
						this.render();
					});
				return result;
			})
			.catch((error) => {
				throw error;
			});
	}

	getChatHistory(chatId) {
		client
			.getChatHistory(chatId)
			.then((result) => {
				console.log('Get result 1', result);
				return result;
			})
			.catch((error) => {
				console.error('Catch error', error);
				throw error;
			});
	}

	render() {
		this.container.innerHTML = this.markup();
		const profileBlock = this.container.querySelector('.profile-block');
		if (profileBlock) {
			const closeProfileButton = this.container.querySelector('.profile-block__nav .close');
			closeProfileButton.addEventListener('click', (e) => {
				profileBlock.classList.toggle('show');
			});
		}
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
											${chat.title.length > 20 ? chat.title.substring(0, 20) + '...' : chat.title}
										</p>
										<p class="item-content__last-message">
											${
												chat.last_message.content.text
													? chat.last_message.content.text.text.length > 35
														? chat.last_message.content.text.text.substring(0, 35) + '...'
														: chat.last_message.content.text.text
													: ''
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
				${
					this.currentProfile && this.currentProfileInfo
						? `
					<aside class="right-block profile-block show">
						<div class="profile-block__nav">
							<button class="close">
								<img src="./assets/img/close_svg.svg" alt="">
							</button>
							<div class="title">
								<p>Info</p>
							</div>
							<button class="more">
								<img src="./assets/img/more_svg.svg" alt="">
							</button>
						</div>
						<div class="profile-block__photo">
							<img src="./assets/img/logo.png" alt="">
						</div>
						<div class="profile-block__name">
							<h2 class="fio">${this.currentProfile.first_name} ${this.currentProfile.last_name}</h2>
							<p class="status ${this.currentProfile.status['@type'] === 'userStatusOffline' ? '' : 'active'}">
								${this.currentProfile.status['@type'] === 'userStatusOffline' ? 'offline' : 'online'}
							</p>
						</div>
					 <div class="profile-block__info">
					 <div class="item">
						 <img src="./assets/img/info_svg.svg" alt="" class="icon">
						 <div class="inner">
							 <p class="value">${this.currentProfileInfo.bio}</p>
							 <p class="description">Bio</p>
						 </div>
					 </div>
					 <div class="item">
						 <img src="./assets/img/username_svg.svg" alt="" class="icon">
						 <div class="inner">
							 <p class="value">${this.currentProfile.username}</p>
							 <p class="description">Username</p>
						 </div>
					 </div>
					 <div class="item">
						 <img src="./assets/img/phone_svg.svg" alt="" class="icon">
						 <div class="inner">
							 <p class="value">+${this.currentProfile.phone_number}</p>
							 <p class="description">Phone</p>
						 </div>
					 </div>
					 <div class="item">
						 <label class="tl-checkbox">
							 <input type="checkbox" checked>
							 <span class="checkmark"></span>
						 </label>
						 <div class="inner">
							 <p class="value">Notifications</p>
							 <p class="description">Enabled</p>
						 </div>
					 </div>
				 </div>
			 </aside>
					 `
						: ''
				}
        
    `;
	}

	constructor(container) {
		this.init(container);
	}
}
