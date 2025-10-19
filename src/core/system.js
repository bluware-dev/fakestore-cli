import { fileURLToPath } from 'node:url';
import util from 'node:util';

import { log } from '../index.js';
import { HELP_TEMPLATES } from '../templates.js';

/**
 * @category Display
 * Muestra mensajes de ayuda y salida estándar.
 */

export function displayHelp(template) {
	template = typeof template === 'object' ? template[0] : template;
	template = ['-h', '--help'].includes(template) ? 'GLOBAL' : template;

	if (!Object.keys(HELP_TEMPLATES).includes(template)) {
		log.error(`No se encontro ayuda para un comando: '${template}'`);
		return 1;
	}
	log.stdout(HELP_TEMPLATES[template.toUpperCase()]().trim());
	return 0;
}

/**
 * @category Builder
 * Construye funciones y configuraciones.
 */

export function buildBind(args, layout) {
	if (!layout.length) throw new Error('No se dio un Layout');

	const keysLayout = ['fn', 'args', 'operands'];
	if (
		!layout.every((meta) =>
			keysLayout.every((key) => Object.keys(meta).includes(key))
		)
	)
		throw new Error(
			'System: Inconsistencia en layout, revisa integridad y verifica si la función/metadata es valida'
		);

	const executable = layout
		.map((bind) =>
			bind.args.some((arg) => args.includes(arg)) ? bind.fn : null
		)
		.filter(Boolean)[0];
	const metadata = layout.filter((bind) => bind.fn == executable)[0];

	return { executable, metadata };
}

export function buildPrettyJSON(config) {
	const constructor = {
		useColor: true,
		compact: false,
		depth: null,
		...config,
	};
	return (data) =>
		util.inspect(data, {
			colors: constructor.useColor, // ANSI?
			compact: constructor.compact, // formato multilinea?
			depth: constructor.depth, // recursividad?
		});
}

/**
 * @category Validator
 * Determina si un argumento corresponde a una opción de ayuda.
 */

export const isMainModule = (argv, url) => argv === fileURLToPath(url);

export function validateArgs(args, metadata) {
	if (!metadata || !Object.keys(metadata).length)
		throw new Error(`System: no se pasaron metadatos validos`);

	if (!metadata.args.filter((arg) => args[0] === arg)) {
		log.error(`No existe el argumento: ${args[0]}`);
		return 1;
	}
	log.debug('Guard 0: Primer argumento en posición ✓', 'magenta');

	if (args.filter((arg) => metadata.args.includes(arg)).length > 1) {
		log.error('Se dieron parametros redundantes');
		return 1;
	}
	log.debug('Guard 1: No hay parametros redundantes ✓', 'magenta');

	if (!metadata.operands && args.length > 1) {
		log.error('Esta opción no requiere de argumentos posicionales');
		return 1;
	}
	if (!metadata.operands) {
		log.debug(
			'Guard 2: No se requieren argumentos posicionales ✓',
			'magenta'
		);
		log.debug('Validación de argumentos exitosa!', 'magenta');
		return 0;
	}
	log.debug('Guard 2: Se requieren argumentos posicionales ✓', 'magenta');

	// No es magia: 'args.length - 1' para no contar la --flag
	if (metadata.operands ? args.length - 1 < metadata.operands[0] : null) {
		log.error('Esta opción requiere argumentos posicionales.');
		return 1;
	}
	log.debug(
		'Guard 3: Se cumple el minimo de argumentos posicionales ✓',
		'magenta'
	);

	if (metadata.operands ? args.length - 1 > metadata.operands[1] : null) {
		log.error(
			'Se dieron parametros posicionales no requeridos para la opción'
		);
		return 1;
	}
	log.debug(
		'Guard 4: No se supera el maximo de argumentos posicionales ✓',
		'magenta'
	);

	log.debug('Validación de argumentos exitosa!', 'magenta');
	return 0;
}
