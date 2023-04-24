import { SlashCommandBuilder, type CommandInteraction } from 'discord.js';

type CommandOptions = {
  name: string;
  description: string;
};

export interface CreateCommandProps {
  options: CommandOptions;
  fn: (interaction: CommandInteraction) => Promise<void>;
}

export function createCommand({ options, fn }: CreateCommandProps) {
  const slashCommandBuilderData = new SlashCommandBuilder()
    .setName(options.name)
    .setDescription(options.description);

  return {
    data: slashCommandBuilderData,
    execute: fn,
  };
}

export type CreateCommandResponse = ReturnType<typeof createCommand>;
