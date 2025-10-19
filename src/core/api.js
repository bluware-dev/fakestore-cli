import { chalk, log, prettyJSON } from '../index.js';
import { displayHelp } from './system.js';

export async function fetchAPI(route, payload) {
	return fetch(`https://fakestoreapi.com/${route}`, payload)
		.then((res) => res.json())
		.then((res) => {
			log.stdout(prettyJSON(res), 'bold');
			return 0;
		})
		.catch((err) => {
			if (err.message.includes('Unexpected')) {
				log.error(
					`Datos mal formateados o recurso no disponible (Usa: ${chalk.bold.green(`[npm, pnpm] start ${payload.method} help`)})`
				);
				return 1;
			}
			throw new Error(err.message);
		});
}

export async function executeAPI(args) {
	const endpoint = args[1];
	const method = args[0].toUpperCase();

	if (['-h', '--help', 'help', 'HELP'].includes(endpoint)) {
		log.debug('Redirigiendo a: displayHelp', 'yellow');
		return displayHelp(args[0]);
	}

	if (endpoint.toLowerCase().split('/')[0] !== 'products')
		log.warn(
			`Se ingreso un endpoint sin soporte, si falla proba con ${chalk.green("'products'")} en vez de ${chalk.red(`'${endpoint.split('/')[0]}'`)}`
		);

	// Early Check: GET/DELETE son mas simples que POST/PUT
	if (['GET', 'DELETE'].includes(method)) {
		const id = args[2];

		if (args[2] && !/\d/.test(args[2])) {
			log.error(`Se esperaba un ID`);
			return 1;
		}

		const route = endpoint + (id ? '/' + id : '');
		return fetchAPI(route, { method: method });
	}

	// Use cases: POST, PUT.
	const getPayload = (config) => {
		const product = {
			title: config.title,
			price: config.price,
			description: config.description,
			category: config.category,
			image: config.image,
		};
		return {
			method: config.method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(product),
		};
	};

	const payload = getPayload({
		method: method,
		title: args[2],
		price: args[3],
		category: args[4],
		description: args[5],
		image: args[6],
	});

	log.stdout(prettyJSON(payload), '', false, true);

	return fetchAPI(endpoint, payload);
}
