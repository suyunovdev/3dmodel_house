import type { Context } from 'telegraf'
import { updateSession } from '../session/session'
import { t } from '../utils/i18n'

export async function generateCommand(ctx: Context): Promise<void> {
  const userId = ctx.from?.id
  if (!userId) return

  updateSession(userId, { step: 'area' })
  await ctx.reply(t('ask_area'), { parse_mode: 'Markdown' })
}
