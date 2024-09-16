const actionCommands = require('../commands/actions');
const date = require('date-fns');
const constUrl = "https://marciossupiais.shop/tcc";

    

     
       
        
     async function get_lendings() {
        let data_map = new Map();
        
        try {
            const response = await fetch(constUrl+"/emprestimos/pendentes").then(res => res.json());
            
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

    async function get_especific_lending(phone_lending) {
      let data_map = new Map();
      
      try {
            // SOMENTE PENDENTES PODEM REALIZAR RENOVAÇÕES
          const response = await fetch(constUrl+"/emprestimos/pendentes").then(res => res.json());
          
          response.DATA
          .filter(item => item.aluno_telefone == phone_lending && item.renovavel == 1)
              .forEach(item => {
                  data_map.set(item.id, item); 
              });
  

          return data_map;
          
      } catch (error) {
          console.error('Erro ao buscar pelo empréstimo específico ', error);
          return [];
      }
  }


  // EM TESTE -------------------------------------------------------------------------------
  async function get_coordinators(course_id) {
    let data_map = new Map();
    
    try {
        const response = await fetch(constUrl+`/coordenadores/`).then(res => res.json());
        
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

async function post_renewal(lending_id, days) {
    
    
    try {
        const response = await fetch(constUrl + `/emprestimos/estender/`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer c38a7e02bfca0da201015ce51931b09d462080b7`
            },
            body: JSON.stringify({ ID_EMPRESTIMO: lending_id, NOVO_PRAZO: days })
        });
        
        const responseData = await response.json();
        console.log(response.ok ? "Renovação registrada com sucesso!" : `Erro na resposta da API: ${responseData}`);
        return response.ok;
    } catch (error) {
        console.error('Erro ao enviar a requisição: ', error);
        return false;
    }
}
  

    module.exports = {
        get_lendings,
        get_especific_lending,
        get_coordinators,
        post_renewal
      };