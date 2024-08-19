const date = require('date-fns');


function checkIsTodayDataAPI(element, past_days) {
  if (date.isToday(date.addDays(date.parse(element.data_aluguel, 'yyyy-MM-dd', new Date()), Number(element.prazo) - past_days - 1))) {
    return true;
  } else {
    return false;
  }
}

function addDaysToDate(past_date, add_days){
   return date.format(date.addDays(new Date(past_date).toLocaleDateString('pt-BR'), parseInt(add_days, 10)), 'dd/MM/yyyy');
}

function sendMessage(client_user, number, message_body, to_person) {

  client_user.sendText(`55${number}@c.us`, message_body)
    .then((result) => {
      console.log(`Mensagem enviada com sucesso para o ${to_person}`, result);
    })
    .catch((erro) => {
      console.error(`Erro ao enviar a mensagem para o ${to_person}`, erro);
    });

}

function messageBodyGenerator(stituation, item_lending, item_student, item_date){
  const randomBody = ~~(Math.random() * 4) + 1;

  switch(stituation){
    case 2:
      
      switch (randomBody){
        
        case 1:
          return `*Olá ${item_student.nome}!👋*​\n`+
        `Faltam extamanete 2 dias para o aluguel do livro ${item_lending.livro_titulo} expirar!\n\n`+
        `*Você tem até o dia ${item_date} para realizar a devolução 🚨​👀*`;
        break;
        case 2:
          return `*Eai ${item_student.nome}, tudo beleza?! 😄*​​\n`+
          `Só te avisar que faltam 2 dias para o aluguel do livro ${item_lending.livro_titulo} acabar!\n\n`+
          `*Você vai ter até o dia ${item_date} para fazer a devolução dele, tenha uma boa tarde 😉*`;
        break;
        case 3:
          return `*Opa ${item_student.nome}, sou o [NOME DO BOT] e vim te trazer um racadinho 🤖*​​​\n`+
          `O livro ${item_lending.livro_titulo} que você alugou, está próximo de ter seu aluguel expirado, mais precisamente, daqui a 2 dias!\n\n`+
          `*Sua data limite será ${item_date}, fique esperto! 🧐​*`;
        break;
        case 4:
          return `*Boa tarde ${item_student.nome}, vim trazer um recado para você! 👓📖*\n`+
          `Parece que o livro ${item_lending.livro_titulo} alugado por você no dia ${item_lending.data_aluguel} está à 2 dias de expirar seu aluguel..\n\n`+
          `*Até o dia ${item_date} tenha atenção para realizar a devolução 🗣️​​*`;
        break;

      }

    break;

    case 1:

    switch (randomBody){
      case 1:
        return `*Eaí ${item_student.nome}!😃​🤙*\n`+
      `Parece que está faltando apenas 1 dia para o aluguel do livro ${item_lending.livro_titulo} expirar!\n\n`+
      `*Estou passando aqui para relembrar você, de que tem até o dia ${item_date} devolver esse item da nossa coletânea 📖🤓​​*`;
      break;
      case 2:
        return `*Eita ${item_student.nome}, tenho um aviso pra você 😮*​​​\n`+
        `O livro ${item_lending.livro_titulo} que você alugou está à 1 dia de encerrar seu aluguel\n\n`+
        `*Vá à nossa biblioteca até o dia ${item_date} para realizar a devolução! 👀*​`;
      break;
      case 3:
        return `*Saudações ${item_student.nome} ​👋​🤖*​​​\n`+
        `Parece que o livro ${item_lending.livro_titulo} o qual alugou, está à 1 dia te ter seu aluguel expirado!\n\n`+
        `*O dia ${item_date} será na data limite para realizar a devolução do livro, estou de olho ein... 👁️👁️*`;
      break;
      case 4:
        return `*Ei ${item_student.nome}, tudo certo amigo(a)? 😎​👍*​\n`+
        `O aluguel do livro ${item_lending.livro_titulo} está à 1 dia de expirar, desde que alugou na data de ${item_lending.data_aluguel}!\n\n`+
        `*Olha lá ein... terá até o dia ${item_date} para realizar a devolução​!​ 🦾​🔥*`;
      break;

    }
    
    break;

    case 0:

    switch (randomBody){
      case 1:
        return `*Opa, eai ${item_student.nome}, tenho um aviso para você! 🚨🚨​*\n`+
      `O alguel do livro ${item_lending.livro_titulo} irá expirar em breve! Em caso de atraso com a expiração, seus coordenadores serão notificados! \n\n`+
      `*${item_date} é a data limite de seu aluguel que foi realizado em ${item_lending.data_aluguel} 🕵️​👀*`;
      break;
      case 2:
        return `*${item_student.nome}, tenho um recado importante pra você! 🕵️😬*​​​\n`+
        `O livro que você alugou em ${item_lending.data_aluguel}, aquele tal de ${item_lending.livro_titulo}, está prestes a expirar em menos de um dia!\n\n`+
        `*O dia ${item_date} é o limite para fazer essa devolução, fique atento! Em caso de atrasos, seus coordenadores receberão uma notificação! 📅⚠️*`;
      break;
      case 3:
        return `*${item_student.nome}, tenho um pequeno alerta pra você, amigo! 🤖*​​​\n`+
        `Parece que a data limite para expiração do livro ${item_lending.livro_titulo} é daqui a menos de um dia! Lembra? Você alugou esse livro no dia ${item_lending.data_aluguel} ... \n\n`+
        `*Agora, ${item_date} é a data limite para devolver esse livro... estou de olho ein! 🧐*​`;
      break;
      case 4:
        return `*Boa tarde ${item_student.nome}, trago um comunicado pra você! 👓📖*\n`+
        `Durante a data ${item_lending.data_aluguel}, foi registrado que você alugou o livro ${item_lending.livro_titulo}, e parece que agora resta menos de um dia para seu prazo expirar!\n\n`+
        `*${item_date} ocorre a expiração do período de aluguel, vá até a biblioteca e resolva suas pendências! Em caso de atrasos, seus coordenadores podem ser notificados!​ 🔔📚*`;
      break;

    }

    break;

    case -1:

      switch (randomBody){
        case 1:
          return `*Eita, acho que tivemos um deslize ${item_student.nome}...😓💥*\n`+
        `Por conta de não devolver o livro ${item_lending.livro_titulo}, dentro do prazo de ${item_lending.prazo} dias, sendo o dia ${item_date}, dia limite para devolução, acabamos por enviar uma notificação aos seus coordenadores...\n\n`+
        `*Os coordenadores de seu curso estarão entrando em contato com você para então resolver a pendência! ​ 🔔📚*`;
        break;
        case 2:
          return `*${item_student.nome}, tenho uma notificação para você, colega...😕✋*\n`+
        `O livro ${item_lending.livro_titulo}  alugado por você em ${item_lending.data_aluguel} com um prazo ${item_lending.prazo} dias, não foi devolvido dentro da data, e por isso enviamos um pequeno relato aos coodenadores de seu curso...\n\n`+
        `*Os mesmos estarão averiguando a situação e entrando em contato com você em breve ​ 💬✍️*`;
        break;
        case 3:
          return `*Olá ${item_student.nome}, infelizmente, houve um ocorrido não muito legal!😣☝️*\n`+
        `O alguel do livro ${item_lending.livro_titulo}, feito por você, com o prazo de ${item_lending.prazo} dias, não teve o registro de sua devolução, até a data limite de ${item_date} ...\n\n`+
        `*Por conta disso, estaremos enviando uma solicitação para os coordenares de seu curso, que quando possível estarão entrando em contato contigo! ​ 👨‍🏫📲*`;
        break;
        case 4:
          return `*Vish..., eai ${item_student.nome}, tenho um aviso não tão bacana...🧐✉️ *\n`+
        `Foi registrado que em ${item_lending.data_aluguel} você alugou o livro ${item_lending.livro_titulo}, porém, parece que você acabou não devolvendo ele no prazo de seus ${item_lending.prazo} dias...\n\n`+
        `*Com isso, não tivemos outra escolha a não ser dar uma notificação aos seus coordenadores de curso, os mesmos estarão entrando em contato com você pelo atraso do livro que deveria ser devolvido em ${item_date} ​ 🕵️‍♀️📆*`;
        break;

      }

    break;

  }
}

module.exports = {
  checkIsTodayDataAPI,
  addDaysToDate,
  sendMessage,
  messageBodyGenerator
};