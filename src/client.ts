import { Client, Collection, GatewayIntentBits } from 'discord.js';

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
