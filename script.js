const app = function(){
    const controller = new Controller(new ExhangeRate(), new View());
    controller.init();
    
    /*const view = new View(); 
    если сюда ничего не передать, то 
    автоматически применится pagemodel которую мы прописали сюда*/
}(); 