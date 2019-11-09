class TlSelect {
	constructor(list) {
		this.optionList = list;
	}

	render() {
		return `
        <div class="tl-select login-select">
          <div class="inner tl-input">
            <input type="text" placeholder="Country" readonly>
          </div>
          <div class="option">
            <ul>
              ${this.optionList.map(item => {
                return `
                <li class="item">
                  <div class="name">${item.name}</div>
                  <div class="code">${item.code}</div>
                </li>
                `
              })}
            </ul>
          </div>
        </div>
    `;
	}
}
