module.exports = {
	apps : [{
		name: "mnlth-scrap",
		script: "./cron/retrieveMnlthData.js",
		watch: "true",
		autorestart: false,
		cron_restart: "*/1 * * * *",
		instances: 1,
		exec_mode: "fork",
		cwd: "/home/lukas/my-api"
	},{
		name: "mintvial-scrap",
		script: "./cron/retrieveMintVialData.js",
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
	}]
}
