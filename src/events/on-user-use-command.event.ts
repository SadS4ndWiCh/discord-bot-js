import { Interaction } from 'discord.js';

export async function onUserUseCommand(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.log(interaction.client.commands);
    console.error(
      `[ERROR]: No command matching ${interaction.commandName} was found.`,
    );
    return;
  }

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
}
