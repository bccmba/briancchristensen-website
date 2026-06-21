#!/usr/bin/env bash
# Verify that sensitive files are blocked or absent on the live site.
# Run from anywhere: bash verify-security.sh
# Expected: every line should show 403 or 404. Anything else = exposed.

set -u
SITE="https://briancchristensen.com"

URLS=(
  "/briancchristensen.WordPress.2026-04-04.xml"
  "/.git/HEAD"
  "/.git/config"
  "/.git/logs/HEAD"
  "/.git/index"
  "/.DS_Store"
  "/.gitignore"
  "/.htaccess"
  "/email_debug.log"
  "/contact.php"
)

printf "%-55s  %s\n" "URL" "STATUS"
printf "%-55s  %s\n" "-------------------------------------------------------" "------"

for path in "${URLS[@]}"; do
  status=$(curl -sS -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 (security audit)" "${SITE}${path}")
  # contact.php correctly returns 405 (method not allowed) on GET
  if [[ "$path" == "/contact.php" && "$status" == "405" ]]; then
    verdict="OK ($status, expected on GET)"
  else
    case "$status" in
      403|404) verdict="OK ($status)" ;;
      200)     verdict="EXPOSED ($status) - FIX THIS" ;;
      *)       verdict="check manually ($status)" ;;
    esac
  fi
  printf "%-55s  %s\n" "$path" "$verdict"
done

echo
echo "Notes:"
echo "  - 403 = blocked by .htaccess (good)"
echo "  - 404 = file isn't there (also good)"
echo "  - 200 = file is being served = exposed"
echo "  - /contact.php should return 405 (method not allowed) on GET"
