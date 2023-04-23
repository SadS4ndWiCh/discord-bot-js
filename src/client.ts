import { Client, Events, GatewayIntentBits } from 'discord.js';

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });
