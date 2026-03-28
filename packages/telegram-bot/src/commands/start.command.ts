import type { Context } from 'telegraf'
import { mainKeyboard } from '../keyboards/main.keyboard'
import { t } from '../utils/i18n'

export async function startCommand(ctx: Context): Promise<void> {
  await ctx.reply(t('start'), {
    parse_mode: 'Markdown',
    ...mainKeyboard,
  })
}
