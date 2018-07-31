// Module for sending attachments to bot
// context is the context from bot.onEvent
// links is the object from flow.js from the respective dialog

function sendMenu(context, links) {
	context.sendAttachment({
		type: 'template',
		payload: {
			template_type: 'generic',
			elements: [
				{
					title: links.siteTitle,
					image_url: links.imageURL,
					// subtitle: 'dasd',
					default_action: {
						type: 'web_url',
						url: links.siteURL,
						messenger_extensions: 'false',
						webview_height_ratio: 'full',
					// fallback_url: 'www.google.com',
					},
					buttons: [
					// {
					// 	type: 'web_url',
					// 	url: 'www.google.com',
					// 	title: 'Ver site',
					// }, {
						{
							type: 'postback',
							title: 'Entendi',
							payload: 'mainMenu',
						},
					],
				},
			],
		},
	});
}

module.exports.sendMenu = sendMenu;


async function send(context, links) {
	await context.sendAttachment({
		type: 'template',
		payload: {
			template_type: 'generic',
			elements: [
				{
					title: links.siteTitle,
					image_url: links.imageURL,
					default_action: {
						type: 'web_url',
						url: links.siteURL,
						messenger_extensions: 'false',
						webview_height_ratio: 'full',
					},
				},
			],
		},
	});
}

module.exports.send = send;

async function sendCarousel(context, content) {
	const elements = [];

	content.forEach((element, index) => {
		elements.push({
			title: element,
			image_url: 'https://vignette.wikia.nocookie.net/scribblenauts/images/6/60/Question_Mark.png/revision/latest?cb=20140409201911',
			buttons: [{
				type: 'postback',
				title: 'É essa',
				payload: `answer${index}`,
			}],
		});
	});
	await context.sendAttachment({
		type: 'template',
		payload: {
			template_type: 'generic',
			elements,
		},
	});
}

module.exports.sendCarousel = sendCarousel;

async function sendCarouselShare(context, links) {
	await context.sendAttachment({
		type: 'template',
		payload: {
			template_type: 'generic',
			elements: [
				{
					title: links.siteTitle[0],
					subtitle: links.siteSubTitle[0],
					image_url: links.imageURL[0],
					default_action: {
						type: 'web_url',
						url: links.siteURL[0],
						messenger_extensions: 'false',
						webview_height_ratio: 'full',
					},
					buttons: [{
						type: 'web_url',
						url: links.siteURL[0],
						title: links.siteTitle[0],
					}],
				},
				{
					title: links.siteTitle[1],
					subtitle: links.siteSubTitle[1],
					image_url: links.imageURL[1],
					item_url: links.siteURL[1],
					buttons: [{
						type: 'element_share',
					}],
				},
			],
		},
	});
}

module.exports.sendCarouselShare = sendCarouselShare;

// facebook: {
// 	attachment: {
// 		type: 'template',
// 			payload: {
// 			template_type: 'generic',
// 				elements: [{
// 					title: 'Olá! Eu sou o Guaxi!',
// 					subtitle: 'O chatbot mais transparente e engajado da internet! Venha conversar comigo!',
// 					image_url: 'https://gallery.mailchimp.com/cdabeff22c56cd4bd6072bf29/images/8e84d7d3-bba7-43be-acac-733dd6712f78.png',
// 					item_url: 'http://m.me/gastosabertos',
// 					buttons: [{
// 						type: 'element_share',
// 					}],
// 				}],
// 					},
// 	},
// },
