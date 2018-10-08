#### Stage 1
FROM node as node
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build -- --prod

#### Stage 2
FROM nginx
COPY --from=node /app/dist/cards1 /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t cards-front -f cards_front.dockerfile .
# docker run -d -p 8080:80 cards-front
