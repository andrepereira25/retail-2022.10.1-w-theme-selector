FROM repo.backbase.com/backbase-docker-releases/web-base:1.1.2

ARG application_name

COPY ./dist/apps/${application_name} /statics
