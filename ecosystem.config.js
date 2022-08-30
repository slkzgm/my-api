module.exports = {
	apps : [{
		name: "mnlth-update",
		script: "./scripts/mnlth-database/update.js",
		watch: "true",
		autorestart: false,
		cron_restart: "*/1 * * * *",
		instances: 1,
		exec_mode: "fork",
		cwd: "/home/lukas/my-api"
	},{
		name: "mintvial-update",
		script: "./scripts/mintvials-database/update.js",
		watch: "true",
		autorestart: false,
		cron_restart: "*/1 * * * *",
		instances: 1,
		exec_mode: "fork",
		cwd: "/home/lukas/my-api"
	}, {
		name: "api-server",
		script: "./server.js",
		cwd: "/home/lukas/my-api",
		watch: true
	}, {
		name: "mnlth-discord-bot",
		script: "./index.js",
		cwd: "/home/lukas/mnlth-discord-bot",
		watch: true
	}, {
		name: "mintvial-discord-bot",
		script: "./index.js",
		cwd: "/home/lukas/mintvial-discord-bot",
		watch: true
	}, {
		name: "refreshCollectionsData",
		script: "./scripts/refreshCollectionsData.js",
		watch: true,
		autorestart: false,
		cron_restart: "0 */2 * * *",
		instances: 1,
		exec_mode: "fork",
		cwd: "/home/lukas/my-api"
	}, {
		name: "rtfktrvl-twitterBot",
		script: "./index.js",
		watch: true,
		cwd: "/home/lukas/rtfktrvl-twitter-bot"
	}]
}
