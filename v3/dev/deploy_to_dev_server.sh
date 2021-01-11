#!/bin/bash

#git
git add *
git commit -m 'update'
git push

# deploy github repo to dev server
command='cd /var/www/vhosts/h2793818.stratoserver.net/ecam-dev.h2793818.stratoserver.net; git pull'
ssh root@h2793818.stratoserver.net "$command"
