# Care Mate

Care Mate is a web-based application that uses a Next.js frontend and a simple Express backend to proxy requests to the OpenAI API. The backend resides in `server.js` and listens on port **3001**.

## Setup

1. Copy `.env.example` to `.env` and fill in the required values.
2. Install dependencies with:
   ```bash
   npm install
   ```

## Development

Start the development servers in two terminals:

```bash
# Terminal 1 - Next.js frontend
npm run dev

# Terminal 2 - Express backend
node server.js
```

## Production Build

```bash
npm run build
npm start   # launches the built Next.js app
node server.js &  # make sure the Express backend is running
```

## Environment Variables

Configuration is handled with environment variables. See `.env.example` for the full list. At minimum you must provide:

- `OPENAI_API_KEY` – API key used by the Express backend to authenticate with OpenAI.
