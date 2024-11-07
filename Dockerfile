FROM node:22

WORKDIR /app

# Install dependencies
COPY yarn.lock* ./
RUN yarn
RUN yarn global add prisma

# Copy source
COPY . .

RUN yarn prisma migrate
RUN yarn prisma generate

RUN yarn build

EXPOSE 8082
CMD ["yarn", "start", "-p", "8082"]