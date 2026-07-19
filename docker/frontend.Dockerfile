FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install turbo --global
RUN npm install
RUN turbo run build --filter=frontend...
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace=apps/frontend"]
