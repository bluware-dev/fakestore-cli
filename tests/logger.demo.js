// Demo de uso del logger: pruebas manuales de todos los niveles y configuraciones
import Logger from '../src/core/logger.js';

// Establecer un logger general en modo depuracion.
const log = new Logger({ debug: true });

log.debug('Esto es un mensaje de depuración.');
log.info('Esto es un mensaje de información.');
log.warn('Esta es una advertencia.');
log.error('Se detectaron errores.'); // Tambien puede especificarse 'exitCode' si 'config.exitOnError' esta activo.
log.critical('DROP DATABASE production; ヽ(ﾟДﾟ)ﾉ');

// Extra: Salidas en crudo (stdout, stderr)
log.stdout('Esto es un stdout con ansi personalizado', 'magenta'); // Util para colorear y formatear respuestas.
log.stderr('Esto es un stderr sin ansi', 'Reset'); // Tambien funciona dejando el string vacio ''
log.stderr('Esto es un stderr con ansi (Comportamiento predeterminado)'); // Comportamiento default de 'stderr()'

// Establecer un logger auxiliar o sub-logger identificandolo con un "prefix" (Sin colores ansi)
const auxLog = new Logger({
	useColor: false,
	prefix: '[NO-COLOR]',
	debug: true,
});

auxLog.debug('Esto es otro mensaje de depuración.');
auxLog.info('Esto es otro mensaje de información.');
auxLog.warn('Esta es otra advertencia.');
auxLog.error('Se detectaron errores.');

// Establecer un logger auxiliar o sub-logger con un "prefix" timestamp funcional.
const timestampHandler = () => {
	const date = new Date();

	const dateFormatter = new Intl.DateTimeFormat('es-AR', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	});

	const timeFormatter = new Intl.DateTimeFormat('es-AR', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});

	const [day, month] = dateFormatter.format(date).split('/');
	const time = timeFormatter.format(date);

	const formatted = `${day}/${month} - ${time}`;
	return `[${formatted}]`;
};

const timeLog = new Logger({
	prefix: timestampHandler,
	exitOnCritical: true,
	exitOnError: true,
	debug: true,
});

timeLog.debug('Esto es otro mensaje de depuración.');
timeLog.info('Esto es otro mensaje de informacion.');
timeLog.warn('Esta es otra adevertencia.');
timeLog.error('Se detectaron errores.');
timeLog.critical('Este registro no llega a ejecutarse...');
