import type { Context } from 'telegraf'
import { getSession, updateSession, clearSession } from '../session/session'
import { styleKeyboard } from '../keyboards/style.keyboard'
import { confirmKeyboard } from '../keyboards/confirm.keyboard'
import { generatePlan, generateImage, saveProject } from '../api/plan.api'
import { formatPlanMessage } from '../utils/formatter'
import { t } from '../utils/i18n'

export async function messageHandler(ctx: Context): Promise<void> {
  const userId = ctx.from?.id
  if (!userId || !('text' in ctx.message!)) return

  const text = (ctx.message as { text: string }).text
  const session = await getSession(userId)

  if (text === '🏠 Yangi reja yaratish' || text === '/generate') {
    await updateSession(userId, { step: 'area' })
    await ctx.reply(t('ask_area'))
    return
  }

  if (text === '📁 Loyihalarim' || text === '/history') {
    const { historyCommand } = await import('../commands/history.command')
    await historyCommand(ctx)
    return
  }

  if (!session.step) return

  switch (session.step) {
    case 'area': {
      const area = parseFloat(text)
      if (isNaN(area) || area < 20 || area > 2000) {
        await ctx.reply(t('invalid_area'))
        return
      }
      await updateSession(userId, { area, step: 'floors' })
      await ctx.reply(t('ask_floors'))
      break
    }

    case 'floors': {
      const floors = parseInt(text)
      if (isNaN(floors) || floors < 1 || floors > 5) {
        await ctx.reply(t('invalid_floors'))
        return
      }
      await updateSession(userId, { floors, step: 'bedrooms' })
      await ctx.reply(t('ask_bedrooms'))
      break
    }

    case 'bedrooms': {
      const bedrooms = parseInt(text)
      if (isNaN(bedrooms) || bedrooms < 1 || bedrooms > 10) {
        await ctx.reply(t('invalid_bedrooms'))
        return
      }
      await updateSession(userId, { bedrooms, step: 'style' })
      await ctx.reply(t('ask_style'), styleKeyboard)
      break
    }

    case 'extra': {
      const extra = text === '/skip' ? undefined : text
      await updateSession(userId, { extra, step: 'done' })
      await handleGenerate(ctx, userId)
      break
    }
  }
}

async function handleGenerate(ctx: Context, userId: number): Promise<void> {
  const session = await getSession(userId)
  const loadingMsg = await ctx.reply(t('generating'))

  try {
    const planResult = await generatePlan({
      area: session.area!,
      floors: session.floors!,
      bedrooms: session.bedrooms!,
      style: session.style as 'modern' | 'classic' | 'minimalist' | 'industrial' | 'scandinavian',
      extra: session.extra,
    })

    const message = formatPlanMessage(planResult.plan, planResult.explanation)
    await ctx.telegram.deleteMessage(ctx.chat!.id, (loadingMsg as { message_id: number }).message_id)
    await ctx.reply(message, { parse_mode: 'Markdown', ...confirmKeyboard })

    // Generate image in background
    ctx.reply(t('image_generating')).then(async () => {
      try {
        const imageResult = await generateImage(planResult.imagePrompt)
        await ctx.replyWithPhoto(imageResult.imageUrl)

        // Auto-save project
        await saveProject({
          inputData: { area: session.area, floors: session.floors, bedrooms: session.bedrooms, style: session.style },
          resultJson: planResult.plan as unknown as Record<string, unknown>,
          imageUrl: imageResult.imageUrl,
          explanation: planResult.explanation,
        })
      } catch {
        // Image generation failure is non-fatal
      }
    })

    await clearSession(userId)
  } catch {
    await ctx.reply(t('error'))
    await clearSession(userId)
  }
}
