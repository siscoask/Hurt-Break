# Stage 1: Build Vite application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package definitions
COPY package*.json ./
COPY .npmrc* ./

# Install all dependencies needed for build
RUN npm install

# Copy source code
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Runtime environment
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8888

# Copy package files
COPY package*.json ./
COPY .npmrc* ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy server script and compiled dist output
COPY server.js ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

EXPOSE 8888

CMD ["node", "server.js"]
