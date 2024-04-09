const Discord = require("discord.js")
const crypto = require('crypto');
const fs = require('fs');
const createKey = require('../../database/createKey');

module.exports = {
  name: "add_key",
  description: "[ADM] Adicionar saldo para um usuário",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "valor",
      description: "Digite o valor que a Key terá",
      required: true
    },
    {
        type: Discord.ApplicationCommandOptionType.String,
        name: "quantidade",
        description: "Quantas keys serão criadas",
        required: true
    }
],
  run: async (client,interaction) => {

    try{

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

            interaction.reply({ content: `Você não possui permissão para utilzar este comando!`});
      
          } else {
      
            await interaction.deferReply();
            
            const valorString = interaction.options.getString("valor");
            const valor = Number(valorString);
            const qtdString= interaction.options.getString("quantidade");
            const qtd = Number(qtdString);

            for (let i = 0; i < qtd; i++) {
              const id =  await readTXT()
              const chave = crypto.createHash('sha1').update(String(id)).digest('hex');
              await createKey(chave,valor);
              const proxId = Number(id) + 1
              console.log(proxId)
              await updateTXT(String(proxId))
              interaction.channel.send({content: `${chave}`})
              
            }
           
            interaction.editReply({content: `**${qtd} Keys criadas no banco de dados com valor: R$ ${valor}**`});
          
          }

    }catch(error){
        console.error(error)
        interaction.editReply({content: `Digita o valor direito LIL`})
    }

  }
}

async function readTXT() {
    const caminhoDoArquivo = 'currentID.txt';
    const data = fs.readFileSync(caminhoDoArquivo, 'utf8');
    return data
}


async function updateTXT(id){

    const caminhoDoArquivo = 'currentID.txt';
    
    // Apaga o conteúdo do arquivo
    await fs.promises.writeFile(caminhoDoArquivo, id);

    console.log('Novo valor adicionado com sucesso.');
}