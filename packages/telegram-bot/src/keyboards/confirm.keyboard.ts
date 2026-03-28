import { Markup } from 'telegraf'

export const confirmKeyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback('🔄 Qayta yaratish', 'retry'),
    Markup.button.callback('✨ Yangi reja', 'new_plan'),
  ],
  [Markup.button.callback('💾 Saqlash', 'save_plan')],
])
