const venom = require('venom-bot');
const UserCommands = require('./events/user_commands');
const LendingRoutine = require('./events/routine');

//const { parse, addDays, isAfter, isToday, format } = require('date-fns');

const cron = require('node-cron');

venom
  .create({
    session: 'bot-whatsapp',
    multidevice: true,
    folderNameToken: 'tokens',
    headless: true,
    logQR: true,
    debug: true,
    disableWelcome: true,
    updatesLog: false
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log('Erro ao iniciar a sessão: ', erro);
  });

  /*async function GetLendings(){
  //Armazenando todos os dados do .json 
  fetch('https://marciossupiais.shop/tcc/alunos')
  .then(res => res.json())
  .then(({ DATA }) => {
    /*filteredArray = DATA.filter(a => 
      isToday(
        addDays(parse(a.data_aluguel, 'dd-MM-yy', new Date()), Number(a.prazo)-3) //2 dias serão para o aviso antecipado, 1 pelo dia do aluguel que tbm é descontado
      ) == true);*/
      //const filteredArray = DATA.filter(a => a.data_aluguel === a.data_aluguel);

      
      //return filteredArray;
  //})
  //.catch(console.error);
//}

  /*setTimeout(() => {
    let lending_array = GetLendings() || [];
    console.log(lending_array);
  }, 2000);*/
  
  
  
  // Função para buscar os dados da API e armazenar no Map apenas os itens filtrados
  
  
  // Chama a função para carregar os dados
  //fetchData();
  // Supondo que você tenha um item com id 1 e nome "Maria Santos"
  
  
  // Exportando o Map se estiver usando módulos
  // export { dataMap };
  
  
  /*setTimeout(() => {
    dataMap.forEach(item => console.log(item));
  }, 2000);*/

  
  //lending_routine.message_sender(client);

  
  
  

function start(client) {
  
  console.log("API CHAMADA");
  

  
  const user_commands = new UserCommands();
  const lending_routine = new LendingRoutine();



  lending_routine.message_sender(client);
  
  
  /*for (let i = 0; i < 20; i++) {
    client.sendText('557599772720@c.us', `Mensagem de spam!!!`)
      .then((result) => {
        console.log('Mensagem enviada com sucesso: ', result);
      })
      .catch((erro) => {
        console.error('Erro ao enviar a mensagem: ', erro);
      });
  }*/
      cron.schedule('0 18 * * 1-5', () => {     //[0]-minutos; [18]-horas da tarde; [*]-durante todo o mês; [*]-todos os meses; [1-5]-segunda a sexta*
        console.log('-- HORARIO DE VERFICAÇÃO --');
        //lending_routine.message_sender(client);
    }, {
        timezone: "America/Sao_Paulo" // Ajuste o fuso horário conforme necessário!
    });
  
    

  
  user_commands.reply_options(client);

  
}
