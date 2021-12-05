/* должен работать с клиентом и с остальными классами */
class Controller {
    constructor(view, model) {
        this.view = view,
        this.model = model,
        this.leftInput = 0, 
        this.rightInput = 0, 
        this.rightBtn = "USD" , 
        this.leftBtn = "RUB",
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
        }
    }

    renderer() {
        this.view.render(this.leftInput, this.rightInput, this.leftBtn, this.leftInput);
    }

    init() { 
        this.render.page.left.buttons.forEach((item) => {
            item.el.addEventListener('click', this.getCallBackFromButtons('left', item.name));
        });

    }
}