<h1 align="center"><b>FakeStore CLI (Standalone)</b></h1>
<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/FakeStoreAPI-Client-orange?logo=firebase&logoColor=white">
  <img src="https://img.shields.io/badge/License-MIT-blue?logo=open-source-initiative&logoColor=white">
</p>

<pre align="center">
░█▀▀░█▀█░█░█░█▀▀░░░█▀▀░▀█▀░█▀█░█▀▄░█▀▀░░░░░░░░░█▀▀░█░░░▀█▀
░█▀▀░█▀█░█▀▄░█▀▀░░░▀▀█░░█░░█░█░█▀▄░█▀▀░░░▄▄▄░░░█░░░█░░░░█░
░▀░░░▀░▀░▀░▀░▀▀▀░░░▀▀▀░░▀░░▀▀▀░▀░▀░▀▀▀░░░░░░░░░▀▀▀░▀▀▀░▀▀▀
</pre>

<p align="center">
<em>Versión simplificada del CLI para consumir la <a href="https://fakestoreapi.com">FakeStoreAPI</a>. Implementación en Node.js sin dependencias, usando <code>fetch</code> y <code>process.argv</code>.</em>
</p>

---

### 🚀 Uso rápido

```bash
# Clonar repositorio (standalone branch)
git clone -b standalone https://github.com/bluware-dev/fakestore-cli.git
cd fakestore-cli/

# Ejecutar versión standalone
npm start <COMANDO> [args]

```

---

### 📜 Comandos disponibles

| Método        | Descripción                 | Ejemplo                                       |
| ------------- | --------------------------- | --------------------------------------------- |
| 🟢 **POST**   | Crear un producto           | `npm start POST products "Camisa" 29.99 ropa` |
| 🔵 **GET**    | Obtener un producto         | `npm start GET products/1`                    |
| 🔴 **DELETE** | Eliminar un producto        | `npm start DELETE products/1`                 |
| 🧩 **HELP**   | Mostrar ayuda contextual    | `npm start help`                              |

---

### 🧠 Estructura del script

```bash
src/
 └── index.js   # Script ejecutable unico (versión minificada)
```

---

<h3 align="center">
	<a href="LICENSE">Licencia MIT ✍️</a>
</h3>
