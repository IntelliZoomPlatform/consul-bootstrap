FROM node:5

MAINTAINER YouEye Engineering <dev@youeye.com>

ADD . /opt/consul-bootstrap

WORKDIR /opt/consul-bootstrap

RUN npm install --production

ENTRYPOINT ["node", "/opt/consul-bootstrap/index.js"]