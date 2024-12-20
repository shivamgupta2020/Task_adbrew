# set base image (host OS)
FROM python:3.8

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
RUN dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb

RUN python3 -m ensurepip --upgrade
RUN python3 -m pip install --upgrade pip setuptools

# Install NVM
ENV NVM_DIR=/root/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Install Node.js using NVM and set as default
RUN bash -c "source $NVM_DIR/nvm.sh && \
    nvm install 16.8.0 && \
    nvm alias default 16.8.0"

# Add NVM and Node.js to PATH
ENV PATH=$NVM_DIR/versions/node/v16.8.0/bin:$PATH


RUN apt-get -y update
RUN apt-get install -y curl nano wget nginx git

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list


# Mongo
RUN ln -s /bin/echo /bin/systemctl
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
RUN apt-get -y update
RUN apt-get install -y mongodb-org

# Install Yarn
RUN apt-get install -y yarn 

# Install and upgrade pip and setuptools
RUN python3 -m ensurepip --upgrade && \
    python3 -m pip install --no-cache-dir --upgrade "pip<24.1" setuptools



ENV ENV_TYPE staging
ENV MONGO_HOST mongo
ENV MONGO_PORT 27017
##########

ENV PYTHONPATH=$PYTHONPATH:/src/

# copy the dependencies file to the working directory
COPY src/requirements.txt .
COPY src/app /app
COPY src/rest /rest

# install dependencies
RUN pip install -r requirements.txt