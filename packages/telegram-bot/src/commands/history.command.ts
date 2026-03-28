import type { Context } from 'telegraf'
import { getProjects } from '../api/plan.api'
import { formatProjectCard } from '../utils/formatter'
import { t } from '../utils/i18n'

export async function historyCommand(ctx: Context): Promise<void> {
  try {
    const result = await getProjects()
    const projects = result?.items ?? []

    if (projects.length === 0) {
      await ctx.reply(t('no_history'))
      return
    }

    const list = projects
      .slice(0, 10)
      .map((p: { _id: string; inputData: Record<string, unknown>; createdAt: Date }, i: number) => `${i + 1}. ${formatProjectCard(p)}`)
      .join('\n')

    await ctx.reply(`📁 *LOYIHALARIM:*\n\n${list}`, { parse_mode: 'Markdown' })
  } catch {
    await ctx.reply(t('error'))
  }
}
