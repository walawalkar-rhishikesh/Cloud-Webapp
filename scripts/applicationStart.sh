#!/bin/bash
echo 'Application Start Shell'

sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/home/ubuntu/cloud-config/cloud-watch-config.json -s
sudo systemctl start amazon-cloudwatch-agent.service

cd /home/ubuntu/
cd front-end
sudo npm install
# pm2 start npm start --name "webserver"
sudo -E --preserve-env pm2 --name webserver start npm -- start --update-env

cd /home/ubuntu/
cd api
sudo npm install
sudo pm2 start --name apiserver npm -- start  
# sudo -E --preserve-env pm2 --name apiserver start node . --update-env
# sudo pm2 restart 1 --update-env

sudo pm2 startup systemd
sudo pm2 save