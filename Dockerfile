# Install dependencies only when needed
FROM node:16-alpine AS deps
  RUN apk add --no-cache libc6-compat g++ make py3-pip git
  WORKDIR /app
  COPY package.json pnpm-lock.yaml ./
  RUN yarn global add pnpm && pnpm install --ignore-scripts --prefer-frozen-lockfile && pnpm rebuild sharp

# Rebuild the source code only when needed
FROM node:16-alpine AS builder

  WORKDIR /app

  COPY . .
  COPY --from=deps /app/node_modules ./node_modules

  ENV NEXT_TELEMETRY_DISABLED 1
  ENV NODE_ENV production

  ARG PROD_ENV

  RUN printf "$PROD_ENV" >> .env.production

  RUN NODE_OPTIONS="--max_old_space_size=8192 --report-on-fatalerror" yarn build

# production deps cleaning
FROM node:16-alpine AS prod-deps
  WORKDIR /app
  ENV NODE_ENV production

  RUN yarn global add pnpm
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
  RUN pnpm install --prod --ignore-scripts --prefer-frozen-lockfile

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
  WORKDIR /app

  ENV NEXT_TELEMETRY_DISABLED 1
  ENV NODE_ENV production

  RUN addgroup --system --gid 1001 nodejs
  RUN adduser --system --uid 1001 nextjs


  COPY --from=prod-deps /app/node_modules ./node_modules
  COPY --from=prod-deps /app/package.json ./package.json
  COPY ./next.config.js /app/next.config.js
  COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
  COPY --from=builder --chown=nextjs:nodejs /app/public ./public

  USER nextjs

  EXPOSE 3000

  ENV PORT 3000

  CMD ["npm", "start"]
