import { Chalk } from 'chalk';

import fakeStoreCLI from './core/cli.js';
import Logger from './core/logger.js';
import { buildPrettyJSON, isMainModule } from './core/system.js';

// Detectamos si este archivo se ejecuta directamente (main) o se importa como módulo (testing/debug)
const isMain = isMainModule(process.argv[1], import.meta.url);

// Configuracion por defecto -> config: [--flag, default]
const FLAGS = {
	debug: ['--debug', false],
	useColor: ['--no-ansi', true],
};

// Inicializamos configuracion
const args = [...process.argv.slice(2)];
const config = {};

// Configuramos Logger y limpiamos flags de configuracion
for (const [key, [flag, def]] of Object.entries(FLAGS)) {
	const idx = args.indexOf(flag);
	config[key] = idx !== -1 ? !def : def;
	if (idx !== -1) args.splice(idx, 1);
}

// Exportamos Logger configurado de forma global
export const log = new Logger(config);

// Exportamos prettyJSON para utilizar en Logger
export const prettyJSON = buildPrettyJSON(config);

// Exportamos chalk para uso global (con esto nos aseguramos de que la flag --no-ansi funcione)
export const chalk = config.useColor
	? new Chalk({ level: 3 })
	: new Chalk({ level: 0 });

log.debug('Se inicializó un Logger con la siguiente configuración:', 'green');
log.stdout(prettyJSON(config), 'bold', false, true);

// Si es main entonces procedemos a ejecutar en produccion
try {
	if (isMain) process.exit(await fakeStoreCLI(args));
} catch (err) {
	log.error(`Hubo un problema en la ejecucion del CLI: ${err.message}`);
	log.info(
		`Para mas ayuda usa: ${chalk.bold.green('[npm, pnpm] start help')}`
	);
}
