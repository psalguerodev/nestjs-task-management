#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push psalguero/nestjs-task-management:latest
echo 'Docker ::: Push docker image successfully!'
