
    

     function checkIsTodayDataAPI(element, past_days){
        if(require('date-fns').isToday(require('date-fns').addDays(require('date-fns').parse(element.data_aluguel, 'yyyy-MM-dd', new Date()), Number(element.prazo)-past_days))){
          return true;
        }else{
          return false;
        }
      }
       
        
     async function get_lendings() {
        var data_map = new Map();
        
        try {
            const response = await fetch("https://marciossupiais.shop/tcc/emprestimos/").then(res => res.json())
            
            response.DATA
                .filter(item => checkIsTodayDataAPI(item,3) || checkIsTodayDataAPI(item,2) || checkIsTodayDataAPI(item,1) || checkIsTodayDataAPI(item,0)) // Filtrando os itens
                .forEach(item => {
                    data_map.set(item.rm, item); // Armazenando no Map
                });
    
  
            return data_map;
            
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            return [];
        }
    }

    module.exports = {
        checkIsTodayDataAPI,
        get_lendings
      };