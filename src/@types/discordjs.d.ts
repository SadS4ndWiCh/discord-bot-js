import type {
  Client as DClient,
  Collection,
  SlashCommandBuilder,
} from 'discord.js';

declare module 'discord.js' {
  interface Client extends DClient {
    commands: Collection<
      string,
      {
        data: SlashCommandBuilder;
        execute: (interaction: CommandInteraction) => Promise<void>;
      }
    >;
  }
}
