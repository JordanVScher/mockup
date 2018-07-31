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
		if (context.event.isPostback) {
			const { payload } = context.event.postback;
			await context.setState({ dialog: payload });
		} else if (context.event.isQuickReply) {
			const { payload } = context.event.quickReply;
			await context.setState({ dialog: payload });
		} else if (context.event.isText) {
			await context.sendText('Não sei');
			await context.setState({ dialog: 'mainMenu' });
		}
	}

	if (context.state.dialog) {
		switch (context.state.dialog) {
		case 'greetings':
			await context.sendText('Olá, sou o assistente virtual do Mock-Up.');
			await context.sendText('Mande-me uma pergunta sobre o político que eu tentarei te responder!');
			break;
		case 'mainMenu':
			await context.sendText('Mais alguma dúvida? Pode me perguntar!');
			break;
		}
	}
});

const server = createServer(bot);

server.listen(process.env.API_PORT, () => {
	console.log(`Server is running on ${process.env.API_PORT} port...`);
	console.log(`App: ${process.env.APP} & Page: ${process.env.PAGE}`);
});

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit(); });
