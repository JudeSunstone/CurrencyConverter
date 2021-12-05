const app = async function(){
    const example = new ExhangeRate ();
    console.log(await example.getCoefficient("USD", "RUB"));
    const view = new View(); 
    /*если сюда ничего не передать, то 
    автоматически применится pagemodel которую мы прописали сюда*/
}(); /* вызываем, чтобы посмотреть результат и что все работает  */