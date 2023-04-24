import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { REST, Routes } from 'discord.js';

export async function refreshSlashCommands(
  commands: RESTPostAPIChatInputApplicationCommandsJSONBody[],
) {
  const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN as string);

  try {
    console.log(
      `[WARNING] Starting Refreshing ${commands.length} application (/) commands.`,
    );

    const data: any[] = (await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID as string,
        process.env.GUILD_ID as string,
      ),
      { body: commands },
    )) as any[];

    console.log(
      `[WARNING] Successfully reloaded ${data.length} application (/) commands`,
    );
  } catch (err) {
    console.error(err);
  }
}
