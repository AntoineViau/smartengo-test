#!/bin/bash
cat <<SECURITY > /usr/local/etc/php/conf.d/opcache-recommended.ini
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=4000
opcache.revalidate_freq=2
opcache.fast_shutdown=1
opcache.enable_cli=1
SECURITY