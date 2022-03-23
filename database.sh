#!/bin/sh
set -e           # Stop on any error
npm run migrate  # Run migrations
npm run seed     # Preload initial data

cd client		 # go to client folder
npm install		 # install related package
npm run build 	 # generate build file
cd ..			 # go back

exec "$@"        # Run the command as the main container process