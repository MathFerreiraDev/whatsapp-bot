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




  async message_sender(client) {


    let dataMap_lendings = await apiSource.get_lendings();
    console.log(dataMap_lendings);

    console.log("CHAMANDO ALUNOS-----------------------");
    //REALIZANDO SOB CADA EMPRESTIMO ADQUIRIDO

    for (const [key, lending] of dataMap_lendings) {
      console.log(lending.aluno_rm); // Imprime o campo idade de cada item

      console.log("CHAMANDO POR RM-----------------------");
      let dataMap_students = apiSource.get_student(lending.aluno_rm);


      const studentData = [...(await dataMap_students).values()].find(item => item.rm === lending.aluno_rm);
      
      //Verificar o período do empréstimo
      const student_phone = studentData.telefone;
      const lending_final_date = actionCommands.addDaysToDate(lending.data_aluguel, lending.prazo);
      const lending_initial_date = new Date(lending.data_aluguel).toLocaleDateString('pt-BR');
      let message_body;
      

      if (true){//await actionCommands.checkIsTodayDataAPI(lending, 2)){ //2 dias
        message_body = messagesTypes.messageBodyGenerator(2, lending, studentData, lending_final_date, lending_initial_date);

      } else if (await actionCommands.checkIsTodayDataAPI(lending, 1)) {
        message_body = messagesTypes.messageBodyGenerator(1, lending, studentData, lending_final_date, lending_initial_date);

      } else if (await actionCommands.checkIsTodayDataAPI(lending, 0)) {
        message_body = messagesTypes.messageBodyGenerator(0, lending, studentData, lending_final_date, lending_initial_date);

      }

      actionCommands.sendMessage(client, student_phone, message_body, "aluno");

      //Adicionar veriricação para mensagem de renovação


      if (lending.renovavel == 1) {
        let coordinatorsData = await apiSource.get_coordinators(studentData.id_curso);

        setTimeout(() => {
          for (const [key, coordinator] of coordinatorsData) {

            const alert_body = messagesTypes.coordinatorBodyMessage(lending, studentData, coordinator, lending_final_date, lending_initial_date);
           
            actionCommands.sendMessage(client, coordinator.telefone, alert_body, "coordenador");
          }
        }, 2000);
      }



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