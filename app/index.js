require('dotenv').config();

const { MessengerBot, FileSessionStore } = require('bottender');
const { createServer } = require('bottender/restify');

// const postback = require('./postback');
const config = require('./bottender.config').messenger;

const bot = new MessengerBot({
	accessToken: config.accessToken,
	appSecret: config.appSecret,
	verifyToken: config.verifyToken,
	sessionStore: new FileSessionStore(),
});

bot.onEvent(async (context) => {
	if (!context.event.isDelivery && !context.event.isEcho && !context.event.isRead) {
		await context.sendText('Hello World');
	}
});

const server = createServer(bot);

server.listen(process.env.API_PORT, () => {
	console.log(`Server is running on ${process.env.API_PORT} port...`);
	console.log(`App: ${process.env.APP} & Page: ${process.env.PAGE}`);
});

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit(); });
