from node:24.11.0-alpine

arg service
env service=${service}

copy package.json /sources/package.json
copy package-lock.json /sources/package-lock.json
copy ./modules /sources/modules

run cd /sources && npm install
run cd /sources && npm --workspace=@otter/${service} run build

expose 80
cmd cd /sources && npm --workspace=@otter/${service} run build && npm --workspace=@otter/${service} run develop
