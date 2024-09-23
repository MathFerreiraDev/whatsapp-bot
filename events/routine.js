const actionCommands = require('../commands/actions');
const messagesTypes = require('../commands/messages');
const apiSource = require("./api_conform");





class LendingRoutine {


  constructor() {



    /*axios.getAdapter(api_url).then(response => {
      const renewal_data = response.data.filter(item => item.nome === "Maria Santos");
      console.log(renewal_data);
    }).catch(error => console.error("-- Erro ao consultar dados da API: ", error));*/



    // Fazer a requisição e processar a resposta


  }

  async coordinator_sender(lending_season){
    let dataMap_students = apiSource.get_especific_student(lending_season.aluno_rm);
    const studentData = [...(await dataMap_students).values()].find(item => item.rm === lending_season.aluno_rm);
    const coordinatorsData = await apiSource.get_coordinators(studentData.id_curso);

        setTimeout(() => {
          for (const [key, coordinator] of coordinatorsData) {

            const alert_body = messagesTypes.coordinatorBodyMessage(lending, studentData, coordinator, lending_final_date, lending_initial_date);
           
            actionCommands.sendMessage(client, coordinator.telefone, alert_body, "coordenador");
          }
        }, 500);
  }


  async message_sender(client) {


    let dataMap_lendings = await apiSource.get_lendings();
    console.log(dataMap_lendings);

    console.log("CHAMANDO ALUNOS-----------------------");
    //REALIZANDO SOB CADA EMPRESTIMO ADQUIRIDO

    for (const [key, lending] of dataMap_lendings) {

      // Imprime o campo idade de cada item

      console.log("CHAMANDO POR RM-----------------------");
      console.log(lending.aluno_rm);
      //let dataMap_students = apiSource.get_student(lending.aluno_rm);


      

      //Verificar o período do empréstimo
      const student_phone = lending.aluno_telefone;
      const lending_final_date = actionCommands.addDaysToDate(lending.data_aluguel, lending.prazo);
      const lending_initial_date = new Date(lending.data_aluguel).toLocaleDateString('pt-BR');
      let message_body;


      if (true) {//await actionCommands.checkIsTodayDataAPI(lending, 2)){ //2 dias
        message_body = messagesTypes.messageBodyGenerator(2, lending, lending, lending_final_date, lending_initial_date);

      } else if (await actionCommands.checkIsTodayDataAPI(lending, 1)) {
        message_body = messagesTypes.messageBodyGenerator(1, lending, lending, lending_final_date, lending_initial_date);

      } else if (await actionCommands.checkIsTodayDataAPI(lending, 0)) {
        message_body = messagesTypes.messageBodyGenerator(0, lending, lending, lending_final_date, lending_initial_date);

      }


       await actionCommands.sendMessage(client, student_phone, message_body, "aluno");

       await actionCommands.delay(5000);


         if(parseInt(lending.renovavel) == 1){

           message_body = "Parece que a renovação automática para este livro ainda está habilitada, digite */renovar* caso deseje renovar o aluguel de seu livro por mais *7 dias* ";
           await actionCommands.sendMessage(client, student_phone, message_body, "aluno");

         }

      //Adicionar veriricação para mensagem de renovação


      if (parseInt(lending.renovavel) == 1) { //&& dia atrasado
        await coordinator_sender(lending);
      }

      await actionCommands.delay(5000);



    };




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
