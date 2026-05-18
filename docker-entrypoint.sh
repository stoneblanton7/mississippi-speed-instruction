#!/bin/sh
set -eu

cat > /app/dist/config.js <<EOF
window.__MSI_CONFIG__ = {
  N8N_CONTACT_WEBHOOK_URL: "${N8N_CONTACT_WEBHOOK_URL:-}"
};
EOF

exec "$@"
