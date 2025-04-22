# Use official Composer image as the base
FROM composer:2

# Install Node.js, npm, and TypeScript
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    lsb-release \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g typescript \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install crwlr
RUN composer install

# Set working directory
WORKDIR /app

# Optional: copy your project files
# COPY . .

# Default command (override as needed)
CMD [ "php", "-a" ]