# live.gahez.space: build the marketing site from the workspace, then run it
# with its own dependency-free server (static pages + the waiting list).
FROM node:24-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@11.21.0
COPY . .
# Only the site and what it depends on, not the API server or the sandbox.
RUN pnpm install --frozen-lockfile --filter "@workspace/jahez-live..." && pnpm approve-builds --all
WORKDIR /app/artifacts/jahez-live
# Set after the install: the site's packages are all devDependencies.
ENV NODE_ENV=production PORT=5173 BASE_PATH=/
RUN pnpm run build

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=build /app/artifacts/jahez-live/dist/public ./dist/public
COPY artifacts/jahez-live/server.mjs ./server.mjs
USER node
EXPOSE 3000
CMD ["node", "server.mjs"]
