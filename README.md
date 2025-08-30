# 🧪 JWT Profile Manager - Prueba Técnica Frontend

Una aplicación web moderna desarrollada con Next.js que permite la gestión completa de perfiles de usuario mediante APIs REST autenticadas con JWT.

## 🎯 Características principales

### ✅ Funcionalidades implementadas

- 🔐 **Autenticación JWT**: Login seguro con manejo de tokens
- 👤 **Visualización de perfil**: Muestra información completa del usuario
- ✏️ **Edición de perfil**: Formulario completo para actualizar datos
- 📷 **Gestión de foto**: Subida y actualización de imagen de perfil
- 🔄 **Estados de carga**: Skeletons y indicadores visuales
- 📱 **Diseño responsive**: Adaptable a todos los dispositivos
- 🚨 **Manejo de errores**: Mensajes informativos y validación

### 🛡️ Seguridad

- Tokens JWT almacenados de forma segura
- Middleware de autenticación en rutas protegidas
- Validación de formularios con schemas
- Interceptores para manejo automático de tokens

## 🛠️ Tecnologías utilizadas

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + shadcn/ui
- **Validación**: Zod
- **HTTP Client**: Axios
- **Notificaciones**: Sonner
- **Iconos**: Lucide React

## 📁 Estructura del proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── login/             # Página de login
│   ├── profile/           # Página de perfil
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
│   ├── auth/              # Componentes de autenticación
│   ├── profile/           # Componentes de perfil
│   └── ui/                # Componentes de interfaz (shadcn/ui)
├── hooks/                 # Custom hooks
├── lib/                   # Utilidades y configuración
├── schemas/               # Schemas de validación Zod
├── services/              # Servicios API
├── types/                 # Tipos TypeScript
└── middleware.ts          # Middleware de autenticación
```

## 🚀 Instalación y configuración

### Prerrequisitos

- Node.js 18+
- npm, yarn o pnpm

### 1. Clonar el repositorio

```bash
git clone git@github.com:Jamova01/jwt-profile-manager.git
cd jwt-profile-manager
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🧾 Credenciales de prueba

Para probar la aplicación, utiliza las siguientes credenciales:

```json
{
  "username": "carlosandresmoreno",
  "password": "90122856_Hanz"
}
```

## 🌐 Endpoints API utilizados

| Funcionalidad     | Método | Endpoint                        | Descripción                         |
| ----------------- | ------ | ------------------------------- | ----------------------------------- |
| 🔐 Login          | POST   | `/usuarios/api/login/`          | Autenticación y obtención de tokens |
| 📄 Obtener perfil | GET    | `/usuarios/api/perfil/`         | Consulta datos del perfil           |
| ✏️ Editar perfil  | PUT    | `/usuarios/api/usuario/perfil/` | Actualización completa del perfil   |
| 📷 Subir foto     | PATCH  | `/usuarios/api/perfil/foto/`    | Actualización de foto de perfil     |

**Base URL**: `http://46.202.88.87:8010`

## 🔧 Configuración de desarrollo

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_BASE_URL=http://46.202.88.87:8010
```

### Scripts disponibles

```bash
npm run dev          # Modo desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar en producción
npm run lint         # Linter ESLint
```

## 🎨 Componentes principales

### 🔐 LoginForm

- Formulario de autenticación con validación
- Manejo de estados de carga y error
- Redirección automática tras login exitoso

### 👤 ProfileForm

- Edición completa del perfil de usuario
- Validación en tiempo real
- Campos para información personal y redes sociales

### 📷 ProfilePhotoForm

- Subida de imágenes con preview
- Validación de tipos de archivo
- Compresión y optimización automática

## 🧪 Flujo de usuario

1. **Login**: El usuario ingresa credenciales
2. **Autenticación**: Se validan y obtienen tokens JWT
3. **Perfil**: Se cargan y muestran los datos del usuario
4. **Edición**: El usuario puede modificar su información
5. **Foto**: Posibilidad de actualizar imagen de perfil

## 📱 Características responsive

- Diseño mobile-first
- Breakpoints optimizados para tablet y desktop
- Componentes adaptables con Tailwind CSS
- Navegación fluida en todos los dispositivos

## 🚨 Manejo de errores

- Validación de formularios con feedback visual
- Mensajes de error específicos por campo
- Notificaciones toast para operaciones
- Redirección automática en caso de token expirado

## 🔒 Seguridad implementada

- Almacenamiento seguro de tokens en localStorage
- Middleware de protección de rutas
- Interceptores HTTP para autorización automática
- Validación de datos con esquemas TypeScript

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👨‍💻 Desarrollado por

**Jorge** - [GitHub Profile](https://github.com/Jamova01)

---

### 📞 Contacto

Si tienes preguntas o sugerencias sobre este proyecto, no dudes en contactarme.

**¡Gracias por revisar mi implementación de la prueba técnica!** 🚀
