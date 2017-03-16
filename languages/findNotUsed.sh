#!/bin/bash
#script for cleaning a language json file

#check input file
if (( $# < 1 )); then echo "Usage: $0 [language_file.json]";exit;fi

#script to check if all dialogs are used
echo "Not used language tags for [$1]"
echo "===================================="

#get file name
file=$1

#loop text ids
grep '#' $file | awk '{print $1}' | cut -d\" -f2 | cut -d\# -f2 | while read -r id ; do

	#modify id string
	id=$(echo $id | sed "s/_descr$//g")
	id=$(echo $id | sed "s/_expla$//g")

	#coincidences
	co=$(grep $id ../* | wc -l)
	(( co+=$(grep $id ../dataModel/* | wc -l) ))

	if (($co == 0 ))
		then echo $id
	fi
done 2> /dev/null | uniq
