class UserCommands {
    constructor() {
        var check_renewal = false;
    }
    
    reply_options(client) {

        
        client.onMessage((message) => {

            if (message.body.toLowerCase() === 'renovar' && !message.isGroupMsg && !this.check_renewal) {
              client.sendText(message.from, 'Opa, então você deseja renovar? te daremos 7 dias a mais, aproveite!')
                .then((result) => {
                  console.log('Mensagem enviada com sucesso: ', result);
                })
                .catch((erro) => {
                  console.error('Erro ao enviar mensagem: ', erro);
                });
                this.check_renewal = true;
            }
          });
        

    }

}

module.exports = UserCommands;