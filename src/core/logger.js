import { Chalk } from 'chalk';

/**
 * @typedef {Object} LoggerConfig
 * @property {boolean} [exitOnCritical=false] - Si true, `critical()` termina el proceso con código 1.
 * @property {boolean} [exitOnError=false] - Si true, `error()` termina el proceso con el código proporcionado (default: 1).
 * @property {boolean} [useColor=true] - Si false, desactiva los colores ANSI en la salida. <- Chalk({level: 0})
 * @property {string|Function} [prefix=''] - Identificador estatico o funcional del logger.
 * @property {boolean} [debug=false] - Si true, habilita los mensajes de depuración (`debug()`).
 */
export default class Logger {
	/**
	 * Crea un logger configurable.
	 * @param {LoggerConfig} [config] - Opciones de configuración.
	 */
	constructor(config = {}) {
		this.config = {
			exitOnCritical: false,
			exitOnError: false,
			useColor: true,
			prefix: '',
			debug: false,
			...config,
		};

		this.chalk = this.config.useColor
			? new Chalk({ level: 3 })
			: new Chalk({ level: 0 });
	}

	getPrefix() {
		return typeof this.config.prefix === 'function'
			? `${this.config.prefix() || ''}`
			: this.config.prefix || '';
	}

	stdout(str, color = 'reset', usePrefix = false, isDebug = false) {
		if (isDebug && !this.config.debug) return;
		str += '\n';
		process.stdout.write(
			`${usePrefix ? this.getPrefix() : ''}` +
				(this.chalk[color]
					? this.chalk[color](str)
					: this.chalk.reset(str))
		);
	}

	stderr(str, color = 'red', usePrefix = false, isDebug = false) {
		if (isDebug && !this.config.debug) return;
		str += '\n';
		process.stderr.write(
			`${usePrefix ? this.getPrefix() : ''}` +
				(this.chalk[color]
					? this.chalk[color](str)
					: this.chalk.reset(str))
		);
	}

	debug(str, color = 'reset') {
		this.stdout(this.chalk.bold('[DEBUG] ') + str, color, true, true);
	}

	critical(str) {
		this.stderr(this.chalk.bold(`[CRITICAL] ${str}`), 'red', true);

		if (this.config.exitOnCritical) {
			this.debug(
				`Cerrando proceso con código de salida crítico: 1`,
				'red',
				true
			);
			process.exit(1);
		}
	}

	error(str, exitCode = 1) {
		this.stderr(`[ERROR] ${str}`, 'red', true);

		if (this.config.exitOnError) {
			this.debug(
				`Cerrando proceso con código de salida: ${exitCode}`,
				'red',
				true
			);
			process.exit(exitCode);
		}
	}

	warn(str) {
		this.stdout(`[WARN] ${str}`, 'yellow', true);
	}

	info(str) {
		this.stdout(`[INFO] ${str}`, 'reset', true);
	}
}
