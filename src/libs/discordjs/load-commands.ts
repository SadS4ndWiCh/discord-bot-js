import type {
  Client,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CreateCommandResponse } from '~/utils/create-command.utils';

const COMMANDS_PATH = join(__dirname, '..', '..', 'commands');

export async function loadCommands(client: Client) {
  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
  const commandFiles = readdirSync(COMMANDS_PATH).filter((file) =>
    file.endsWith('.ts'),
  );

  for (const file of commandFiles) {
    const filePath = join(COMMANDS_PATH, file);
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
