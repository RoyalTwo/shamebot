> # 👑 **Shame Bot** 👑

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="js-badge" /> &ensp;<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="node-badge" /> &ensp;
<br>
![example workflow](https://github.com/RoyalTwo/shamebot/actions/workflows/fly.yml/badge.svg)

## What is this?
This is a Discord bot designed for the Hy-Tech Club Capstone Discord 
server. Made purposefully to regulate counting originally, utilizes GitHub Actions, Docker, and Fly.io for continuous deployment. 😊

Features:
* Extremely customizable dynamic message system
* Tracks all messages in a specific channel
* Provides personality to your server
* Moderates unwanted messages and responds dynamically

**Super easy to add your own messages, follow the format in `messages.json`!**

<img style="height:30px; display: block" alt="Fork repo" src="https://img.shields.io/github/forks/RoyalTwo/shamebot?color=lightblue&label=fork&style=for-the-badge"/>

## Setup:

1. If you plan to use `fly.io` for running your bot, create an account at fly.io, and under `Account`, generate a new token. Create a GitHub Secret called `FLY_API_TOKEN` with this value.
2. Create a GitHub Secret called `COUNTING_CHANNEL` with the Numeric ID of your dedicated counting channel.
3. Create a GitHub Secret called `MESSAGE_CHANNEL` with the Numeric ID of the channel you wish to send moderation messages (shame) to. Make sure this is a different channel than the `COUNTING_CHANNEL`!
4. Create a Discord app in your developer portal, and create an associated bot account. Make sure you hang on to the tokens. Your bot will require the `Message Content Intent` permission. Use the OAuth panel to ass the bot to your server.
5. Create a GitHub Secret calls `BOT_TOKEN` with the API token from the Discord dev portal.
6. Run the action in this repo to deploy to `fly.io`

#### Uses:
> **Fly.io, NodeJS, Discord's API, JavaScript**

## Why?
Within the Capstone Discord server this was originally built for, 
we needed a way to regulate a channel users were supposed to sequentially
count in. Enter Shame Bot!

I enjoy working with Discord's API, and when the idea was floated about a bot
that could regulate unwanted messages automatically, I jumped on it. Since then,
new messages have been added, and Shame Bot has become extremely well liked in
its original community 😊

I will eventually hook it up to a database and make it more customizable by admins
without having to go through code.

---
<h6 align="center">❤️ this was fun! ❤️</h6>

---
