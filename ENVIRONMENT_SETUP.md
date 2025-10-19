# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Telegram Bot Configuration
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_telegram_chat_id_here

# App Configuration (Optional)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## How to Get Telegram Bot Token and Chat ID

### 1. Create a Telegram Bot
1. Open Telegram and search for `@BotFather`
2. Start a chat and send `/newbot`
3. Follow the instructions to create your bot
4. Copy the bot token (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Get Chat ID
1. Add your bot to a group or channel
2. Send a message to the group/channel
3. Visit `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for the `chat.id` in the response (for groups, it will be negative)

## Vercel Deployment

### Setting Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` | `your_actual_bot_token` | Production, Preview, Development |
| `NEXT_PUBLIC_TELEGRAM_CHAT_ID` | `your_actual_chat_id` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | Production |

### Important Notes:
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Make sure to use the same variable names in Vercel as in your `.env.local`
- Restart your Vercel deployment after adding environment variables
- Never commit your `.env.local` file to version control

## Security Considerations
- Keep your bot token secure and never expose it in client-side code
- Consider using server-side API routes for sensitive operations
- Regularly rotate your bot tokens if needed
