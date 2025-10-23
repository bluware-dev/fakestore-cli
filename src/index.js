/**
 * @category API
 * Funciones para ejecutar la API de FakeStore.
 */
function fetchAPI(route, payload) {
	return fetch(`https://fakestoreapi.com/${route}`, payload)
		.then((res) => res.json())
		.then((res) => console.log(res))
		.catch((err) =>
			console.error(
				'[ERROR]: Datos mal formateados o recurso no disponible ->',
				err.message
			)
		);
}

async function executeAPI(method, endpoint, product) {
	if (!endpoint) {
		console.error('[ERROR]: No se otorgo un endpoint');
		return;
	}

	switch (method.toUpperCase()) {
		case 'GET':
			await fetchAPI(endpoint, { method: 'GET' });
			break;
		case 'DELETE':
			await fetchAPI(endpoint, { method: 'DELETE' });
			break;
		case 'POST':
			if (Object.values(product).some((v) => !v)) {
				console.error('[ERROR]: No se otorgo un producto valido');
				break;
			}
			await fetchAPI(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(product),
			});
			break;
		default:
			console.error('[ERROR:] No se indico un metodo valido');
			break;
	}
}

/**
 * @category Helpers
 * Funciones complementarias.
 */
function displayHelp(args) {
	const help = ['-h', '--help', 'help', 'HELP'];

	if (help.includes(args[0]) || !args.length) {

		console.log(
			`
░█▀▀░█▀█░█░█░█▀▀░░░█▀▀░▀█▀░█▀█░█▀▄░█▀▀░░░░░░░░░█▀▀░█░░░▀█▀
░█▀▀░█▀█░█▀▄░█▀▀░░░▀▀█░░█░░█░█░█▀▄░█▀▀░░░▄▄▄░░░█░░░█░░░░█░
░▀░░░▀░▀░▀░▀░▀▀▀░░░▀▀▀░░▀░░▀▀▀░▀░▀░▀▀▀░░░░░░░░░▀▀▀░▀▀▀░▀▀▀

Metodos:
        POST         Crear un producto        [products <title> <price> <category>]
        GET          Obtener un producto      [products/<id>]
        DELETE       Eliminar un producto     [products/<id>]
		`.trim()
	);
	process.exit();
	}
}

const buildPayload = (args) => {
	return {
		method: args[0] || '',
		endpoint: args[1] || '',
		product: {
			title: args[2] || '',
			price: args[3] || '',
			category: args[4] || '',
		},
	};
};

/**
 * @category Main
 * Flujo principal de ejecucion
 */
const args = [...process.argv.slice(2)];
displayHelp(args);

const { method, endpoint, product } = buildPayload(args);
executeAPI(method, endpoint, product);
