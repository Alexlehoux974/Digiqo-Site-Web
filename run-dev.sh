#!/bin/bash
cd /var/www/Digiqo/digiqo-site
echo "Starting Vite dev server..."
npm run dev 2>&1 | tee vite-output.log