# AI House Planner

AI orqali uy rejasi (2D plan), tavsif va dizayn yaratuvchi platforma.

## Texnologiyalar

- **Backend**: Node.js + Express + TypeScript
- **AI**: OpenAI GPT-4o + DALL·E 3
- **Bot**: Telegraf v4
- **Frontend**: Next.js 14 + Tailwind CSS + Zustand
- **Database**: MongoDB + Mongoose
- **Monorepo**: Turborepo + pnpm

## O'rnatish

```bash
# Dependencies
pnpm install

# Environment
cp .env.example .env
# .env faylini to'ldiring

# Development
pnpm dev

# Build
pnpm build
```

## Struktura

```
packages/
├── shared/        # Umumiy typlar
├── backend/       # API server
├── telegram-bot/  # Telegram bot
└── frontend/      # Web app
```

## API Endpointlar

| Method | Endpoint | Tavsif |
|--------|----------|--------|
| POST | /api/generate-plan | Uy rejasi generatsiya |
| POST | /api/generate-image | Rasm generatsiya |
| GET | /api/projects | Loyihalar ro'yxati |
| POST | /api/projects | Yangi loyiha saqlash |
| GET | /api/health | Server holati |

## Deploy

- **Frontend**: Vercel
- **Backend**: Render / VPS
- **Database**: MongoDB Atlas
