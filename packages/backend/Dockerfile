# ── Stage 1: Builder ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@9

# Monorepo root files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/backend/package.json ./packages/backend/

# Install all deps (shared + backend)
RUN pnpm install --frozen-lockfile --filter @ai-house-planner/shared --filter @ai-house-planner/backend

# Build shared first
COPY packages/shared ./packages/shared
RUN pnpm --filter @ai-house-planner/shared build

# Build backend
COPY packages/backend ./packages/backend
RUN pnpm --filter @ai-house-planner/backend build

# ── Stage 2: Runner ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm@9 && addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/backend/package.json ./packages/backend/

RUN pnpm install --frozen-lockfile --prod \
    --filter @ai-house-planner/shared \
    --filter @ai-house-planner/backend

COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/backend/dist ./packages/backend/dist

USER appuser
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/health || exit 1

CMD ["node", "packages/backend/dist/server.js"]
