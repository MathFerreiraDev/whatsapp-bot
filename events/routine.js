




class LendingRoutine {
  
  
    constructor() {

        
    
        /*axios.getAdapter(api_url).then(response => {
          const renewal_data = response.data.filter(item => item.nome === "Maria Santos");
          console.log(renewal_data);
        }).catch(error => console.error("-- Erro ao consultar dados da API: ", error));*/

        

// Fazer a requisição e processar a resposta
      

      }

      
      
    
    async message_sender(client) {

      
      let dataMap_lendings = await require('./api_conform').get_lendings();




      
        /*for (let i = 0; i < 2; i++) {
          client.sendText('5514991335012@c.us', `Essa mensagem está sendo enviada pelo robo automatizado! Msg:${i}`)
            .then((result) => {
              console.log('Mensagem enviada com sucesso: ', result);
            })
            .catch((erro) => {
              console.error('Erro ao enviar a mensagem: ', erro);
            });
        }*/
    }


}

module.exports = LendingRoutine;