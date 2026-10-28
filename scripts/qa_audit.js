import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('\n======================================================');
console.log('   OSD LANDING - AUDITORÍA DE CALIDAD (QA PRE-DEPLOY)');
console.log('   Destino: GoDaddy (Apache / cPanel public_html)');
console.log('======================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${message}`);
    if (details) console.error(`         Detalle: ${details}`);
  }
}

// -------------------------------------------------------------
// 1. VERIFICACIÓN DE ARCHIVOS CRÍTICOS EN DIST/
// -------------------------------------------------------------
console.log('1. Verificando integridad del directorio de compilación (dist/)...');
const distPath = path.join(rootDir, 'dist');
assert(fs.existsSync(distPath), 'Directorio dist/ existe tras el build');

const criticalDistFiles = [
  'index.html',
  '.htaccess',
  'robots.txt',
  'sitemap.xml'
];

criticalDistFiles.forEach(file => {
  const filePath = path.join(distPath, file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 0, `Archivo crítico dist/${file} presente y no vacío (${size} bytes)`);
});

// -------------------------------------------------------------
// 2. VERIFICACIÓN DE ENRUTAMIENTO APACHE (.htaccess PARA GODADDY)
// -------------------------------------------------------------
console.log('\n2. Verificando reglas de .htaccess para GoDaddy (SPA Fallback & HTTPS)...');
const htaccessPath = path.join(distPath, '.htaccess');
if (fs.existsSync(htaccessPath)) {
  const htaccess = fs.readFileSync(htaccessPath, 'utf8');
  assert(htaccess.includes('RewriteEngine On'), '.htaccess contiene RewriteEngine On');
  assert(htaccess.includes('RewriteRule ^ index.html [QSA,L]'), '.htaccess contiene Fallback SPA hacia index.html');
  assert(htaccess.includes('%{HTTPS}'), '.htaccess contiene redirección forzada a HTTPS');
  assert(htaccess.includes('Strict-Transport-Security'), '.htaccess contiene cabeceras de seguridad HSTS');
  assert(htaccess.includes('mod_deflate.c') || htaccess.includes('DEFLATE'), '.htaccess contiene compresión Gzip');
}

// -------------------------------------------------------------
// 3. VERIFICACIÓN DE CORREOS DE DESTINO EN FORMULARIOS
// -------------------------------------------------------------
console.log('\n3. Verificando endpoints y correos oficiales en formularios...');
const formsCheck = [
  {
    file: 'src/components/Contacto.jsx',
    expectedEmail: 'lideralianzas@osdiagnostic.com',
    label: 'Contacto general'
  },
  {
    file: 'src/components/Pqrs.jsx',
    expectedEmail: 'gestionhumana@osdiagnostic.com',
    label: 'PQR\'S Reclamos'
  },
  {
    file: 'src/components/Investigacion.jsx',
    expectedEmail: 'investigacion@osdiagnostic.com',
    label: 'Registra tu caso (Investigación)'
  },
  {
    file: 'src/components/PreguntasFrecuentes.jsx',
    expectedEmail: 'publicidad@osdiagnostic.com',
    label: 'Preguntas Frecuentes FAQ'
  }
];

formsCheck.forEach(({ file, expectedEmail, label }) => {
  const fullPath = path.join(rootDir, file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const hasEmail = content.includes(expectedEmail);
    assert(hasEmail, `Formulario ${label} apunta a: ${expectedEmail}`);
  } else {
    assert(false, `Archivo ${file} no encontrado`);
  }
});

// -------------------------------------------------------------
// 4. VERIFICACIÓN DE LÍNEAS DE WHATSAPP OFICIALES
// -------------------------------------------------------------
console.log('\n4. Verificando línea oficial de atención WhatsApp...');
const contactComponent = fs.readFileSync(path.join(rootDir, 'src/components/Contacto.jsx'), 'utf8');
const faqComponent = fs.readFileSync(path.join(rootDir, 'src/components/PreguntasFrecuentes.jsx'), 'utf8');
assert(contactComponent.includes('3005143727') || contactComponent.includes('300 5143727'), 'Línea 300 5143727 presente en Contacto.jsx');
assert(faqComponent.includes('3005143727') || faqComponent.includes('300 5143727'), 'Línea 300 5143727 presente en PreguntasFrecuentes.jsx');

// -------------------------------------------------------------
// 5. AUDITORÍA DE RUTAS EN REACT ROUTER VS SITEMAP.XML
// -------------------------------------------------------------
console.log('\n5. Verificando consistencia de rutas entre App.jsx y sitemap.xml...');
const appContent = fs.readFileSync(path.join(rootDir, 'src/App.jsx'), 'utf8');
const sitemapContent = fs.readFileSync(path.join(rootDir, 'public/sitemap.xml'), 'utf8');

const coreRoutes = [
  '/',
  '/veterinarios',
  '/clinica',
  '/biologia-molecular',
  '/disbiosis',
  '/aprende',
  '/investigacion',
  '/noticias-veterinarias',
  '/conocenos',
  '/contacto',
  '/preguntas-frecuentes',
  '/laboratorio-de-biologia-molecular-preguntas-frecuentes',
  '/proteccion-de-datos',
  '/politica-de-privacidad',
  '/pqr-s'
];

coreRoutes.forEach(route => {
  const inApp = appContent.includes(`path="${route}"`);
  assert(inApp, `Ruta "${route}" configurada en App.jsx`);
  if (route !== '/') {
    const slug = route.replace(/^\//, '');
    const inSitemap = sitemapContent.includes(slug);
    assert(inSitemap, `Ruta "${route}" indexada en sitemap.xml`);
  }
});

// -------------------------------------------------------------
// 6. RESULTADO FINAL
// -------------------------------------------------------------
console.log('\n======================================================');
console.log(`   RESUMEN QA: ${passedTests}/${totalTests} pruebas superadas.`);
if (failedTests === 0) {
  console.log('   ESTADO: [APROBADO PARA DESPLIEGUE EN GODADDY]');
} else {
  console.error(`   ESTADO: [HAY ${failedTests} PRUEBAS FALLIDAS]`);
}
console.log('======================================================\n');

process.exit(failedTests === 0 ? 0 : 1);
