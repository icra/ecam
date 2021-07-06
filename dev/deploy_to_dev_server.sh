#!/bin/bash

#git: commit and push
git add *
git commit
git push

#deploy github repo to dev server

#loading server
command='cd /var/www/vhosts/icradev.cat/ecam.icradev.cat/ecam; git pull'
ssh root@217.61.208.188 "$command"
