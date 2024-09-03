const actionCommands = require('../commands/actions');
const apiSource = require("./api_conform");
const userStates = {};

class UserCommands {
    constructor() {
        var check_renewal = false;
    }
    
    async reply_options(client) {

        
        client.onMessage(message => {
            //FAZER CHECAGEM SE QUEM ENVIOU A MENSAGEM É UM ALUNO

            console.log("-- SINAL RECEPTADO");
            const phone_number = message.from.slice(2, -5);
            const get_message = message.body.toLowerCase();
            //VERIFICA SE O NÚMERO POSSUI ALGUM STEP // COLOCAR UM IF SE CASO OCORRER /SETAR, O ESTADO VIRA ZERO ou delete userStates[userId];
            if (!userStates[phone_number]) {
                userStates[phone_number] = { step: 0, request_map: 0 };
              }
            
            //if (message.body.toLowerCase() === '/renovar' && !message.isGroupMsg) {
            
                switch (userStates[phone_number].step) {
                  // COMANDO DE "/RENOVAR"
                    case 0:
                      if(get_message === '/renovar'){
                        const map_result = apiSource.get_especific_lending(phone_number);
                        
                        if(map_result != []){

                          let verifity_request_body;
                          for (const [key, item] of map_result) {
                            verifity_request_body += `RONOVACAO${item.id} - ${item.livro_titulo}\n`;
                          }

                        actionCommands.sendMessage(client, phone_number, `Olá!, vejamos os livros que alugados que você pode renovar...\n Ei! acabei achando essa lista, que tal?\n ${verifity_request_body}\n\n *Caso queira renovar algum desses...basta digitar seu devido código!*`, "solicitador");
                        userStates[phone_number].step++;
                        userStates[phone_number].request_map = map_result;
                        }else {
                          actionCommands.sendMessage(client, phone_number, "Seu número não possui nenhum empéstimo registrado", "solicitador");
                        }
                      }
                      break;
                    case 1:
                      if(get_message.includes("renovacao")){
                      
                      let lending_id = null;
                      //COLOR VERIFICADOR P AUMENTAR O ESTADO DURANTE CADA AÇÃO
                      if (Array.from(userStates[phone_number].request_map.entries()).some(([key, item]) => key === parseInt(get_message.substring(6)) && (lending_id = key))) {
                        
                        if(apiSource.post_renewal(lending_id, 7)){
                        actionCommands.sendMessage(client, phone_number, `O empréstimo de id ${lending_id} foi renovado por 14 dias!`, "solicitador");
                        }else{
                          actionCommands.sendMessage(client, phone_number, `Ops, hou um erro, que tal tentar mais tarde?`, "solicitador");
                        }


                        userStates[phone_number].step = 0;
                      } else {
                        actionCommands.sendMessage(client, phone_number, "Estou sob passo 1", "solicitador");
                      }


                      userStates[phone_number].step++;
                      }
                      break;
                    case 2:
                      //userStates[userId].idade = message.body;
                      actionCommands.sendMessage(client, phone_number, "Estou sob passo 2", "solicitador");
                      userStates[phone_number].step++;
                      break;
                    case 3:
                      
                      actionCommands.sendMessage(client, phone_number, "Estou sob passo 3", "solicitador");
                        // Reseta o estado para que o usuário possa começar de novo se necessário
                      break;
                    default:
                        actionCommands.sendMessage(client, phone_number, "Erro ao contactar", "solicitador");
                      delete userStates[phone_number];  // Reseta em caso de erro
                      break;
                  }


                console.log(`-- Variavel é true para o número ${phone_number}`);
              
             
             // this.check_renewal = true;
           // }
          });
        

    }

}

module.exports = UserCommands;