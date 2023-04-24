import type { Client } from 'discord.js';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CreateEventResponse } from '~/utils/create-event.utils';

const EVENTS_PATH = join(__dirname, '..', '..', 'events');

export async function loadEvents(client: Client) {
  const eventsFolder = readdirSync(EVENTS_PATH).filter((file) =>
    file.endsWith('.ts'),
  );

  for (const file of eventsFolder) {
    const filePath = join(EVENTS_PATH, file);
    const {
      default: { ...event },
    }: { default: CreateEventResponse } = await import(filePath);

    if (!('name' in event) || !('execute' in event) || !('once' in event)) {
      console.warn(
        `[WARNING] The event at ${filePath} is missing a required 'name', 'execute' or 'once' property`,
      );

      continue;
    }

    if (event.once)
      client.once(event.name, (...args) => event.execute(...args));
    else client.on(event.name, (...args) => event.execute(...args));
  }
}
