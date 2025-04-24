# dupe.gonzalohirsch.com

This repository contains the source code for a dupe of https://dupe.com/. This is done purely for educational purposes.

# PHP

brew install php

## Composer

```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'.PHP_EOL; } else { echo 'Installer corrupt'.PHP_EOL; unlink('composer-setup.php'); exit(1); }"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
```

Afterwards, run:

```
composer install
```

composer dump-autoload

# Docker

Build the image locally:

```
IMAGE_NAME="composer-ts-env"
docker build -t $IMAGE_NAME .
```

Run it:

```
docker run -it --rm $IMAGE_NAME /bin/bash
```

Then execute any command in the CLI that you get. Alternatively, you could try to work with hot reload by binding the volume to `/app`

```
docker run -it --rm -v $(pwd):/app $IMAGE_NAME /bin/bash
```

This makes sure that your updates are reflected in the image. But the only issue is that it might not fully reflect the environment in the Docker image running in the cloud due to build dependencies. Best option is to develop with this and then test without the volume binding.
