class ExhangeRate {
    constructor(base, symbol, response){
        
    }
    /* делаем кеширование */
    toCash(base, symbol, response){

    }

    async getCoefficient (base, symbol) {
        //type string "RUB"
        if(base == symbol) return 1; /* чтобы не повторять запрос к серверу */
        let response = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbol}`);
            response = await response.json();
            response = response.rates[symbol];
        return response;
    }
}
