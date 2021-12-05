class ExhangeRate {
    constructor(base, symbol, response){
        
    }
    /* делаем кеширование */
    toCash(base, symbol, response){

    }

    async getCoefficient (base, symbol) {
        //type tring "RUB"
        if(base == symbol) return 1; /* чтобы не повторять запрос к серверу */
        let response = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbol}`);
        response = await response.json();
        /* почему здесь let уже не пишут??*/
        response = response.rates[symbol];
        return response;
    }
}
