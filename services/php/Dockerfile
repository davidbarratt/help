FROM php:7-fpm

RUN apt-get update \
    && apt-get install libicu-dev --yes \
    && docker-php-ext-install -j$(nproc) intl

RUN pecl channel-update pecl.php.net \
    && pecl install apcu
