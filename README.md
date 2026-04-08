# 🚀 Sistema de Gestión de Recursos Humanos - Frontend

Este es el cliente web del **Sistema de RRHH**, una aplicación moderna desarrollada con **React** y **Vite**. Permite gestionar el ciclo de vida de los datos de empleados (CRUD) mediante una interfaz intuitiva y rápida.

---

## 🌐 Demo en Vivo
Puedes ver la aplicación funcionando aquí:  
🔗 **[https://frontend-rh-react.vercel.app](https://frontend-rh-react.vercel.app)**

---

## ✨ Características
- **Listado en tiempo real:** Visualización de empleados con datos obtenidos desde una API REST.
- **Gestión Completa (CRUD):** - ➕ Registro de nuevos empleados.
  - ✏️ Edición de datos existentes (Nombre, Departamento, Sueldo).
  - 🗑️ Eliminación con confirmación de seguridad.
- **Diseño Responsivo:** Interfaz adaptada a dispositivos móviles y escritorio gracias a **Bootstrap 5**.
- **Formateo Automático:** Los sueldos se muestran y editan con formato de moneda local.

## 🛠️ Stack Tecnológico
- **Core:** [React.js](https://reactjs.org/) (Hooks, Context, Router)
- **Herramienta de Construcción:** [Vite](https://vitejs.dev/)
- **Estilos:** [Bootstrap 5](https://getbootstrap.com/)
- **Peticiones HTTP:** [Axios](https://axios-http.com/)
- **Despliegue:** [Vercel](https://vercel.com/)

## ⚙️ Configuración del Proyecto

### Requisitos previos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/)

### Instalación
1. Clona el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/Frontend-RH-React.git](https://github.com/tu-usuario/Frontend-RH-React.git)
   ```
2. Instala las dependencias:

```Bash
npm install
```

3. Configura la URL del backend en src/config.js:

```JavaScript
export const urlBase = "[https://backend-rh-django.onrender.com/api/empleados](https://backend-rh-django.onrender.com/api/empleados)";
```
4. Ejecución
Para iniciar el servidor de desarrollo:

```Bash
npm run dev
```
5. Para generar la versión de producción:

```Bash
npm run build
```
### 🏗️ Arquitectura del Sistema
El frontend forma parte de un ecosistema Fullstack:

Backend: Django (Render)

Base de Datos: MySQL (Aiven Cloud)

Frontend: React (Vercel)

Desarrollado con ❤️ por Jose Alejandro Valduz Contreras
