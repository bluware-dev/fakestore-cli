import { chalk } from './index.js';

export const HELP_TEMPLATES = {
	GLOBAL: () => `${chalk.magenta(
		`
░█▀▀░█▀█░█░█░█▀▀░░░█▀▀░▀█▀░█▀█░█▀▄░█▀▀░░░░░░░░░█▀▀░█░░░▀█▀
░█▀▀░█▀█░█▀▄░█▀▀░░░▀▀█░░█░░█░█░█▀▄░█▀▀░░░▄▄▄░░░█░░░█░░░░█░
░▀░░░▀░▀░▀░▀░▀▀▀░░░▀▀▀░░▀░░▀▀▀░▀░▀░▀▀▀░░░░░░░░░▀▀▀░▀▀▀░▀▀▀`.trim()
	)}

${chalk.bold('Metodos:')}
	${chalk.bold.green('POST')}         Crear un producto        ${chalk.yellow('[products <title> <price> <category>]')}
	${chalk.bold.green('PUT')}          Actualizar un producto   ${chalk.yellow('[products/<id> <title> <price> <category>]')}
	${chalk.bold.green('GET')}          Obtener un producto      ${chalk.yellow('[products/<id>]')}
	${chalk.bold.green('DELETE')}       Eliminar un producto     ${chalk.yellow('[products/<id>]')}

${chalk.bold('Flags:')}
	${chalk.bold.green('-h, --help')}    Muestra este mensaje (NPM: 'npm start help')
	${chalk.bold.green('--no-ansi')}     Deshabilita colores y estilos ANSI (NPM: 'npm start -- --no-ansi ...[args]')
	${chalk.bold.green('--debug')}       Habilita modo depuración  (NPM: 'npm run debug ...[args]')

Para mas detalles y ejemplos usa: ${chalk.bold.yellow(`[npm, pnpm] start ${chalk.bold.green('{COMANDO}')} help`)}
`,

	POST: () => `${chalk.bold('Uso:')}
	${chalk.bold.green('POST')} [products <title?> <price?> <category?> <description?> <image?>]

${chalk.bold('Descripción:')} Crea un nuevo producto en la base de datos.

${chalk.bold('Parámetros: (opcionales)')}  
	${chalk.bold.yellow('<title>')}        Título del producto  
	${chalk.bold.yellow('<price>')}        Precio del producto  
	${chalk.bold.yellow('<category>')}     Categoría del producto  
	${chalk.bold.yellow('<description>')}  Descripción del producto  
	${chalk.bold.yellow('<image>')}        URL de imagen del producto  

${chalk.bold('Ejemplo:')}  
${chalk.cyan('[npm, pnpm] start POST products "Mouse Gamer" 59.99 "Periféricos" "RGB y ergonómico" "https://example.com/mouse.jpg"')}

Si se envía una petición sin parámetros solo se devolverá ${chalk.yellow('{ id: 21 }')}  
PD: la API no permite enviar un custom ID.
`,

	PUT: () => `${chalk.bold('Uso:')}
	${chalk.bold.green('PUT')} [products/<id> <title?> <price?> <category?> <description?> <image?>]

${chalk.bold('Descripción:')} Actualiza un producto existente por su ID.

${chalk.bold('Parámetros: (opcionales)')}  
	${chalk.bold.yellow('<id>')}           ID del producto a actualizar  
	${chalk.bold.yellow('<title>')}        Nuevo título del producto  
	${chalk.bold.yellow('<price>')}        Nuevo precio del producto  
	${chalk.bold.yellow('<category>')}     Nueva categoría del producto  
	${chalk.bold.yellow('<description>')}  Nueva descripción del producto  
	${chalk.bold.yellow('<image>')}        Nueva URL de imagen del producto  

${chalk.bold('Ejemplo:')}  
${chalk.cyan('[npm, pnpm] start PUT products/12 "Teclado Mecánico" 99.99 "Periféricos" "Switches azules" "https://example.com/keyboard.jpg"')}

Si se envía una petición sin parámetros solo se devolverá ${chalk.yellow('{ id: <id> }')}
`,

	GET: () => `${chalk.bold('Uso:')}
	${chalk.bold.green('GET')} [products/<id>]
${chalk.bold('Descripción:')} Obtiene los datos de un producto por su ID.

${chalk.bold('Parámetros:')}  
	${chalk.bold.yellow('<id>')}   ID del producto a consultar

${chalk.bold('Ejemplo:')}  
${chalk.cyan('[npm, pnpm] start GET products/12')}
`,

	DELETE: () => `${chalk.bold('Uso:')}
	${chalk.bold.green('DELETE')} [products/<id>]

${chalk.bold('Descripción:')} Elimina un producto existente por su ID.

${chalk.bold('Parámetros:')}  
	${chalk.bold.yellow('<id>')}   ID del producto a eliminar

${chalk.bold('Ejemplo:')}  
${chalk.cyan('[npm, pnpm] start DELETE products/12')}
`,
};
