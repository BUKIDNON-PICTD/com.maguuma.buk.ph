# FROM nginx
# COPY ./www/ /usr/share/nginx/html

FROM node:10-alpine as builder

# Work in /usr/app/ directory
WORKDIR /usr/app/maguuma/

RUN apk --no-cache add python make g++
# Copy source files
ADD e2e ./e2e
ADD resources ./resources
ADD src ./src
ADD typings ./typings
ADD angular.json ./
ADD config.xml ./
ADD ngsw-config.json ./
ADD package.json ./
ADD ionic.config.json ./
ADD tsconfig.app.json ./
ADD tsconfig.json ./
ADD tsconfig.spec.json ./
ADD tslint.json ./

# INSTALL IONIC AND CORDOVA
RUN npm install -g cordova @ionic/cli

# Install dependencies
RUN npm install

RUN npm audit fix --force

#run application
# CMD ["ionic", "cordova", "build", "browser", "--prod"]
RUN cordova telemetry on
RUN ionic cordova platform add browser --no-interactive --confirm
RUN ionic cordova build browser --prod --no-interactive --confirm
RUN ionic cordova plugin add cordova-plugin-network-information --confirm
RUN ionic cordova plugin add cordova-plugin-camera --confirm

FROM nginx
COPY --from=builder /usr/app/maguuma/platforms/browser/www/ /usr/share/nginx/html
