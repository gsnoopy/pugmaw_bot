const Discord = require("discord.js")
const updateSaldo = require('../../database/updateSaldo')

module.exports = {
  name: "add_saldo",
  description: "[ADM] Adicionar saldo para um usuário",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "user",
      description: "Digite o nome do usuário",
      required: true
    },
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "valor",
      description: "Digite o saldo a ser adicionado",
      required: true
  }
],
  run: async (client,interaction) => {

    try{

      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });
  
      } else {
  
        await interaction.deferReply({ephemeral: true});
        
        const valorString = interaction.options.getString("valor");
        const valor = Number(valorString);
        const valorSemDecimal = Math.floor(valor);
        const user = interaction.options.getString("user");
  
        await updateSaldo(user,valorSemDecimal)
  
        interaction.editReply({content: `${valorSemDecimal} adicionado para o usuário: **${user}**`, ephemeral: true});
      
      }

    }catch{
      interaction.editReply({content: `Digita direito ai LIL`, ephemeral: true});
    }
    
  }
}