FROM php:latest

USER root
WORKDIR /root

RUN echo "alias ll=\"ls -lha\"" >> /root/.bashrc

RUN apt-get update
RUN apt-get install -y git zip unzip libsqlite3-dev
RUN docker-php-ext-install pdo_mysql pdo_sqlite

RUN addgroup --gid 1000 dev-user
RUN adduser --disabled-password --gecos '' --uid 1000 --gid 1000 dev-user

WORKDIR /home/dev-user
USER dev-user
RUN echo "alias ll=\"ls -lha\"" >> /home/dev-user/.bashrc
RUN git config --global user.email "dev-user@dev-user"
RUN git config --global user.name "dev-user"

COPY --chown=dev-user ./composer-setup.php .
RUN chmod u+x ./composer-setup.php
RUN php composer-setup.php
RUN chmod u+x ./composer.phar 
RUN ln -s /home/dev-user/composer.phar /home/dev-user/composer

COPY --chown=dev-user ./symfony .
RUN chmod u+x ./symfony

ENV PATH="/home/dev-user:${PATH}"

