
class LendingRoutine {

  
    constructor() {

        
    
        /*axios.getAdapter(api_url).then(response => {
          const renewal_data = response.data.filter(item => item.nome === "Maria Santos");
          console.log(renewal_data);
        }).catch(error => console.error("-- Erro ao consultar dados da API: ", error));*/

        

// Fazer a requisição e processar a resposta
      

      }
     
      
    static async get_lendings() {
      var data_map = new Map();
      
      try {
          const response = await fetch("https://marciossupiais.shop/tcc/emprestimos/").then(res => res.json())

          
          
          
          
          // Filtra e armazena no Map apenas os itens com o nome "Maria Santos"
          response.DATA
              .filter(item => require('date-fns').isToday(
                require('date-fns').addDays(require('date-fns').parse(item.data_aluguel, 'dd-MM-yy', new Date()), Number(item.prazo)) //2 dias serão para o aviso antecipado, 1 pelo dia do aluguel que tbm é descontado
              ) == true) // Filtrando os itens
              .forEach(item => {
                  data_map.set(item.rm, item); // Armazenando no Map
              });
  

          return data_map;
          
      } catch (error) {
          console.error('Erro ao buscar dados:', error);
          return [];
      }
  }
    
      
    
    message_sender(client) {

      





      
        for (let i = 0; i < 2; i++) {
          client.sendText('5514991335012@c.us', `Essa mensagem está sendo enviada pelo robo automatizado! Msg:${i}`)
            .then((result) => {
              console.log('Mensagem enviada com sucesso: ', result);
            })
            .catch((erro) => {
              console.error('Erro ao enviar a mensagem: ', erro);
            });
        }
    }


}

module.exports = LendingRoutine;