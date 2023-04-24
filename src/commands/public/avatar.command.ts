import { createCommand } from '~/utils/create-command.utils';

export default createCommand({
  options: { name: 'avatar', description: 'Sample' },
  async fn(interaction) {
    await interaction.reply('Some sample response');
  },
});
