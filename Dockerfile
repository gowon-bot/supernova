FROM node:22

WORKDIR /app

# Install dependencies
COPY yarn.lock* ./
RUN yarn
RUN yarn global add prisma

# Copy source
COPY . .

RUN npx prisma migrate
RUN npx prisma generate

RUN yarn build

EXPOSE 8082
CMD ["yarn", "start", "-p", "8082"]