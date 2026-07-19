FROM node:18-alpine AS builder

WORKDIR /app

# Copy root configurations
COPY package*.json ./
COPY tsconfig*.json ./

# Copy backend source
COPY apps/backend ./apps/backend
COPY database ./database

# Install dependencies
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate --schema=./database/schema.prisma

# Build the backend application
WORKDIR /app/apps/backend
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

# Copy the built artifacts from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/database ./database
COPY --from=builder /app/apps/backend/package*.json ./
COPY --from=builder /app/apps/backend/dist ./dist

# Generate Prisma Client in production environment
RUN npx prisma generate --schema=./database/schema.prisma

EXPOSE 3001
ENV NODE_ENV production

# Start the application
CMD ["node", "dist/main.js"]
