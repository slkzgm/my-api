module.exports = {
	apps : [
		{
			name: "mnlth-update",
			script: "./scripts/mnlth-database/update.js",
			watch: "true",
			autorestart: false,
			cron_restart: "*/1 * * * *",
			time: true,
			instances: 1,
			exec_mode: "fork",
			cwd: "/home/lukas/my-api"
		},
		{
			name: "mintvial-update",
			script: "./scripts/mintvials-database/update.js",
			watch: "true",
			autorestart: false,
			cron_restart: "*/1 * * * *",
			time: true,
			instances: 1,
			exec_mode: "fork",
			cwd: "/home/lukas/my-api"
		},
		// {
		// 	name: "eggs-update",
		// 	script: "./scripts/clonexeggs-database/update.js",
		// 	watch: "true",
		// 	autorestart: false,
		// 	cron_restart: "*/1 * * * *",
		//  time: true,
		// 	instances: 1,
		// 	exec_mode: "fork",
		// 	cwd: "/home/lukas/my-api"
		// },
		// {
		// 	name: "dunk-forge-update",
		// 	script: "./scripts/dunk-forge-database/update.js",
		// 	watch: "true",
		// 	autorestart: false,
		//  time: true,
		// 	cron_restart: "*/1 * * * *",
		// 	instances: 1,
		// 	exec_mode: "fork",
		// 	cwd: "/home/lukas/my-api"
		// },
		// {
		// 	name: "cirl-update",
		// 	script: "./scripts/cirl-database/update.js",
		// 	watch: "true",
		// 	autorestart: false,
		//  time: true,
		// 	cron_restart: "*/1 * * * *",
		// 	instances: 1,
		// 	exec_mode: "fork",
		// 	cwd: "/home/lukas/my-api"
		// },
		// {
		// 	name: "dotSwoosh-update",
		// 	script: "./scripts/dotswoosh-database/update.js",
		// 	watch: "true",
		// 	autorestart: false,
		// 	time: true,
		// 	cron_restart: "*/2 * * * *",
		// 	instances: 1,
		// 	exec_mode: "fork",
		// 	cwd: "/home/lukas/my-api"
		// },
		// {
		// 	name: "forgingzsn-update",
		// 	script: "./scripts/forgingszn/update.js",
		// 	watch: "true",
		// 	autorestart: false,
		// 	cron_restart: "*/3 * * * *",
		// 	time: true,
		// 	instances: 1,
		// 	exec_mode: "fork",
		// 	cwd: "/home/lukas/my-api"
		// },
		{
			name: "api-server",
			script: "./server.js",
			cwd: "/home/lukas/my-api",
			autorestart: true,
			time: true,
			watch: true
		},
		{
			name: "mnlth-discord-bot",
			script: "./index.js",
			cwd: "/home/lukas/mnlth-discord-bot",
			// autorestart: true,
			time: true,
			watch: true
		},
		{
			name: "mintvial-discord-bot",
			script: "./index.js",
			cwd: "/home/lukas/mintvial-discord-bot",
			// autorestart: true,
			time: true,
			watch: true
		},
		{
			name: "refreshCollectionsData",
			script: "./scripts/refreshCollectionsData.js",
			watch: true,
			autorestart: false,
			cron_restart: "0 */2 * * *",
			time: true,
			instances: 1,
			exec_mode: "fork",
			cwd: "/home/lukas/my-api"
		},
		{
			name: "rtfktrvl-twitterBot",
			script: "./index.js",
			watch: true,
			autorestart: true,
			time: true,
			cwd: "/home/lukas/rtfktrvl-twitter-bot"
		},
		// {
		// 	name: "dotSwoosh-twitterBot",
		// 	script: "./index.js",
		// 	watch: true,
		// 	autorestart: true,
		// 	cwd: "/home/lukas/dotSwoosh-twitter-bot"
		// },
		// {
		// 	name: "MEV",
		// 	script: "./stream-api-2.js",
		// 	watch: true,
		// 	autorestart: true,
		// 	cwd: "/home/lukas/MEV"
		// },
		// {
		// 	name: "eggs-sniper",
		// 	script: "./index.js",
		// 	watch: true,
		// 	autorestart: true,
		// 	cwd: "/home/lukas/unclaimed-clones-sniper"
		// },
		// {
		// 	name: "bonusdao",
		// 	script: "./src/monitor.js",
		// 	watch: true,
		// 	autorestart: true,
		// 	cwd: "/home/lukas/bonusdao"
		// },
		{
			name: "azuki-discord-bot",
			script: "./index.js",
			watch: true,
			time: true,
			autorestart: true,
			cwd: "/home/lukas/azuki-discord-bot"
		},
		{
			name: "dunk-discord-bot",
			script: "./index.js",
			watch: true,
			time: true,
			autorestart: true,
			cwd: "/home/lukas/dunkGenesis-discord-bot"
		},
		{
			name: "eggs-discord-bot",
			script: "./index.js",
			watch: true,
			time: true,
			autorestart: true,
			cwd: "/home/lukas/eggs-discord-bot"
		},
		// {
		// 	name: "weth-auto-withdraw",
		// 	script: "./index.js",
		// 	watch: true,
		// 	autorestart: true,
		// 	cwd: "/home/lukas/weth-auto-withdraw"
		// },
		// {
		// 	name: "rtfkt-stole-link",
		// 	script: "./index.js",
		// 	watch: true,
		// 	autorestart: true,
		// 	cwd: "/home/lukas/rtfkt-link-contract-exploit"
		// },
		{
			name: "discord-chatbox",
			script: "./index.js",
			watch: true,
			autorestart: true,
			time: true,
			cwd: "/home/lukas/discord-chatbox"
		},
		{
			name: "mintvial-reservoir-discord-bot",
			script: "./index.js",
			watch: true,
			autorestart: true,
			time: true,
			cwd: "/home/lukas/mintvial-reservoir-discord-bot"
		},
		{
			name: "twitch-assistant",
			script: "./bot.js",
			watch: true,
			autorestart: true,
			time: true,
			cwd: "/home/lukas/twitch-chatbot"
		},
		{
			name: "cavegame",
			script: "./index.js",
			watch: true,
			autorestart: true,
			time: true,
			cwd: "/home/lukas/cave-game-backend"
		},
		{
			name: "cavegame-discord",
			script: "./index.js",
			watch: true,
			autorestart: true,
			time: true,
			cwd: "/home/lukas/cave-game-discordbot"
		},
		{
			name: "cavegame-token",
			script: "./index.js",
			watch: true,
			// autorestart: true,
			time: true,
			cwd: "/home/lukas/wgWeb3Token"
		},
		{
			name: "cavegame-autorun",
			script: "./index.js",
			watch: true,
			autorestart: true,
			time: true,
			cwd: "/home/lukas/cavegame-autorun"
		},
	]
}
