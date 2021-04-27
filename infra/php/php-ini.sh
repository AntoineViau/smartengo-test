#!/bin/bash
set -ex
cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
cat <<PHPINI >> /usr/local/etc/php/php.ini
error_reporting = E_ALL
log_errors = On
display_errors = On
include_path = ".:/usr/share/php:/usr/local/apache2/htdocs/ws_engine"
date.timezone="Europe/Paris"
memory_limit = -1
realpath_cache_size=4096K
realpath_cache_ttl=600
always_populate_raw_post_data = -1
max_file_uploads=15
upload_max_filesize=100M
post_max_size=100M
PHPINI
