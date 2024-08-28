const actionCommands = require('../commands/actions');
const date = require('date-fns');
const constUrl = "https://marciossupiais.shop/tcc";

    

     
       
        
     async function get_lendings() {
        var data_map = new Map();
        
        try {
            const response = await fetch(constUrl+"/emprestimos/pendentes").then(res => res.json())
            
            response.DATA
                //.filter(item => actionCommands.checkIsTodayDataAPI(item,2) || actionCommands.checkIsTodayDataAPI(item,1) || actionCommands.checkIsTodayDataAPI(item,0) || actionCommands.checkIsTodayDataAPI(item,-1)) // Filtrando os itens
                .forEach(item => {
                    data_map.set(item.id, item); 
                });
    
  
            return data_map;
            
        } catch (error) {
            console.error('Erro ao buscar pelos empréstimos listados: ', error);
            return [];
        }
    }

    async function get_especific_lending(id_lending) {
      let data_map = new Map();
      
      try {
        
          const response = await fetch(constUrl+"/listar/pendentes").then(res => res.json())
          
          response.DATA
          .filter(item => item.id == id_lending)
              .forEach(item => {
                  data_map.set(item.id, item); 
              });
  

          return data_map;
          
      } catch (error) {
          console.error('Erro ao buscar pelos alunos listados: ', error);
          return [];
      }
  }


  // EM TESTE -------------------------------------------------------------------------------
  async function get_coordinators(course_id) {
    var data_map = new Map();
    
    try {
        const response = await fetch(constUrl+`/coordenadores/`).then(res => res.json())
        
        response.DATA
            .filter(item => item.id_curso == course_id) // Filtrando os id's de curso
            .forEach(item => {
                data_map.set(item.id, item); 
            });


        return data_map;
        
    } catch (error) {
        console.error('Erro ao buscar pelos cursos listados: ', error);
        return [];
    }
}

  

    module.exports = {
        get_lendings,
        get_especific_lending,
        get_coordinators
      };