/* должен работать с клиентом и с остальными классами */
class Controller {
    constructor(model, view) {
        // Зависимости (модель и вьюха)
        this.model = model;   
        this.view = view;

        this.rightBtn = "USD"; 
        this.leftBtn = "RUB"; /*по умолчанию */
        this.leftInput = 1000; 
        this.rightInput = ""; 
        this.coefficient = 1; /* ВЗЯТЬ ИЗ ЗАПРОСА */
    } 

    getCallBackFromButtons(inpKey, btnName) { //string
        const func = async (e) => {
            console.log(inpKey, btnName);
            if (inpKey === 'left') {
                this.leftBtn = btnName;
                this.coefficient = await this.model.getCoefficient(this.leftBtn, this.rightBtn); 
            } else {
                this.rightBtn = btnName;
                this.coefficient = await this.model.getCoefficient(this.leftBtn, this.rightBtn);
            }
            this.rightInput = this.leftInput * this.coefficient;
            this.rend();
        };
        return func; 
    }

    rend() {
        this.view.renderer(this.leftBtn, this.rightBtn, this.leftInput, this.rightInput);
    }

    async init() { 
            this.view.page.left.buttons.forEach((item) => {
                item.el.addEventListener('click', this.getCallBackFromButtons('left', item.name));
            });
            this.view.page.right.buttons.forEach((item) => {
                item.el.addEventListener('click', this.getCallBackFromButtons('right', item.name));
            });
            this.view.page.left.input.addEventListener('keyup', (e) => {
                this.leftInput = isNaN(e.target.value) ? this.leftInput : e.target.value; //проверяем, чтобы ввод был числом
                this.rightInput = this.leftInput * this.coefficient;
                this.rend();
            });
            this.view.page.right.input.addEventListener('keyup', (e) => {
                this.rightInput = isNaN(e.target.value) ? this.rightInput : e.target.value; //проверяем, чтобы ввод был числом
                this.leftInput = this.rightInput / this.coefficient;
                this.rend();
            });

            this.coefficient = await this.model.getCoefficient(this.left, this.right);
            
            this.rend();
        }

}