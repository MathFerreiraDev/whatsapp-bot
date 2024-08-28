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
            
            //VERIFICA SE O NÚMERO POSSUI ALGUM STEP // COLOCAR UM IF SE CASO OCORRER /SETAR, O ESTADO VIRA ZERO ou delete userStates[userId];
            if (!userStates[phone_number]) {
                userStates[phone_number] = { step: 0, request_code: 0 };
              }
            
            //if (message.body.toLowerCase() === '/renovar' && !message.isGroupMsg) {
            
                switch (userStates[phone_number].step) {
                  // COMANDO DE "/RENOVAR"
                    case 0:
                      if(message.body.toLowerCase() === '/renovar'){
                        map_result = apiSource.get_especific_lending(phone_number);
                        if(map_result != []){
                        actionCommands.sendMessage(client, phone_number, "Digite o código de solicitação existente para o livro que deseja renovar", "solicitador");
                        userStates[phone_number].step++;
                        //userStates[phone_number].request_code = ;
                        }else {
                          actionCommands.sendMessage(client, phone_number, "Seu número não possui nenhum empéstimo registrado", "solicitador");
                        }
                      }
                      break;
                    case 1:
                      
                      actionCommands.sendMessage(client, phone_number, "Estou sob passo 1", "solicitador");
                      //COLOR VERIFICADOR P AUMENTAR O ESTADO DURANTE CADA AÇÃO
                      userStates[phone_number].step++;
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