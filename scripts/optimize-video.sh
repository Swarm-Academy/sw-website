#!/bin/bash

# Video Optimization Script for Swarm Academy Website
# This script optimizes video files for web delivery and GitHub compatibility

if [ $# -eq 0 ]; then
    echo "Usage: ./scripts/optimize-video.sh <input_video> [output_video]"
    echo "Example: ./scripts/optimize-video.sh public/large-video.mp4 public/optimized-video.mp4"
    exit 1
fi

INPUT_VIDEO="$1"
OUTPUT_VIDEO="${2:-${INPUT_VIDEO%.*}_optimized.mp4}"

# Check if input file exists
if [ ! -f "$INPUT_VIDEO" ]; then
    echo "Error: Input file '$INPUT_VIDEO' not found!"
    exit 1
fi

# Get original file size
ORIGINAL_SIZE=$(ls -lh "$INPUT_VIDEO" | awk '{print $5}')

echo "Optimizing video: $INPUT_VIDEO"
echo "Output: $OUTPUT_VIDEO"
echo "Original size: $ORIGINAL_SIZE"

# Optimize video with FFmpeg
ffmpeg -i "$INPUT_VIDEO" \
    -c:v libx264 \
    -crf 28 \
    -preset medium \
    -c:a aac \
    -b:a 128k \
    -movflags +faststart \
    -y \
    "$OUTPUT_VIDEO"

# Check if optimization was successful
if [ $? -eq 0 ]; then
    # Get optimized file size
    OPTIMIZED_SIZE=$(ls -lh "$OUTPUT_VIDEO" | awk '{print $5}')
    
    echo "✅ Optimization successful!"
    echo "Original size: $ORIGINAL_SIZE"
    echo "Optimized size: $OPTIMIZED_SIZE"
    
    # Calculate size reduction
    ORIGINAL_BYTES=$(stat -f%z "$INPUT_VIDEO" 2>/dev/null || stat -c%s "$INPUT_VIDEO")
    OPTIMIZED_BYTES=$(stat -f%z "$OUTPUT_VIDEO" 2>/dev/null || stat -c%s "$OUTPUT_VIDEO")
    REDUCTION=$(( (ORIGINAL_BYTES - OPTIMIZED_BYTES) * 100 / ORIGINAL_BYTES ))
    
    echo "Size reduction: ${REDUCTION}%"
    
    # Check if file is under GitHub's 50MB limit
    if [ $OPTIMIZED_BYTES -lt 52428800 ]; then
        echo "✅ File is under GitHub's 50MB limit"
    else
        echo "⚠️  File is still over GitHub's 50MB limit"
    fi
else
    echo "❌ Optimization failed!"
    exit 1
fi
