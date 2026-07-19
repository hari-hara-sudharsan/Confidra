FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install turbo --global
RUN npm install
RUN turbo run build --filter=backend...
EXPOSE 3001
CMD ["npm", "run", "start:prod", "--workspace=apps/backend"]
