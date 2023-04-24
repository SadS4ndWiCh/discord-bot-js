import type { ClientEvents } from 'discord.js';

type ClientEventsKeys = keyof ClientEvents;

export interface CreateEventProps<KEventName extends ClientEventsKeys> {
  name: KEventName;
  once: boolean;
  execute: (...data: ClientEvents[KEventName]) => Promise<void>;
}

export function createEvent<KEventName extends ClientEventsKeys>({
  name,
  once,
  execute,
}: CreateEventProps<KEventName>) {
  return {
    name,
    once,
    execute,
  };
}

export type CreateEventResponse = ReturnType<typeof createEvent>;
