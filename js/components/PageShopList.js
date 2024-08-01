export class PageShopList {
    constructor(DOM) {
        this.DOM = DOM;
        this.localStorageKey = 'itemList';

        this.render();
        this.listEvents();

    }

    readLocalStorage() {
        const localStorageData = localStorage.getItem(this.localStorageKey);
        // beda, nes net nera tokio "key" local storage
        if (localStorageData === null) {
            return [];
        }
        // minimali galima teisinga stringo reiksme: []
        if (typeof localStorageData !== 'string' || localStorageData.length < 2) {
            return [];
        }
        const data = JSON.parse(localStorageData);
        if (Array.isArray(data)) {
            return [];
        }
        const validData = [];

        for (const item of data) {
            if (typeof item === 'object'
                && item !== null
                && !Array.isArray(item)
                && Object.keys(item).length === 3
                && typeof item.id === 'string'
                && item.id.length > 5
                && item.id.startsWith('item_')
                && isFinite(item.id.slice(5))
                && typeof item.title === 'string'
                && item.title.trim().length > 0
                && typeof item.amount === 'number'
                && isFinite(item.amount)
                && item.amount >= 0) {
                validData.push(item);
            }
        }

        return validData;
    }

    minus(rowDOM, buttonDOM) {
        const amountChange = +buttonDOM.dataset.step;
        const idToDecrease = rowDOM.id;
        const amountDOM = rowDOM.querySelector('span');
        const list = this.readLocalStorage().map(item => item.id === idToDecrease ? { ...item, amount: item.amount - amountChange > 0 ? (item.amount - amountChange) : 0 } : item);
        localStorage.setItem(this.localStorageKey, JSON.stringify(list));
        amountDOM.textContent = list.filter(item => item.id === idToDecrease)[0].amount;
    }

    plus(rowDOM, buttonDOM) {
        const amountChange = +buttonDOM.dataset.step
        const idToIncrease = rowDOM.id;
        const amountDOM = rowDOM.querySelector('span');
        const LocalStorageData = localStorage.getItem('itemList');
        const list = this.readLocalStorage().map(item => item.id === idToIncrease ? { ...item, amount: item.amount + amountChange } : item);
        localStorage.setItem('itemList', JSON.stringify(list));
        amountDOM.textContent = list.filter(item => item.id === idToIncrease)[0].amount;
    }

    delete(rowDOM, buttonDOM) {
        const idToRemove = rowDOM.id;
        const LocalStorageData = localStorage.getItem('itemList');
        const list = this.readLocalStorage().filter(item => item.id !== idToRemove);
        localStorage.setItem('itemList', JSON.stringify(list))
        rowDOM.remove();
    }

    listEvents() {
        const rowsDOM = this.DOM.querySelectorAll('tbody > tr');
        const funclist = {
            minus: this.minus,
            plus: this.plus,
            delete: this.delete,
        };

        for (const rowDOM of rowsDOM) {
            const buttonsDOM = rowDOM.querySelectorAll('button');
            for (const buttonDOM of buttonsDOM) {
                buttonDOM.addEventListener('click', () => funclist[buttonDOM.dataset.method](rowDOM, buttonDOM));
            }
            // buttonsDOM[0].addEventListener('click', () => this.minus(rowDOM));
            // buttonsDOM[1].addEventListener('click', () => this.plus(rowDOM));
            // buttonsDOM[2].addEventListener('click', () => this.delete(rowDOM));
        }
    }

    render() {
        const data = JSON.parse(localStorage.getItem(this.localStorageKey));
        let HTML = '';

        if (data) {
            for (const item of data) {
                HTML += `
                    <tr id="${item.id}">
                        <td>${item.title}</td>
                        <td>
                        <button data-method="minus" data-step="10">-10</button>
                        <button data-method="minus" data-step="1">-</button>
                        <span>${item.amount}</span> 
                        <button data-method="plus" data-step="1">+</button>
                         <button data-method="plus" data-step="10">+10</button>
                        </td>
                        <td>
                            <button data-method="delete">Delete</button>
                        </td>
                    </tr>
                    `;
            };
        }


        this.DOM.innerHTML = `
            <section class="row">
                <div class="col-12">
                    <h1>Shop list page</h1>
                    <p>Create your shopping list!</p>
                </div>
            </section>
            <section class="row">
                <div class="col-12">
                    <table>
                        <thead>
                            <tr>
                            <td>Title</td>
                            <td>Amount</td>
                            <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            ${HTML}
                        </tbody>
                    </table>
                </div>
            </section> `;
    }
}