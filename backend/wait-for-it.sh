#!/usr/bin/env bash
set -e

hostport=($1)
shift
cmd="$@"

until nc -z ${hostport[0]} ${hostport[1]}; do
  echo "Waiting for ${hostport[0]}:${hostport[1]}..."
  sleep 1
done

exec $cmd
