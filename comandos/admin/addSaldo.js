const Discord = require("discord.js")

module.exports = {
  name: "add_saldo",
  description: "[ADM] Adicionar saldo para um usuário",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "user",
      description: "Digite o id do user",
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

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

      await interaction.deferReply({ephemeral: true});
      
      const valorString = interaction.options.getString("valor");
      const valor = Number(valorString.replace(',', '.'));
      const user = interaction.options.getString("user");
  

      interaction.editReply({content: `<:CoinsIcon:1201060304365310003> Saldo anterior: R$ **${userSaldo}**\n<:CoinsIcon:1201060304365310003> Saldo novo: R$ **${newSaldo}**`, ephemeral: true});
    
    }
  }
}