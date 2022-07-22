module.exports = {
	apps : [{
		name   : "mnlth-scrap",
		script : "./cron/retrieveMnlthData.js",
		watch: "true",
		autorestart: false,
		cron_restart: "*/5 * * * *",
		instances: 1,
		exec_mode: "fork",
		cwd: "/home/slkz/my-api"
		},
		{
			name: "api-server",
			script: "./server.js",
			cwd: "/home/slkz/my-api",
			watch: true
		},
		{
			name: "discord-bot",
			script: "./index.js",
			cwd: "/home/slkz/mnlth-discord-bot",
			watch: true
		}]
}
