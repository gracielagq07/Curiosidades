# 👩‍💻 Curiosidades: Un Proyecto de Frases Curiosas

¡Bienvenido/a al repositorio de **Curiosity Of The Day**! 🚀

Este fue un proyecto personal que desarrollé para practicar la conexión a APIs y la persistencia de datos en el navegador. La idea es sencilla: mostrar datos curiosos aleatorios y permitir guardar los que más me gusten.

---

### ¿Cómo Funciona?

La app funciona trayendo un dato curioso en español de una API pública. Lo más importante es que las frases que guardas se quedan en tu navegador (gracias al Local Storage), ¡así que regresarán aunque cierres la pestaña!

### 🔑 Mis Aprendizajes Clave

Al crear esta aplicación, me enfoqué en dominar:

* **Manipulación del DOM y Asincronía:** Gestionar la carga y visualización de datos usando **JavaScript vainilla** (sin *frameworks*).
* **Gestión de la API:** Conectar y manejar errores de la API externa (Fetch API).
* **Persistencia de Datos:** Implementar `localStorage` para que la lista de favoritos sea permanente.
* **Feedback de Usuario:** Agregar un sonido de confirmación (chime) para notificar éxito al guardar o borrar.

### 🛠 Stack Tecnológico

* **Estructura:** HTML5
* **Estilos:** CSS3
* **Lógica:** JavaScript (Vanilla JS)
* **Datos:** Useless Facts API

### 👉  ¡Cotillealo aquí!!! -- https://gracielagq07.github.io/Curiosidades/

---

### Cómo Empezar (Para Mí o Quien Quiera Revisarlo)

1.  **Clona este repositorio.**
    ```bash
    git clone [https://github.com/gracielagq07/Curiosidades.git](https://github.com/gracielagq07/Curiosidades.git)
    ```
2.  **Abre en VS Code** y usa la extensión Live Server para ejecutar `index.html`.


## 📂 Estructura del Proyecto 

```text
CURIOSIDADES/     
├── audio/
│   └── success.mp3
├── scripts/
│   └── test1.test.js
├── styles/
│   └── style.css
├── index.html
├── package-lock.json
├── package.json
└── README.md

