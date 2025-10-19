import { chalk, log } from '../index.js';
import { executeAPI } from './api.js';
import { displayHelp, validateArgs, buildBind } from './system.js';

// El orden del layout importa: el comando de ayuda global se evalua al final, se prioriza de forma local ([npm, pnpm] start {CMD} help)
const CLI_LAYOUT = {
	POST: {
		fn: executeAPI,
		args: ['post', 'POST'],
		operands: [1, 7], // [min, max] <- Rango de argumentos posicionales que se aceptan (sin contar --flag)
	},
	GET: {
		fn: executeAPI,
		args: ['get', 'GET'],
		operands: [1, 2],
	},
	PUT: {
		fn: executeAPI,
		args: ['put', 'PUT'],
		operands: [1, 7],
	},
	DELETE: {
		fn: executeAPI,
		args: ['delete', 'DELETE'],
		operands: [1, 2],
	},
	HELP: {
		fn: displayHelp,
		args: ['-h', '--help', 'help', 'HELP'], // Soporte para NPM con 'help'
		operands: null, // No acepta argumentos posicionales
	},
};

export default function fakeStoreCLI(args) {
	if (!args.length) {
		log.error(
			`No se indico ninguna opción. Usa: ${chalk.bold.green('[npm, pnpm] start help')}`
		);
		return 1;
	}

	// Pasamos argumentos y layout para obtener la funcion a ejecutar y su metadata.
	const { executable, metadata } = buildBind(args, Object.values(CLI_LAYOUT));

	// Mapeamos todos los argumentos validos.
	const validCommands = Object.values(CLI_LAYOUT)
		.map((meta) => meta.args)
		.flat();

	// Si no se obtuvo respuesta valida, abortamos
	if (!executable || !metadata || !validCommands.includes(args[0])) {
		log.error(
			(args[0].startsWith('-')
				? 'No existe una flag llamada: '
				: 'No existe un metodo llamado: ') + chalk.yellow(args[0])
		);
		log.info(
			`Para mas ayuda usa: ${chalk.bold.green('[npm, pnpm] start help')}`
		);
		return 1;
	}

	// Validamos argumentos
	if (validateArgs(args, metadata)) return 1;

	log.debug(`ARGS: --debug, ${args.join(', ')}`, 'yellow');
	log.debug(`Ejecutando function: ${executable.name}`, 'green');
	return executable(args);
}
