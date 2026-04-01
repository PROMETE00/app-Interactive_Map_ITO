FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV CI=1
ENV EXPO_NO_TELEMETRY=1
EXPOSE 3003

CMD ["npx", "expo", "start", "--web", "--host", "lan", "--port", "3003", "--clear"]
