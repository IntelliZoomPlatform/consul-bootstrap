#!/usr/bin/env bash

set -x
set -e

export PROJDIR="${HOME}/${CIRCLE_PROJECT_REPONAME}"
export TAG=$(git describe --abbrev=0 --tags)


pushd $PROJDIR
  docker build -t "youeye/consul-bootstrap:${TAG}" .
  docker push "youeye/consul-bootstrap:${TAG}"
popd
