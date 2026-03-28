import { Markup } from 'telegraf'

export const styleKeyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback('🏙️ Modern', 'style_modern'),
    Markup.button.callback('🏛️ Classic', 'style_classic'),
  ],
  [
    Markup.button.callback('⬜ Minimalist', 'style_minimalist'),
    Markup.button.callback('🏭 Industrial', 'style_industrial'),
  ],
  [Markup.button.callback('🏡 Scandinavian', 'style_scandinavian')],
])
