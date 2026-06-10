# wer2 GO Support Bot (Telegram)

Hybrid support bot: inline menus + Claude AI fallback + human escalation.

## Env vars (set in Railway)
- TELEGRAM_BOT_TOKEN (required)
- ANTHROPIC_API_KEY (required for AI replies; without it, typed questions escalate)
- SUPPORT_CHAT_ID (optional — private Telegram group for escalations; get it by adding the bot to the group and sending /id)
- WEBHOOK_SECRET (optional, default wer2go-secret)
- CLAUDE_MODEL (optional)

## After deploy
Set the webhook:
curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<railway-domain>/webhook/<WEBHOOK_SECRET>"

## Updating the bot's knowledge
Edit knowledge.md and redeploy.
