import type { Context } from 'telegraf'
import { t } from '../utils/i18n'

export async function helpCommand(ctx: Context): Promise<void> {
  await ctx.reply(t('help'), { parse_mode: 'Markdown' })
}
