#!/bin/bash

FILE_PATH=${1:-"./data/cves.txt"}

if [ ! -f "$FILE_PATH" ]; then
    echo "Error: File $FILE_PATH not found!"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed or not in PATH"
    exit 1
fi

echo "Using npm version $(npm --version)"

TOTAL=$(grep -v '^$' "$FILE_PATH" | wc -l)
CURRENT=0

while read -r dep; do
    if [ -z "$dep" ]; then
        continue
    fi
    
    CURRENT=$((CURRENT + 1))
    PERCENT=$((100 * CURRENT / TOTAL))
    
    echo -e "\n[${PERCENT}%] Installing $dep (${CURRENT}/${TOTAL})..."
    yarn add "$dep"
    
    if [ $? -ne 0 ]; then
        echo "Warning: Failed to install $dep"
    fi
done < "$FILE_PATH"

echo -e "\nAll dependencies installed!"