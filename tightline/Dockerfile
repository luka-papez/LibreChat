# Tight Line branding on top of the stock LibreChat image. No LibreChat code changes:
# icons are replaced and the three places that carry the name before APP_TITLE is
# known at runtime are patched -- the <title> of the first paint, and the PWA
# manifest's name and theme colour.
#
# Built by tightline/docker-compose.override.yml; the base is whatever compose resolves
# for the upstream `api` image, so pulling a new upstream image and running
# `docker compose up -d --build` re-applies this on top of it.
ARG BASE_IMAGE=registry.librechat.ai/librechat-ai/librechat-dev:latest
FROM ${BASE_IMAGE}

USER root
COPY --chown=node:node branding/ /app/client/dist/assets/
COPY --chown=node:node brand.mjs /tmp/brand.mjs
RUN node /tmp/brand.mjs /app/client/dist "TightLine chat UI" "#0275D3" \
 && rm /tmp/brand.mjs \
 # The static middleware serves these pre-compressed copies to any browser that
 # accepts br or gzip, which is nearly all of them, so a patched index.html alone
 # would change nothing. Without them it serves the plain file.
 && rm -f /app/client/dist/index.html.br /app/client/dist/index.html.gz
USER node
