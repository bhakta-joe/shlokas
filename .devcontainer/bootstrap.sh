#!/bin/sh
mkdir -p ~/.config/fish
cp ./.devcontainer/config.fish ~/.config/fish/

npm install -g @ionic/cli
npm install
