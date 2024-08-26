const actionCommands = require('../commands/actions');
const userStates = {};

class UserCommands {
    constructor() {
        var check_renewal = false;
    }
    
    async reply_options(client) {

        
        client.onMessage((message) => {
            //FAZER CHECAGEM SE QUEM ENVIOU A MENSAGEM É UM ALUNO
            console.log("-- SINAL RECEPTADO");
            
            //VERIFICA SE O NÚMERO POSSUI ALGUM STEP // COLOCAR UM IF SE CASO OCORRER /SETAR, O ESTADO VIRA ZERO ou delete userStates[userId];
            if (!userStates[userId]) {
                userStates[userId] = { step: 0 };
              }
            
            //if (message.body.toLowerCase() === '/renovar' && !message.isGroupMsg) {
                let phone_number = '14991946341'
            
                switch (userStates[userId].step) {
                    case 0:
                        actionCommands.sendMessage(client, phone_number, "Estou sob passo 0", "solicitador");
                      userStates[userId].step++;
                      break;
                    case 1:
                      userStates[userId].nome = message.body;
                      actionCommands.sendMessage(client, phone_number, "Estou sob passo 1", "solicitador");
                      //COLOR VERIFICADOR P AUMENTAR O ESTADO DURANTE CADA AÇÃO
                      userStates[userId].step++;
                      break;
                    case 2:
                      userStates[userId].idade = message.body;
                      actionCommands.sendMessage(client, phone_number, "Estou sob passo 2", "solicitador");
                      userStates[userId].step++;
                      break;
                    case 3:
                      userStates[userId].email = message.body;
                      actionCommands.sendMessage(client, phone_number, "Estou sob passo 3", "solicitador");
                        // Reseta o estado para que o usuário possa começar de novo se necessário
                      break;
                    default:
                        actionCommands.sendMessage(client, phone_number, "Erro ao contactar", "solicitador");
                      delete userStates[userId];  // Reseta em caso de erro
                      break;
                  }


                console.log(`-- Variavel é true para o número ${phone_number}`);
              
             
             // this.check_renewal = true;
           // }
          });
        

    }

}

module.exports = UserCommands;