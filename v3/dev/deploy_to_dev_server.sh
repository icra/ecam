#!/bin/bash

#git: commit and push
git add *
git commit -m 'update'
git push

#deploy github repo to dev server

#strato server
#command='cd /var/www/vhosts/h2793818.stratoserver.net/ecam-dev.h2793818.stratoserver.net; git pull'
#ssh root@h2793818.stratoserver.net "$command"

#loading server
command='cd /var/www/vhosts/icradev.cat/ecam.icradev.cat/ecam; git pull'
ssh root@217.61.208.188 "$command"
