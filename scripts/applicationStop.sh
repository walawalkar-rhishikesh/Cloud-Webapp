#!/bin/bash
echo 'Application Stop Shell'

pm2 delete webserver || true
pm2 delete apiserver || true
sudo pm2 delete all
sudo rm -rf /home/ubuntu/*