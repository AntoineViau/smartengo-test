FROM node:current-buster

USER root
WORKDIR /root

RUN echo "alias ll=\"ls -lha\"" >> /root/.bashrc

# RUN apt-get update
# RUN apt-get install -y git zip unzip libsqlite3-dev

RUN addgroup --gid 1001 dev-user
RUN adduser --disabled-password --gecos '' --uid 1001 --gid 1001 dev-user

WORKDIR /home/dev-user
USER dev-user
RUN echo "alias ll=\"ls -lha\"" >> /home/dev-user/.bashrc
RUN git config --global user.email "dev-user@dev-user"
RUN git config --global user.name "dev-user"


ENV PATH="/home/dev-user:${PATH}"

