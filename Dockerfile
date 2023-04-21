# Install dependencies only when needed
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat g++ make py3-pip python3
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN yarn global add pnpm && pnpm install --frozen-lockfile --ignore-scripts

# Rebuild the source code only when needed
FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 webgroup
RUN adduser --system --uid 1001 webuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=webuser:webgroup /app/.next/standalone ./
COPY --from=builder --chown=webuser:webgroup /app/.next/static ./.next/static

USER webuser

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
