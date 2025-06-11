# Caremate Project

This project is a Next.js application.

## Running the Project

- `npm run dev` – start the development server.
- `npm run build` – build for production.
- `npm start` – start the production server.
- `npm run server` – run the Express API server.

## Environment Setup

1. Copy `.env.example` to `.env`.
2. Edit `.env` and provide values for the following variables:
   - `OPENAI_API_KEY` – your OpenAI API key.
   - `ALLOWED_ORIGINS` – comma-separated list of URLs allowed to access the backend.
   - `PORT` – port for the Express server (defaults to `3001`).

## Running the Backend

The Express server reads the `PORT` environment variable. If not set, it
defaults to `3001`.

- `node server.js` – start the server directly.
- `npm run server` – start it via the provided npm script.

## Running Tests

Jest and React Testing Library are used for unit tests. Execute:

```bash
npm test
```

This runs all tests under the `__tests__` directory.
