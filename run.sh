#!/bin/bash

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

sudo apt-get install -y docker-compose

docker build -t backend_rent .

docker-compose up -d