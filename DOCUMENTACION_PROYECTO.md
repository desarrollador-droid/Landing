# INFORME TÉCNICO Y EJECUTIVO DE PROYECTO: ON SITE DIAGNOSTIC (OSD)
## Historial Completo de Transformación, Decisiones de Diseño y Hoja de Ruta Futura

---

### Resumen Ejecutivo
El presente documento consolida la totalidad de las intervenciones, decisiones de arquitectura, rediseños visuales, optimizaciones de experiencia de usuario (UX/UI) e implementaciones de código realizadas en la plataforma web de **On Site Diagnostic (OSD)**. 

El proyecto transitó desde una instalación monolítica y pesada de WordPress / Elementor hacia una **Single Page Application (SPA)** moderna, de alto rendimiento y ultra reactiva construida con **React 18, Vite y Tailwind CSS**, conservando al 100% el valor SEO histórico, adaptando herramientas clínicas especializadas e implementando un sistema visual fiel a los lineamientos de marca y documentos de diseño oficiales.

---

## 1. FASE I: DIAGNÓSTICO, ARQUITECTURA Y MIGRACIÓN BASE

### 1.1. Origen del Proyecto y Problemas Detectados
- **Estado Inicial**: Sitio montado sobre WordPress con el tema Astra, constructor visual Elementor, sliders con Depicter y múltiples plugins de terceros.
- **Limitaciones Previas**:
  - Tiempos de carga lentos y sobrecarga de scripts (`DOM bloated`).
  - Dificultades para crear interacciones clínicas fluidas (como calculadoras dinámicas y visualizadores de exámenes).
  - Experiencia móvil poco refinada y desajustes visuales entre la web y los portafolios comerciales oficiales en PDF.
- **Estrategia Adoptada**: Extracción completa de activos y contenidos para migrar a una arquitectura desacoplada basada en **Vite + React**.

### 1.2. Estructura de Rutas y Preservación SEO
Para evitar la pérdida de posicionamiento orgánico en Google de las URLs indexadas a lo largo de los años, se configuró un enrutamiento en [`App.jsx`](file:///C:/Users/PC/LocalWeb/src/App.jsx) que incluye:
- Rutas canónicas modernas (`/biologia-molecular`, `/clinica`, `/veterinarios`, `/contacto`, `/disbiosis`, `/aprende`, etc.).
- Soporte para slugs duplicados con y sin barra inclinada final (`/` y `""`).
- **Redirecciones canónicas automáticas** para URLs heredadas de WordPress (por ejemplo: `/shop` $\rightarrow$ `/servicios`, `/elementor-6116` $\rightarrow$ `/proyectos-investigacion-laboratorio-biologia-molecular`, artículos históricos de blog hacia sus nuevas rutas dinámicas).
- **Manejador Global de Scroll**: Componente `ScrollToTop` para reiniciar automáticamente el desplazamiento al inicio en cada cambio de vista.
- **Motor de Metadatos (`SEOManager.jsx`)**: Inyección dinámica de títulos SEO, etiquetas meta de descripción, Open Graph (redes sociales) y datos estructurados Schema.org para perfiles diagnósticos y noticias.

### 1.3. Segmentación de Audiencias (Médicos Veterinarios vs. Propietarios)
- Implementación de un conmutador de rol (`owner` vs. `vet`) persistido en `localStorage`.
- Adaptación dinámica de las barras de navegación (`Header`) y enlaces clave de acuerdo con la audiencia activa.

---

## 2. FASE II: DESARROLLO DE HERRAMIENTAS CLÍNICAS E INTERACTIVAS

Se desarrollaron componentes especializados que transformaron el sitio de una simple web informativa a un portal de soporte diagnóstico técnico:

### 2.1. Calculadora Interactiva de Índice de Disbiosis (`Disbiosis.jsx`)
- **Propósito**: Permitir a los médicos veterinarios ingresar los valores logarítmicos de qPCR de las 7 bacterias clave de la microbiota intestinal canina/felina (*Faecalibacterium*, *Turicibacter*, *Escherichia coli*, *Streptococcus*, *Blautia*, *Fusobacterium*, *Clostridium hiranonis*).
- **Lógica Matemática**: Implementación del algoritmo matemático de referencia internacional que calcula el puntaje ponderado de disbiosis.
- **Visualización**: Barra gráfica con rango continuo entre $-5.0$ y $+5.0$, línea de corte/umbral diagnóstica y clasificación cromática en tiempo real (Microbiota Normal, Fase de Transición o Disbiosis Significativa).

### 2.2. Visualizador Interactivo de Reportes ("Cómo Leer Resultados" - `ComoLeerResultados.jsx`)
- Módulo pedagógico con una réplica exacta en alta resolución de un informe de laboratorio OSD.
- Controles de zoom in/zoom out, ajuste automático a pantalla y puntos de interacción (*hotspots*) flotantes.
- Al hacer clic o hover en los puntos, se despliegan explicaciones clínicas sobre cada sección del informe (datos del paciente, curvas de amplificación qPCR, interpretación y notas del patólogo).

### 2.3. Catálogo de Biología Molecular y Perfiles de Diagnóstico (`BiologiaMolecular.jsx` y `Aprende.jsx`)
- Base de datos centralizada de exámenes moleculares estructurada en JSON (`biologia_molecular_data.json`).
- Filtrado dinámico por especie (caninos, felinos, equinos, animales silvestres) y por tipo de sistema afectado (respiratorio, hemotrópicos, digestivo, neurológico, dermatológico).
- Fichas técnicas completas con patógenos detectados, tipo de muestra requerida, conservación y tiempos de entrega.

### 2.4. Módulos Institucionales y Legales
- **Investigación (`Investigacion.jsx`)**: Exhibición de pósters científicos y proyectos de investigación de OSD con descarga de material académico.
- **Centro de Noticias (`Noticias.jsx` y `NoticiaDetalle.jsx`)**: Blog veterinario dinámico alimentado por `all_articles.json`.
- **PQRS (`Pqrs.jsx`) y Contacto (`Contacto.jsx`)**: Formularios de atención al usuario y radicación de solicitudes con validación en tiempo real y fondo animado por Canvas interactivo.
- **Cumplimiento Legal**: Páginas de Protección de Datos Personales y Políticas de Privacidad adaptadas a la legislación colombiana (Ley 1581 de 2012).

---

## 3. FASE III: REDISEÑO INTEGRAL DE LA VISTA CLÍNICAS (`/clinica`)

Esta fase concentró la mayor cantidad de refinamientos de diseño a solicitud del usuario, alineando la página web con el documento PDF de 5 páginas de presentación de OSD:

### 3.1. Hero Section con Scrollytelling Continuo (Páginas 1, 2 y 3 del PDF)
Se implementó un contenedor scrollytelling con altura fija de `320vh` que mantiene el contenido anclado (*sticky*) mientras el usuario desplaza hacia abajo:

1. **Slide 1 - Laboratorio Clínico OSD**:
   - Título impactante: *"NO SUPONGAS. DIAGNOSTICA."*
   - Sobretítulo con barra subrayada en cian `#01FADA`.
   - Botón de llamado a la acción enfocado a la solicitud de portafolio y enlace de atención.
   - Ilustración vectorial de bacterias en morado institucional (`bacterias-clinica-purple.png`) renderizada en ultra alta definición (1938 $\times$ 1867 px).
2. **Slide 2 - Logística Invisible (0$)**:
   - Sobretítulo: *"LOGÍSTICA INVISIBLE"*.
   - Cifra de impacto: `0$` destacando que el transporte de muestras no tiene costo para la clínica.
   - Ilustración vectorial con cambio dinámico a cian institucional (`bacterias-clinica-cyan.png`).
3. **Slide 3 - Cada Minuto Cuenta (15 MIN)**:
   - Sobretítulo: *"CADA MINUTO CUENTA"*.
   - Cifra de impacto: `15 MIN` para resultados preliminares en urgencias de pruebas de coagulación específicas (Dímero D, PT, PTT, TT, PRACT).

### 3.2. Integración de Requerimientos Específicos del Cliente
- **Aviso Exclusivo de Cobertura en Bogotá**:
  - El usuario solicitó que **única y exclusivamente** al ingresar a la vista de Clínicas, se notificara con claridad que el servicio de recolección gratuita aplica únicamente para Bogotá y Sabana.
  - Se implementó:
    1. En la barra superior (`Header.jsx`), una condición `isClinica` que sustituye el texto estándar por: `RECOLECCIÓN GRATIS · SERVICIO SOLO EN BOGOTÁ` con acento en cian `#01FADA`.
    2. *Badges* informativos con icono de chincheta/ubicación en los Slides 1 y 2 del hero.
    3. Mención contextual en las descripciones del servicio.
- **Enlace de Solicitud de Portafolio**:
  - Se vinculó el botón principal de portafolio al enlace directo de WhatsApp solicitado: `https://wa.link/osqeux`.

### 3.3. Reestructuración de "Categorías de Análisis Clínico" (Página 4 del PDF)
A solicitud expresa de apegarse al 100% al diseño del documento PDF:
- Se eliminaron botones individuales redundantes dentro de las tarjetas que no correspondían al PDF.
- Se implementaron **6 tarjetas blancas independientes** con:
  - Borde fino gris `#707070` idéntico al PDF.
  - Esquinas pronunciadas `rounded-[36px]`.
  - Títulos centrados en 2 líneas exactas:
    1. *Hematología y Coagulación*
    2. *Química Sanguínea y Electrolito*
    3. *Patología y Dermatología*
    4. *Microbiología y Excretas*
    5. *Hormonas y Serología*
    6. *Perfiles Especializados*
  - Descripciones clínicas centradas en texto oscuro legible.
- **Banner Inferior de Cierre**: Encabezado morado `#2B017C` con el texto de consulta sobre pruebas no listadas y el botón oficial `"SOLICITAR PORTAFOLIO"` apuntando a `https://wa.link/osqeux`.

---

## 4. FASE IV: DEPISIÓN DE DETALLES, RESPONSIVE Y FEEDBACK FINAL

Durante las pruebas en dispositivos móviles y la revisión de capturas de pantalla proporcionadas por el usuario, se atendieron y corrigieron los siguientes puntos críticos:

| Ítem | Problema Detectado | Solución Implementada | Archivo Modificado |
| :--- | :--- | :--- | :--- |
| **Colisión en TopBar** | En móviles estrechos (< 400px), el aviso de Bogotá y el WhatsApp chocaban en la misma fila. | Se configuró disposición vertical centrada en dos líneas (`flex-col sm:flex-row gap-1`) en pantallas móviles. | [`Header.jsx`](file:///C:/Users/PC/LocalWeb/src/components/Header.jsx) |
| **Hueco blanco en móvil** | En el hero de clínicas móvil quedaba un vacío vertical de > 120px entre las bacterias y el título. | Se cambió la alineación de `justify-center` a `justify-start` con padding superior reducido y máscara degradada inferior (`mask-image`). | [`Clinica.jsx`](file:///C:/Users/PC/LocalWeb/src/components/Clinica.jsx) |
| **Tamaño del icono $** | El signo de peso en la cifra `0$` era desproporcionado respecto al original. | Se calibró el tamaño (`text-2xl sm:text-4xl lg:text-5xl`) con alineación `items-baseline`. | [`Clinica.jsx`](file:///C:/Users/PC/LocalWeb/src/components/Clinica.jsx) |
| **Color del signo de peso** | El signo de peso estaba en cian, diferenciándose del número `0`. | Se cambió de `text-[#01FADA]` a `text-gray-900`, igualando exactamente el tono oscuro del cero según el PDF. | [`Clinica.jsx`](file:///C:/Users/PC/LocalWeb/src/components/Clinica.jsx) |
| **Corte brusco de imagen** | La imagen de bacterias terminaba en un corte horizontal rígido en pantallas móviles. | Se añadió un degradado progresivo alfa (`[mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]`) que desvanece las bacterias en el fondo blanco. | [`Clinica.jsx`](file:///C:/Users/PC/LocalWeb/src/components/Clinica.jsx) |

---

## 5. DECISIONES FUTURAS Y HOJA DE RUTA TÉCNICA (ROADMAP)

Para garantizar la escalabilidad, mantenibilidad y evolución continua de la plataforma OSD, se recomiendan las siguientes decisiones estratégicas:

### 5.1. Arquitectura y Rendimiento
1. **División de Código y Carga Perezosa (Lazy Loading)**:
   - *Situación actual*: El bundle principal de Vite genera un archivo JavaScript de ~689 kB (`dist/assets/index-*.js`).
   - *Acción futura recomendada*: Implementar `React.lazy()` y `Suspense` en [`App.jsx`](file:///C:/Users/PC/LocalWeb/src/App.jsx) para cargar las rutas bajo demanda (`ComoLeerResultados`, `BiologiaMolecular`, `Disbiosis`, `Clinica`, `Investigacion`).
   - *Impacto esperado*: Reducción del tamaño del paquete inicial a menos de 150 kB, mejorando el First Contentful Paint (FCP) y el puntaje en Google PageSpeed / Lighthouse (> 95).

2. **Migración de Contenido Estático a Headless CMS**:
   - *Situación actual*: Los artículos de noticias y las fichas de biología molecular se almacenan en archivos JSON estáticos locales (`all_articles.json`, `biologia_molecular_data.json`).
   - *Acción futura recomendada*: Conectar la aplicación con un gestor de contenido headless amigable (como Strapi, Sanity o Supabase) a través de una API REST o GraphQL.
   - *Beneficio*: Permitirá al equipo de OSD (veterinarios, marketing y redacción) redactar y publicar nuevas noticias, pósters y pruebas sin necesidad de editar código fuente ni recompilar la aplicación.

### 5.2. Infraestructura de Formularios y Seguridad
1. **Reemplazo de Enlaces Directos de Correo/WhatsApp por Backend Serverless**:
   - *Situación actual*: Los formularios de PQRS y Contacto envían datos mediante WhatsApp o servicios de webhook de terceros.
   - *Acción futura recomendada*: Crear funciones serverless (Cloudflare Workers, Vercel Functions o Netlify Functions) que procesen los envíos, adjunten comprobantes en PDF, almacenen el radicado en base de datos y envíen notificaciones transaccionales automáticas al cliente y al laboratorio vía SendGrid o Resend.
   - *Seguridad*: Implementación de reCAPTCHA v3 o Cloudflare Turnstile en los formularios para mitigar spam automatizado.

### 5.3. Funcionalidades Clínicas Avanzadas
1. **Generador y Descargador de Reportes de Disbiosis en PDF**:
   - Integrar una biblioteca en el cliente (como `@react-pdf/renderer` o `html2canvas + jspdf`) para que los veterinarios que utilicen la calculadora de disbiosis puedan exportar un informe oficial membretado con el logo de OSD, datos de la mascota y la gráfica interpretada para adjuntarlo a la historia clínica.
2. **Modo Offline / PWA (Progressive Web App)**:
   - Configurar un Service Worker con Vite PWA plugin para que herramientas de consulta frecuente (como los valores de referencia, el catálogo de muestras y la calculadora de disbiosis) funcionen en clínicas rurales o zonas con baja cobertura celular.

### 5.4. Estrategia Comercial y Multi-región
1. **Configuración Dinámica de Cobertura Geográfica**:
   - Actualmente, el sistema recuerda que la recolección gratuita es exclusiva para Bogotá y Sabana.
   - Si OSD abre sedes operativas en otras ciudades principales (Medellín, Cali, Barranquilla, Bucaramanga), se recomienda parametrizar las zonas de cobertura en un archivo de configuración (`src/config/coverage.js`) para que las alertas del Header y los badges se actualicen dinámicamente según la sede seleccionada por el usuario.

---

## 6. REGISTRO DE ARCHIVOS CLAVE DEL PROYECTO

- **Configuración y Enrutamiento**:
  - [`src/App.jsx`](file:///C:/Users/PC/LocalWeb/src/App.jsx) - Rutas, redirecciones y scroll manager.
  - [`src/index.css`](file:///C:/Users/PC/LocalWeb/src/index.css) - Reglas globales, directivas de Tailwind y fuentes corporativas.
- **Componentes Principales**:
  - [`src/components/Header.jsx`](file:///C:/Users/PC/LocalWeb/src/components/Header.jsx) - Navegación global, selector de rol y barra superior contextual.
  - [`src/components/Clinica.jsx`](file:///C:/Users/PC/LocalWeb/src/components/Clinica.jsx) - Landing page clínica, scrollytelling de 3 slides y categorías de análisis.
  - [`src/components/Disbiosis.jsx`](file:///C:/Users/PC/LocalWeb/src/components/Disbiosis.jsx) - Calculadora matemática del índice de disbiosis.
  - [`src/components/ComoLeerResultados.jsx`](file:///C:/Users/PC/LocalWeb/src/components/ComoLeerResultados.jsx) - Visor interactivo de reportes con hotspots.
  - [`src/components/BiologiaMolecular.jsx`](file:///C:/Users/PC/LocalWeb/src/components/BiologiaMolecular.jsx) - Catálogo técnico y filtros de exámenes moleculares.
  - [`src/components/SEOManager.jsx`](file:///C:/Users/PC/LocalWeb/src/components/SEOManager.jsx) - Gestión dinámica de metadatos y Schema JSON-LD.
  - [`src/components/Footer.jsx`](file:///C:/Users/PC/LocalWeb/src/components/Footer.jsx) - Pie de página institucional, redes y enlaces legales.
- **Datos y Activos**:
  - `public/images/bacterias-clinica-purple.png` - Vector en alta definición de microorganismos morados.
  - `public/images/bacterias-clinica-cyan.png` - Vector en alta definición de microorganismos cian.
  - `src/assets/all_articles.json` - Base de datos de artículos y publicaciones científicas.
  - `src/assets/biologia_molecular_data.json` - Catálogo completo de analitos y parámetros qPCR.

---
*Informe generado para el equipo directivo y técnico de On Site Diagnostic (OSD).*
