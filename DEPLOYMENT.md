# Deployment

This project deploys as a Docker image served from the local registry:

```txt
100.104.14.39:5000/mississippi-speed-instruction:latest
```

## Build And Push Image

Run these from the repo root on the development machine:

```bash
docker build -f Dockerfile.prod -t 100.104.14.39:5000/mississippi-speed-instruction:latest .
docker push 100.104.14.39:5000/mississippi-speed-instruction:latest
```

## Deploy In Portainer

In Portainer on the production machine:

1. Open the Mississippi Speed Instruction stack/container.
2. Pull/recreate the image for `100.104.14.39:5000/mississippi-speed-instruction:latest`.
3. Recreate the container so it starts from the newly pulled image.
4. Confirm the container is running and mapped to port `5191`.

Nginx Proxy Manager should continue forwarding public traffic to the production container on port `5191`.

## Required Environment Variables

Set these in Portainer for production:

```env
N8N_CONTACT_WEBHOOK_URL=https://n8n.paracletems.com/webhook/msi/contact
MAILCHIMP_API_KEY=...
MAILCHIMP_AUDIENCE_ID=...
MAILCHIMP_SERVER_PREFIX=us1
```

## Verify After Deploy

Check the public site:

```txt
https://www.mississippispeed.com/
https://www.mississippispeed.com/contact
https://www.mississippispeed.com/podcast
https://www.mississippispeed.com/api/subscribe
```

The `/api/subscribe` endpoint should reject invalid input with JSON instead of returning the React app HTML.
