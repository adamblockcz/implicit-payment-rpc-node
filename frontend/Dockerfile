FROM node:20-slim as base

RUN npm install -g pnpm@8.5.1

FROM base AS deps

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
RUN chmod +x entrypoint.sh
ENTRYPOINT ["sh", "entrypoint.sh"]
