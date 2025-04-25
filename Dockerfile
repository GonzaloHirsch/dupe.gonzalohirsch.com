# Use official Composer image as the base
FROM composer:2

ARG PORT=3000
EXPOSE $PORT
ENV PORT=$PORT

# Install Node.js, npm, and TypeScript
RUN apk update && apk add \
    curl \
    gnupg \
    ca-certificates \
    # https://github.com/php/php-src/issues/8681
    linux-headers \
    lsb-release \
    nodejs \
    npm \
    php-sockets \
    chromium \
    # https://stackoverflow.com/questions/1361925/how-to-enable-socket-in-php
    && docker-php-ext-install sockets \
    && npm install -g typescript

# Set environment variable so chrome-php knows where Chromium is
ENV CHROME_PATH=/usr/bin/chromium-browser

# Set working directory
WORKDIR /app

# Copy project files.
COPY php/ ./php/
COPY api/ ./api/

# Create directories.
RUN mkdir php/cachedir php/results

WORKDIR /app/api

# Perform API installation
RUN npm i

# Perform API build
RUN npm run build

WORKDIR /app/php

# Install crwlr
RUN composer install && composer dump-autoload

WORKDIR /app/api

CMD [ "npm", "run", "start" ]