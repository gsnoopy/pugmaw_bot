const { Discord, Client, GatewayIntentBits } = require('./imports');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.slashCommands = new Discord.Collection();
require('./handler')(client);

const { createTicket } = require('./modules/createModals/createTicket');
const { submitTicket } = require('./modules/submitModals/submitTicket');
const { deleteTicket } = require('./modules/pressButtons/deleteTicket');


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

});

client.on('messageCreate', async (message) => {
  if (message.channel.id === '1227751143913033729') {
    const timestamp = new Date().toLocaleString();
    const formattedMessage = `${timestamp} - ${message.content}`;
    const fileName = 'recharges.txt';
    const fileStream = fs.createWriteStream(fileName, { flags: 'a' });
    fileStream.write(formattedMessage + '\n');
    fileStream.close();
  }
});

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const command = client.slashCommands.get(interaction.commandName);

    if (command) {
      command.run(client, interaction);
    }

  }

  if (interaction.isButton()) {

    switch (interaction.customId) {
      case 'ticket':
        createTicket(interaction);
        break;
      case 'deleteTicket':
        deleteTicket(interaction);
        break;

      default:
    }
  }

  if (interaction.isModalSubmit()) {
    switch (interaction.customId) {

      case 'ticketModal':
        submitTicket(interaction);
        break;
        
      default:
    }
  }

});

client.login(process.env.BOT_TOKEN);
module.exports = client;