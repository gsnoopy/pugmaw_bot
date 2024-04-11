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
    const fileName = './archives/recharges.txt';
    const fileStream = fs.createWriteStream(fileName, { flags: 'a' });
    fileStream.write(formattedMessage + '\n');
    fileStream.close();
  }

  if (message.channel.id === '1228048747595038763') {
    if (message.content.startsWith("[KEY]")) {
      const timestamp = new Date().toLocaleString();
      const formattedMessage = `${timestamp} - ${message.content}`;
      const fileName = './archives/keys.txt';
      const fileStream = fs.createWriteStream(fileName, { flags: 'a' });
      fileStream.write(formattedMessage + '\n');
      fileStream.end();
    }
  }

  if (message.channel.id === '1228048789684883598') {
      const timestamp = new Date().toLocaleString();
      const formattedMessage = `${timestamp} - ${message.content}`;
      const fileName = './archives/registrations.txt';
      const fileStream = fs.createWriteStream(fileName, { flags: 'a' });
      fileStream.write(formattedMessage + '\n');
      fileStream.end();
    }


  if (message.channel.id === '1228048813223182397') {
      const timestamp = new Date().toLocaleString();
      const formattedMessage = `${timestamp} - ${message.content}`;
      const fileName = './archives/sales.txt';
      const fileStream = fs.createWriteStream(fileName, { flags: 'a' });
      fileStream.write(formattedMessage + '\n');
      fileStream.end();
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