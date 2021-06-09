#!/bin/bash
#script for cleaning a language json file

#check input file
if (($#<1)); then echo "Usage: $0 [language_file.json]";exit;fi

#script to check if all dialogs are used
echo "Not used language tags for [$1]"
echo "===================================="
echo "Searching..."

#get file name
file=$1

#loop text ids
grep '#' $file | cut -d\: -f1 | while read -r id
do
	if [[ $id == *"_descr"* ]]; then continue; fi;
  if [[ $id == *"_expla"* ]]; then continue; fi;

  #TODO refactor
  search_str="translate($id)"

  echo $search_str

	#count coincidences
	#co=$(grep $id ../../ -r | wc -l)
done

#done 2> /dev/null | uniq
#echo "Done."
