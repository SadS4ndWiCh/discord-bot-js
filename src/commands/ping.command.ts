import { createCommand } from '~/utils/create-command.utils';

export default createCommand({
  options: { name: 'ping', description: 'Replies with Pong!' },
  fn: async (interaction) => {
    await interaction.reply('Pong!');
  },
});
