import { createCommand } from '~/utils/create-command.utils';

export default createCommand({
  options: { name: 'hello', description: 'Only replies with a Hello :)' },
  fn: async (interaction) => {
    await interaction.reply(`Hello, ${interaction.user.username}!`);
  },
});
