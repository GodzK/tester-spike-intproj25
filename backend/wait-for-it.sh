#!/usr/bin/env bash
set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 3306; do
  echo "⏳ Waiting for MySQL ($host:3306)..."
  sleep 2
done

echo "✅ MySQL is ready — starting backend!"
exec $cmd
