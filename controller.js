/* должен работать с клиентом и с остальными классами */
class Controller {
    constructor(model, view) {
        this.model = model;   
        this.view = view;
        this.rightBtn = "USD"; 
        this.leftBtn = "RUB"; /*по умолчанию */
        this.leftInput = 1; 
        this.rightInput = 1; 
        this.coefficient = 1;
    }

    getCallBackFromButtons(inpKey, btnKey, btnName) { //string
        const func = (e) => {
            this[btnKey] = btnName; /*item.name*/
            this.coefficient = this.model.getCoefficient(this.leftBtn, this.rightBtn);
            this[inpKey] = inpKey == 'leftInput' ? 
                this.rightInput / this.coefficient : 
                this.rightInput * this.coefficient;
            this.rend();
        };
        return func;
    }

    rend() {
        this.view.renderer(this.leftBtn, this.rightBtn, this.leftInput, this.rightInput);
    }

    async init() { 
            this.model.page.left.buttons.forEach((item) => {
                item.el.addEventListener('click', this.getCallBackFromButtons('left', item.name));
            });
            this.model.page.right.buttons.forEach((item) => {
                item.el.addEventListener('click', this.getCallBackFromButtons('right', item.name));
            });
            this.model.page.left.input.addEventListener('keyup', (e) => {
                this.leftInput = isNaN(e.target.value) ? this.leftInput : e.target.value; //проверяем, чтобы ввод был числом
                this.rightInput = this.leftInput * this.coefficient;
                this.renderer();
            });
            this.model.page.right.input.addEventListener('keyup', (e) => {
                this.rightInput = isNaN(e.target.value) ? this.rightInput : e.target.value; //проверяем, чтобы ввод был числом
                this.leftInput = this.rightInput / this.coefficient;
                this.renderer();
            });

            this.coefficient = await this.model.getCoefficient(this.left, this.right);
            
            this.renderer();
        }

}