# ── Stage 1: Builder ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@9

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/telegram-bot/package.json ./packages/telegram-bot/

RUN pnpm install --frozen-lockfile \
    --filter @ai-house-planner/shared \
    --filter @ai-house-planner/telegram-bot

COPY packages/shared ./packages/shared
RUN pnpm --filter @ai-house-planner/shared build

COPY packages/telegram-bot ./packages/telegram-bot
RUN pnpm --filter @ai-house-planner/telegram-bot build

# ── Stage 2: Runner ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm@9 && addgroup -S appgroup && adduser -S botuser -G appgroup

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/telegram-bot/package.json ./packages/telegram-bot/

RUN pnpm install --frozen-lockfile --prod \
    --filter @ai-house-planner/shared \
    --filter @ai-house-planner/telegram-bot

COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/telegram-bot/dist ./packages/telegram-bot/dist

USER botuser
CMD ["node", "packages/telegram-bot/dist/index.js"]
