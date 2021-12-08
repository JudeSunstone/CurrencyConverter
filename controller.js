/* должен работать с клиентом и с остальными классами */
class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.leftInput = 0; 
        this.rightInput = 0; 
        this.rightBtn = "USD"; 
        this.leftBtn = "RUB";
        this.coefficient = 0;
    }

    getCallBackFromButtons(leftoright, currency){ //string
        return (e) => {
            if(leftoright == 'left') {
                this.leftBtn = currency;
                this.coefficient = this.model.getCoefficient(this.leftBtn, this.rightBtn);
                this.rightInput = this.leftInput * this.coefficient;
            }
            if(leftoright == 'right') {
                this.rightBtn = currency;
                this.coefficient = this.model.getCoefficient(this.leftBtn, this.rightBtn);
                this.leftInput = this.rightInput / this.coefficient;
            }
            this.renderer();
        };
    }

    renderer() {
        this.view.render(this.leftInput, this.rightInput, this.leftBtn, this.leftInput);
    }

    init() { 
            this.model.page.left.buttons.forEach((item) => {
                item.el.addEventListener('click', this.getCallBackFromButtons('left', item.name));
            });
            this.model.page.right.buttons.forEach((item) => {
                item.el.addEventListener('click', this.getCallBackFromButtons('right', item.name));
            });
            this.model.page.left.input.addEventListener('keyup', (e) => {
                this.leftInput = isNaN(e.target.value) ? this.leftInput : e.target.value; //проверяем, чтобы ввод был числом
                this.renderer();
            });
            this.model.page.right.input.addEventListener('keyup', (e) => {
                this.rightInput = isNaN(e.target.value) ? this.rightInput : e.target.value; //проверяем, чтобы ввод был числом
                this.renderer();
            });
        }

}