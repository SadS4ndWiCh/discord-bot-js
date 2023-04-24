import type {
  Client,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';
import { join } from 'node:path';
import { CreateCommandResponse } from '~/utils/create-command.utils';
import { readdir } from '~/utils/readdir.utils';

const COMMANDS_PATH = join(__dirname, '..', '..', 'commands');

export async function loadCommands(client: Client) {
  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
  const commandFiles = readdir(COMMANDS_PATH, true).filter((file) =>
    file.endsWith('.ts'),
  );

  for (const filePath of commandFiles) {
    const {
      default: { ...command },
    }: { default: CreateCommandResponse } = await import(filePath);

    if (!('data' in command) || !('execute' in command)) {
      console.warn(
        `[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property`,
      );

      continue;
    }

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }

  return commands;
}
