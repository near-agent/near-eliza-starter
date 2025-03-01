FROM gitpod/workspace-python-3.11

# nvm environment variables
ENV NODE_VERSION 23.3.0

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# set environment variables
ENV NVM_DIR $HOME/.nvm
RUN echo 'export NVM_DIR="$HOME/.nvm"' >> $HOME/.bashrc
RUN echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" ' >> $HOME/.bashrc

# install node and npm
RUN . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# install pnpm
RUN npm i -g pnpm

# set server url for web client
ENV VITE_SERVER_URL $(gp url 3000)
