#### Stage 1
FROM node as node
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build-dev

#### Stage 2
FROM nginx
COPY --from=node /app/dev /usr/share/nginx/html
COPY ./nginx/nginx-dev.conf /etc/nginx/conf.d/default.conf

# docker build -t geronimodock/cards-front-dev -f cards_front_dev.dockerfile .
# docker run -d -p 8080:80 cards-front
