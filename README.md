# Food Today

This application gives recipe ideas for users.

## Prerequisites

* [Docker](https://www.docker.com/products/docker-desktop/)
* [Node](https://nodejs.org/en/download/package-manager)

## Installation

```bash
docker compose -d db redis
npm install
npm run db:migrate
npm run db:seed
```

## Running

### Set environment

```bash
export DATABASE_URL=postgresql://dinner:dinner@localhost/dinner
export GOOGLE_CLIENT_ID=*.apps.googleusercontent.com
```

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm start
```

## Testing

```bash
npm test
```
