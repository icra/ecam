#!/bin/bash

#git: commit and push
git add *
git commit
git push

#deploy github repo to dev server

#wacclim server
command='cd httpdocs/ecam; git pull'
ssh wacclim@iwa-network.org "$command"
