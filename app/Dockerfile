# Use this for non Macbook M1 users
# FROM denoland/deno:alpine-1.17.2

# For running Docker with deno on M1 Macbooks
FROM lukechannings/deno:v1.17.2

EXPOSE 7777

WORKDIR /app

CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-env", "--no-check", "run-locally.js" ]