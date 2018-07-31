// This class stores text messages, urls and quick_replies

module.exports = {
	greetings: {
		welcome: 'Olá, sou o assistente virtual Mock-Up. Clique em \'Começar\' para falar comigo!',
		getStarted: 'Sou o assistente virtual Mock-Up. Clique em \'Começar\' para falar comigo!',
	},
	answer: {
		aborto: 'Sou 100% a favor.',
		seguranca: ['Sou contra o armamento', 'Sou contra a prisão de menores', 'Vou lutar em favor da pena de morte'],
		saude: ['Não, chega de hospital gratuito.', 'SUS já era.', 'Sim, remédios de graça pra todos.'],
		transporte: ['Nunca vamos acabar o monotrilho.', 'Sim, as obras precisam desse fundo.'],
		educacao: ['Totalmente contra.', 'Não, enem não vale de nada.'],
		corrupcao: ['Em time que tá ganhando não se mexe', 'Não, que isso, imagina.'],
	},
	questions: {
		seguranca: ['Você é a favor do armamento?', 'Você é a favor da prisão de menores?', 'Você vai liberar a pena de morte?'],
		saude: ['Mais hospitais públicos?', 'Fim do SUS?', 'A favor da Farmácia Popular?'],
		transporte: ['Vai acabar o monotrilho?', 'A favor do aumento da passagem?'],
		educacao: ['A favor de faculdades públicas?', 'Vale nota do ENEM?'],
		corrupcao: ['Quais medidas contra corrupção?', 'Você é corrupto?'],
	},
};
