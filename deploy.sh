#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker push psalguero/nestjs-task-management:latest

echo 'Docker ::: Push docker image successfully!'

echo 'Connect with VPS Digital Ocean'
sshpass -p 'psalguero' scp docker-compose.yml root@142.93.89.210:/tmp/
sshpass -p 'psalguero' ssh root@142.93.89.210

