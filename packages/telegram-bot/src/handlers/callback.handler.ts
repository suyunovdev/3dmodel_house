import type { Context } from 'telegraf'
import { updateSession } from '../session/session'
import { t } from '../utils/i18n'
import { generateCommand } from '../commands/generate.command'

export async function callbackHandler(ctx: Context): Promise<void> {
  const data = (ctx.callbackQuery as { data?: string })?.data
  if (!data) return

  const userId = ctx.from?.id
  if (!userId) return

  await ctx.answerCbQuery()

  if (data.startsWith('style_')) {
    const style = data.replace('style_', '')
    updateSession(userId, { style, step: 'extra' })
    await ctx.reply(t('ask_extra'))
    return
  }

  switch (data) {
    case 'retry':
    case 'new_plan':
      await generateCommand(ctx)
      break

    case 'save_plan':
      await ctx.reply('✅ Loyiha saqlandi!')
      break
  }
}
