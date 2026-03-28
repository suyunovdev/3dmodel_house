import { bot } from './bot'

async function bootstrap() {
  console.log('🤖 Starting Telegram Bot...')
  await bot.launch()
  console.log('✅ Bot is running!')

  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

bootstrap().catch(err => {
  console.error('Failed to start bot:', err)
  process.exit(1)
})
