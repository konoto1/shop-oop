export class PageShopList {
    constructor(DOM) {
        this.DOM = DOM;
        this.render();
        this.listEvents();
    }

    listEvents() {
        const rowsDOM = this.DOM.querySelectorAll('tbody > tr');
        for (const rowDOM of rowsDOM) {
            const buttonsDOM = rowDOM.querySelectorAll('button');
            const amountDOM = rowDOM.querySelector('span');

            buttonsDOM[0].addEventListener('click', () => {
                const idToDecrease = rowDOM.id;
                const LocalStorageData = localStorage.getItem('itemList');
                const list = JSON.parse(LocalStorageData).map(item => item.id === idToDecrease ? ({ ...item, amount: item.amount === 0 ? item.amount : item.amount - 1 }) : item);
                localStorage.setItem('itemList', JSON.stringify(list));
                amountDOM.textContent = list.filter(item => item.id === idToDecrease)[0].amount;

            });

            buttonsDOM[1].addEventListener('click', () => {
                const idToIncrease = rowDOM.id;
                const LocalStorageData = localStorage.getItem('itemList');
                const list = JSON.parse(LocalStorageData).map(item => item.id === idToIncrease ? { ...item, amount: item.amount + 1 } : item);
                localStorage.setItem('itemList', JSON.stringify(list));
                amountDOM.textContent = list.filter(item => item.id === idToIncrease)[0].amount;
            });

            buttonsDOM[2].addEventListener('click', () => {
                const idToRemove = rowDOM.id;
                const LocalStorageData = localStorage.getItem('itemList');
                const list = JSON.parse(LocalStorageData).filter(item => item.id !== idToRemove);
                localStorage.setItem('itemList', JSON.stringify(list))
                rowDOM.remove();
            });
        }
    }



    render() {
        const data = JSON.parse(localStorage.getItem('itemList'));
        let HTML = '';

        if (data) {
            for (const item of data) {
                HTML += `
                    <tr id="${item.id}">
                        <td>${item.title}</td>
                        <td>
                        <button>-</button>
                        <span>${item.amount}</span> 
                        <button>+</button>
                        </td>
                        <td>
                            <button>Delete</button>
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