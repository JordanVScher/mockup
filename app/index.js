require('dotenv').config();

const { MessengerBot, FileSessionStore } = require('bottender');
const { createServer } = require('bottender/restify');
const apiai = require('apiai-promise');

// const postback = require('./postback');

const config = require('./bottender.config').messenger;
const flow = require('./flow');

const app = apiai(process.env.DIALOGFLOW_TOKEN);


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
			await context.typingOn();
			const payload = await context.event.message.text.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, '');
			if (payload) { // check if string isn't empty after removing emojis
				if (context.event.message.text === process.env.RESTART) {
					await context.resetState();
					await context.setState({ dialog: 'greetings' });
				} else {
					await context.setState({ userText: context.event.message.text });
					await context.setState({
						apiaiIntent: await app.textRequest(payload, {
							sessionId: context.session.user.id,
						}),
					});
					// console.log(context.state.apiaiIntent);
					// await context.sendText(`Você quer saber sobre: ${context.state.apiaiIntent.result.metadata.intentName}`);
					await context.setState({ dialog: context.state.apiaiIntent.result.metadata.intentName });
				}
			} else {
				await context.sendText('Texto inválido');
				await context.setState({ dialog: 'mainMenu' });
			}
		}
	}

	if (context.state.dialog) {
		switch (context.state.dialog) {
		case 'greetings':
			await context.sendText('Olá, sou o assistente virtual do Mock-Up.');
			await context.sendText('Mande-me uma pergunta sobre o político que eu tentarei te responder!');
			break;
		case 'mainMenu':
			await context.typingOff();
			await context.sendText('Mais alguma dúvida? Pode me perguntar!');
			break;
		case 'tryAgain':
			await context.sendText('Envie sua pergunta!');
			break;
		case 'sendTeam':
			await context.sendText('ok, enviei sua mensagem para nossa equipe! Vamos te responder em breve!');
			await context.sendText('Mais alguma dúvida? Pode me perguntar!');
			break;
		case 'aborto':
			await context.setState({ theme: context.state.dialog });
			await context.sendText('Você está querendo saber o que o político pensa sobre o aborto?', {
				quick_replies: [
					{
						content_type: 'text',
						title: 'Sim',
						payload: 'answer',
					},
					{
						content_type: 'text',
						title: 'Não',
						payload: 'mistake',
					},
				],
			});
			break;
		case 'answer':
			await context.sendText('O político diz:');
			await context.sendText(flow.answer[context.state.theme]);
			await context.sendText('Mais alguma dúvida? Pode me perguntar!');
			break;
		case 'mistake':
			await context.sendText('Parece que eu me enganei. Quer tentar de novo ou prefere mandar a pergunta para nossa equipe?', {
				quick_replies: [
					{
						content_type: 'text',
						title: 'Tentar de novo',
						payload: 'tryAgain',
					},
					{
						content_type: 'text',
						title: 'Mandar para equipe',
						payload: 'sendTeam',
					},
				],
			});
			break;
		case 'error':
			await context.sendText('hmmm, não entendi o que você disse. Quer tentar de novo ou prefere mandar a pergunta para nossa equipe?', {
				quick_replies: [
					{
						content_type: 'text',
						title: 'Tentar de novo',
						payload: 'tryAgain',
					},
					{
						content_type: 'text',
						title: 'Mandar para equipe',
						payload: 'sendTeam',
					},
				],
			});
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
