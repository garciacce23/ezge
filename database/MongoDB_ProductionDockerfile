FROM --platform=linux/amd64 mongo

ENV MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME}
ENV MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}

COPY mongodb.conf /etc/mongodb.conf
COPY init-mongo.js /docker-entrypoint-initdb.d/
