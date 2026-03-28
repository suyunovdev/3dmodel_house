import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'
import { startCommand } from './commands/start.command'
import { helpCommand } from './commands/help.command'
import { generateCommand } from './commands/generate.command'
import { historyCommand } from './commands/history.command'
import { messageHandler } from './handlers/message.handler'
import { callbackHandler } from './handlers/callback.handler'
import { handleBotError } from './handlers/error.handler'

dotenv.config()

const token = process.env.BOT_TOKEN
if (!token) {
  console.error('BOT_TOKEN is not set')
  process.exit(1)
}

export const bot = new Telegraf(token)

// Commands
bot.start(startCommand)
bot.help(helpCommand)
bot.command('generate', generateCommand)
bot.command('history', historyCommand)

// Handlers
bot.on('text', messageHandler)
bot.on('callback_query', callbackHandler)

// Error handling
bot.catch(handleBotError)
