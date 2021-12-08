class View {
    constructor(pageModel) {
        this.page = pageModel || { /*если pagemodel не придет и будет undefined
            то пропишем сами модель */
            left: {
                buttons: [
                    {name: "RUB", el: leftRub},
                    {name: "USD", el: leftUsd},
                    {name: "EUR", el: leftEur},
                    {name: "GGP", el: leftGbp}
                ],
                input: leftSum,
                hint: leftHint
            }, 
            right: {
                buttons: [
                    {name: "RUB", el: rightRub},
                    {name: "USD", el: rightUsd},
                    {name: "EUR", el: rightEur},
                    {name: "GGP", el: rightGbp}
                ],
                input: rightSum,
                hint: rightHint
            }, 
            selectClass: "select-button"

        }; /*описываем модель, с которой будем работать*/
    }

    makeButtons(btn, leftororight) {
        this.page[leftororight].buttons.forEach((item) => {
            if(item.name == leftbtn)  item.el.classList.add(this.page.selectClass); 
            else item.el.classList.remove(this.page.selectClass);      
       });
       /*
       Это модель, как если на кажду кнопку навешивать события 
        leftSum.value = leftinput; в инпут записываем значение от пользователя и отдаем в метод
        leftSum.value = rightinput;
        if(leftbtn == "RUB") leftRub.classList.add('select-button');
        else leftRub.classList.remove('select-button');
        */
    }

    render(leftbtn, rightbtn, leftinput, rightinput) {
        this.makeButtons(leftbtn, 'left');
        /* leftbtn - это "RUB" и прочее */
        this.makeButtons(rightbtn, 'right');

        this.page.left.input.value = leftinput;
        this.page.right.input.value = rightinput;

        this.page.left.hint.innerText = `1 ${leftbtn} = ${leftinput/rightinput} ${rightbtn}`;
        this.page.right.hint.innerText = `1 ${rightbtn} = ${rightinput/leftinput} ${lefttbtn}`;
    }
}
