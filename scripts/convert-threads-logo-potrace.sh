#!/bin/bash

# Script pour convertir une image en SVG optimisé avec Potrace
# Usage: ./convert-threads-logo-potrace.sh input_image.png

if [ $# -eq 0 ]; then
    echo "Usage: $0 <input_image>"
    exit 1
fi

INPUT_FILE="$1"
BASE_NAME=$(basename "$INPUT_FILE" | sed 's/\.[^.]*$//')
OUTPUT_DIR="components/icons"

# Créer le répertoire de sortie s'il n'existe pas
mkdir -p "$OUTPUT_DIR"

# Convertir en PBM (bitmap noir et blanc) avec ImageMagick
# Utiliser une meilleure conversion avec resize pour avoir une taille standard
convert "$INPUT_FILE" -resize 512x512 -colorspace Gray -threshold 50% -negate "$BASE_NAME.pbm"

# Utiliser Potrace pour créer le SVG avec de meilleurs paramètres
potrace "$BASE_NAME.pbm" -s -o "$BASE_NAME.svg" --width 512 --height 512

# Extraire le viewBox et le path du SVG
VIEWBOX=$(grep -oP '(?<=viewBox=")[^"]*' "$BASE_NAME.svg")
SVG_PATH=$(grep -oP '(?<=<path d=")[^"]*' "$BASE_NAME.svg")

# Créer le composant React
cat > "$OUTPUT_DIR/ThreadsIcon.tsx" << EOF
import React from 'react'

export const ThreadsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="$VIEWBOX" xmlns="http://www.w3.org/2000/svg">
    <path d="$SVG_PATH" fill="currentColor" />
  </svg>
)
EOF

# Nettoyer les fichiers temporaires
rm -f "$BASE_NAME.pbm" "$BASE_NAME.svg"

echo "SVG converti et composant React créé dans $OUTPUT_DIR/ThreadsIcon.tsx"