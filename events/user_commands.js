const actionCommands = require('../commands/actions');
const apiSource = require("./api_conform");
const userStates = {};

class UserCommands {
    constructor() {
        var check_renewal = false;
    }
    
    async reply_options(client, io) {   
      try {     
        client.onMessage(async message => {
          console.log("-- NOVA MENSAGEM");
            //FAZER CHECAGEM SE QUEM ENVIOU A MENSAGEM É UM ALUNO
          if(!message.isGroupMsg && message.type === "chat"){
            console.log("-- SINAL RECEPTADO");
            const phone_number = message.from.slice(2, -5);
            

            const get_message = message.body.toLowerCase();
            //VERIFICA SE O NÚMERO POSSUI ALGUM STEP // COLOCAR UM IF SE CASO OCORRER /SETAR, O ESTADO VIRA ZERO ou delete userStates[userId];
            if (!userStates[phone_number]) {
                userStates[phone_number] = { step: 0};
              }
            

              if(get_message === '/listar') {
                const map_result = await apiSource.get_especific_lending(phone_number);
              
                if(map_result.size != 0){
                  console.log("-- RESULTOU EM TRUE");
                  let verifity_request_body = "";

                  for (const [key, item] of map_result) {
                    if(item.renovavel == 1){
                      verifity_request_body += `\n*📖[/RENOVACAO${item.id}]* - _${item.livro_titulo}_\n*> expira em ${actionCommands.addDaysToDate(item.data_aluguel, item.prazo)}!* \n*-----------------------*`;
                    }else{
                      verifity_request_body += `\n*📖[JÁ RENOVADO]* - _${item.livro_titulo}_\n*> expira em ${actionCommands.addDaysToDate(item.data_aluguel, item.prazo)}!* \n*-----------------------*`;
                    }
                  }

                  console.log("-- A LISTA DE PENDENCIAS FOI MONTADA!");   
                  actionCommands.sendMessage(client, phone_number, `Olá! Vejamos os livros que alugados que você pode renovar...\nEi! acabei achando essa lista, que tal? \n${verifity_request_body}\n\n*Caso queira renovar algum desses...basta digitar seu devido código!*`, "solicitador");
                }else {
                  console.log("-- A LISTA DE PENDENCIAS NAO FOI MONTADA!");  
                  actionCommands.sendMessage(client, phone_number, "Seu número não possui nenhum empéstimo registrado", "solicitador");
                }

                console.log("Enviado!");

              }else if(get_message.startsWith("/renovacao")) {
                console.log("-- ACIONOU RENOVACAO");
                const map_result = await apiSource.get_especific_lending(phone_number);
                        
                let lending_id;
                if(map_result.size != 0){
                //COLOR VERIFICADOR P AUMENTAR O ESTADO DURANTE CADA AÇÃO
                if (Array.from(map_result.entries()).some(([key, item]) => key === parseInt(get_message.replace(/\D/g, '')) && item.renovacao === 1 && (lending_id = key) )) {
                  
                  if(apiSource.post_renewal(lending_id)){
                  actionCommands.sendMessage(client, phone_number, `O empréstimo de id ${lending_id} foi renovado por 14 dias!`, "solicitador");
                  
                  }else{
                    actionCommands.sendMessage(client,phone_number, `Ops, hou um erro, que tal tentar mais tarde?`, "solicitador");
                  }

                }else{
                  actionCommands.sendMessage(client, phone_number, `Verifique o empréstimo solicitado e tente novamente`, "solicitador");
                }
              }else{
                actionCommands.sendMessage(client, phone_number, "Seu número não possui nenhum empéstimo registrado", "solicitador");
              }
              }

              // VER SE AINDA VAI USAR ESSA PARTE BOMBA!


            //if (message.body.toLowerCase() === '/renovar' && !message.isGroupMsg) {
            
                /*switch (userStates[phone_number].step) {
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


                        
                      } else {
                        actionCommands.sendMessage(client, phone_number, "Eita, este não é um empréstimo registrado!", "solicitador");
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
           // }*/

            }
          });
  
        } catch (error) {
          console.error('ERRO AO PROCESSO DE RECEBIMENTO DE MENSAGENS');
          io.emit('status', "#error");
        }
    
        
    }

}

module.exports = UserCommands;