#!/bin/bash
#script to find duplicated tags

#check input file
if (( $# < 1 )); then echo "Usage: $0 [language_file.json]";exit;fi

file_json=$1

echo "Repeated language tags for [$file_json]"
echo "===================================="

cat $file_json | cut -d\" -f2| sort | uniq -d
