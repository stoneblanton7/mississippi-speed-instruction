# Deployment

Mississippi Speed Instruction deploys through Gitea Actions and Dokploy. The deployment follows the same immutable-image promotion pattern as the video-platform production repository, reduced to this site's single Node/frontend image.

## Deployment flow

1. A push to `stone-dev` in Gitea runs `.gitea/workflows/ci.yml` and `.gitea/workflows/prod-deploy.yml`.
2. CI installs the locked frontend dependencies, runs ESLint, and builds the Vite app. The deployment workflow repeats those checks as a hard release gate before publishing an image.
3. The deployment workflow accepts production runs only from `stone-dev` and tags the image with the first 12 characters of the commit SHA.
4. It builds `Dockerfile.prod` and pushes the image to Gitea's registry.
5. After the image push succeeds, it updates `deploy/compose.yaml` to that immutable tag and commits the promotion as `msi-deploy-bot`.
6. Dokploy watches the repository/compose file and redeploys the promoted image.

The promotion commit changes only `deploy/compose.yaml`. That path is ignored by the deployment workflow, preventing a build loop. CI may still run for the promotion commit.

## Gitea Actions setup

Enable Actions for the Gitea repository and configure these repository Actions secrets:

```env
REGISTRY_USERNAME=serveradmin
REGISTRY_PASSWORD=...
```

The workflow currently uses the same runner-reachable registry endpoint as the video-platform production workflow:

```txt
10.1.0.50:3000/serveradmin/mississippi-speed-instruction:<12-character-commit-sha>
```

The Dokploy host pulls the same package through its public Gitea hostname:

```txt
git.synaptix-lab.com/serveradmin/mississippi-speed-instruction:<12-character-commit-sha>
```

If the runner's registry address changes, update `REGISTRY_PUSH_HOST` in `.gitea/workflows/prod-deploy.yml`.

## Dokploy setup

Create a **Compose** service in Dokploy with:

- Repository: `https://git.synaptix-lab.com/serveradmin/mississippi-speed-instruction.git`
- Branch: `stone-dev`
- Compose path: `deploy/compose.yaml`
- Exposed application service: `frontend`
- Container port: `80`
- Domain: the production Mississippi Speed domain(s)
- Auto-deploy: enabled for repository changes

The compose service joins the external `dokploy-network`; Dokploy should provide the Traefik routing labels.

Configure these runtime variables in Dokploy's **Environment** tab:

```env
N8N_CONTACT_WEBHOOK_URL=https://n8n.paracletems.com/webhook/msi/contact
MAILCHIMP_API_KEY=...
MAILCHIMP_AUDIENCE_ID=...
MAILCHIMP_SERVER_PREFIX=us1
```

All four are required by `deploy/compose.yaml`; never commit their values. The three Mailchimp values remain server-side secrets. The current contact implementation intentionally publishes `N8N_CONTACT_WEBHOOK_URL` to the browser through `/config.js`, so the n8n endpoint must be treated as a public endpoint and protected with appropriate validation and abuse controls in n8n.

## First deployment

The compose file initially references the source commit present when this workflow was added. Run **Build & Deploy** manually from Gitea Actions, or push a commit to `stone-dev`, before asking Dokploy to pull the image. The workflow will build the image and replace the compose tag with the newly built SHA.

## Verify after deploy

Check:

```txt
https://www.mississippispeed.com/
https://www.mississippispeed.com/contact
https://www.mississippispeed.com/podcast
https://www.mississippispeed.com/api/subscribe
```

The `/api/subscribe` endpoint should reject invalid input with JSON instead of returning the React app HTML. Submit test contact/newsletter requests only when it is safe to create those external side effects.

## GitHub mirror note

The promotion job commits the immutable image tag to the Gitea `stone-dev` branch. If GitHub remains a separate writable remote rather than a configured Gitea push mirror, that bot commit makes Gitea one commit ahead after each deployment. Synchronize that promotion commit back to GitHub, or configure repository mirroring, before doing development from GitHub alone.
