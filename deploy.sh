#!/usr/bin/env bash
# Push local commits to origin/main and trigger a Render deploy.
# Usage: ./deploy.sh           → push + deploy
#        ./deploy.sh --no-push → deploy only (use if already pushed)

set -euo pipefail

# Load env
if [[ -f .env ]]; then
  # shellcheck disable=SC1091
  source .env
else
  echo "❌ .env not found — expected RENDER_DEPLOY_HOOK" >&2
  exit 1
fi

if [[ -z "${RENDER_DEPLOY_HOOK:-}" ]]; then
  echo "❌ RENDER_DEPLOY_HOOK not set in .env" >&2
  exit 1
fi

# Push unless --no-push
if [[ "${1:-}" != "--no-push" ]]; then
  echo "→ git push"
  git push
fi

echo "→ triggering Render deploy"
response=$(curl -s -X POST "$RENDER_DEPLOY_HOOK")
deploy_id=$(echo "$response" | grep -oE '"id":"[^"]+' | cut -d'"' -f4)

if [[ -n "$deploy_id" ]]; then
  echo "✓ deploy queued: $deploy_id"
  echo "  live URL: https://hackathon2026april-landing.onrender.com/"
else
  echo "⚠️  unexpected response: $response"
  exit 1
fi
