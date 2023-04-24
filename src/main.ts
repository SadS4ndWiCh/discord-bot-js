import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({ path: join(__dirname, '..', '.env.local') });

import { Events } from 'discord.js';
import { client } from './client';
import { loadCommands } from './libs/discordjs/load-commands';
import { refreshSlashCommands } from './libs/discordjs/refresh-slash-commands';
import { onUserUseCommand } from './events/on-user-use-command.event';

async function bootstrap() {
  const commands = await loadCommands(client);
  await refreshSlashCommands(commands);

  client.on(Events.InteractionCreate, onUserUseCommand);

  client.login(process.env.DISCORD_BOT_TOKEN);
  client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
  });
}

bootstrap();
