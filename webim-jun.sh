#!/usr/bin/env bash

SOFTWARE='/vjjd/software'
mkdir -p ${SOFTWARE}

apt-get install -y wget unzip git nano

# Node.js
    NODE_VERSION='v6.5.0'
    cd ${SOFTWARE}; \
    wget https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-x64.tar.xz; \
    apt-get install xz-utils; \
    tar -xf node-${NODE_VERSION}-linux-x64.tar.xz; \
    rm node-${NODE_VERSION}-linux-x64.tar.xz; \
    ln -s ${SOFTWARE}/node-${NODE_VERSION}-linux-x64/bin/node  /usr/local/bin
    ln -s ${SOFTWARE}/node-${NODE_VERSION}-linux-x64/bin/npm  /usr/local/bin

# Webim-jun
    npm install forever -g
    cd ${SOFTWARE}; \
    git clone https://github.com/vjjd/webim-jun.git; \
    cd webim-jun; \
    npm install