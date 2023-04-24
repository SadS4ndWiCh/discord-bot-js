import { Events } from 'discord.js';
import { createEvent } from '~/utils/create-event.utils';

export default createEvent({
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
});
