// This class stores text messages, urls and quick_replies

module.exports = {
	greetings: {
		welcome: 'Olá, sou o assistente virtual Mock-Up. Clique em \'Começar\' para falar comigo!',
		getStarted: 'Sou o assistente virtual Mock-Up. Clique em \'Começar\' para falar comigo!',
	},
	Huck: {
		answer: {
			aborto: 'Sou 90% a favor.',
			seguranca: ['Sou a favor do armamento', 'Sou favor da prisão de menores', 'Vou lutar a favor da pena de morte'],
			saude: ['Não, chega de hospitais gratuitos.', 'SUS já.', 'Sim, remédios de graça pra todos.'],
			transporte: ['Nunca vamos acabar o monotrilho.', 'Sim, as obras precisam desse fundo.'],
			educacao: ['Totalmente a favor.', 'Não, enem não vale de nada.'],
			corrupcao: ['Todas.', 'Não, que isso, imagina.'],
		},
		questions: {
			seguranca: ['Você é a favor do armamento?', 'Você é a favor da prisão de menores?', 'Você vai liberar a pena de morte?'],
			saude: ['Mais hospitais públicos?', 'Fim do SUS?', 'A favor da Farmácia Popular?'],
			transporte: ['Vai acabar o monotrilho?', 'A favor do aumento da passagem?'],
			educacao: ['A favor de faculdades públicas?', 'Vale nota do ENEM?'],
			corrupcao: ['Quais medidas contra corrupção?', 'Você é corrupto?'],
		},
	},
	Justus: {
		answer: {
			aborto: 'Sou 100% contra.',
			seguranca: ['Sou contra o armamento.', 'Não necessariamente.'],
			saude: ['Claro.', 'Não.'],
			transporte: ['Não conte com isso', 'Não, vou cortar o preço das passagens em 0.5%'],
			educacao: ['Não vai ter cotas.', 'O suficiente'],
			corrupcao: ['Não se mexe em time que tá ganhando.', 'O importa é perdoar'],
		},
		questions: {
			seguranca: ['Você é a favor do armamento?', 'Bandido bom é bandido morto?'],
			saude: ['A favor do multirão da saúde?', 'A favor da educação sexual nas escolas?'],
			transporte: ['Um dia o monotrilho vai terminar?', 'A favor do aumento da passagem?'],
			educacao: ['A favor de cotas em faculdades públicas?', 'Professores ganham pouco?'],
			corrupcao: ['Quais medidas contra corrupção?', 'O que fazer com os corruptos?'],
		},
	},
};
