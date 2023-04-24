import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({ path: join(__dirname, '..', '.env.local') });

import { client } from './client';
import { loadCommands } from './libs/discordjs/load-commands';
import { refreshSlashCommands } from './libs/discordjs/refresh-slash-commands';
import { loadEvents } from './libs/discordjs/load-events';

async function bootstrap() {
  const commands = await loadCommands(client);
  await refreshSlashCommands(commands);

  await loadEvents(client);

  client.login(process.env.DISCORD_BOT_TOKEN);
}

bootstrap();
