#!/bin/sh
set -e           				# Stop on any error
cp .env.example .env  			# Copy Environtment
docker-compose up --build     	# Run Docker Compose
exec "$@"        				# Run the command as the main container process