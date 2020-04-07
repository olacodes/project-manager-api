FROM  node:12

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install
RUN npm audit fix

COPY . .

EXPOSE 8000
