# ── Stage 1: Dependencies ────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

RUN npm install -g pnpm@9

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/frontend/package.json ./packages/frontend/

RUN pnpm install --frozen-lockfile \
    --filter @ai-house-planner/shared \
    --filter @ai-house-planner/frontend

# ── Stage 2: Builder ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app ./
COPY packages/shared ./packages/shared
COPY packages/frontend ./packages/frontend

ARG NEXT_PUBLIC_API_URL=http://localhost:3001/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm --filter @ai-house-planner/shared build
RUN pnpm --filter @ai-house-planner/frontend build

# ── Stage 3: Runner ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S nextuser -G appgroup

COPY --from=builder /app/packages/frontend/public ./public
COPY --from=builder --chown=nextuser:appgroup /app/packages/frontend/.next/standalone ./
COPY --from=builder --chown=nextuser:appgroup /app/packages/frontend/.next/static ./.next/static

USER nextuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
