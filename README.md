# Generador Universal de Informes

Herramienta web para armar informes formales y descargarlos como documento Word (`.docx`). Se completan los datos en un formulario y la app genera un documento con portada, secciones, tabla de métricas y firmas.

Sitio publicado: https://generador-documento.netlify.app

## Funcionalidades

- **Estilos visuales**: Moderno, Corporativo Oscuro, Ecológico, Tecnológico y Clásico Papel.
- **Nivel de formalidad**: Estándar, Interno / Operativo, Ejecutivo y Solemne / Legal.
- **Alineación del cuerpo**: izquierda o justificado.
- **Marca de agua** opcional: BORRADOR, CONFIDENCIAL o PRELIMINAR.
- **Imagen de encabezado** (PNG o JPG, hasta 5 MB).
- **Bloque de firmas**: sin firmas, 1 o 2 firmas.
- **Metadatos**: título, subtítulo o área, autor, departamento, destinatario y fecha.
- **Contenido**: resumen ejecutivo, tabla de métricas o indicadores (se pueden agregar las filas que hagan falta), conclusiones y siguientes pasos, y estado final (BORRADOR, APROBADO, REQUIERE ACCIÓN o CONFIDENCIAL).
- **Vista previa** antes de descargar.

## Cómo se usa

1. Elegí el estilo, la formalidad y las opciones de formato.
2. Completá los datos del documento y el contenido. Los campos con `*` son obligatorios.
3. Con **+ Agregar métrica** sumás filas a la tabla de indicadores.
4. Tocá **Vista Previa** para revisarlo.
5. Tocá **Generar Documento Word** para descargar el `.docx`.

## Ejecutar localmente

No necesita instalación. Abrí `index.html` en el navegador. Hace falta conexión a internet, porque las librerías `docx` y `FileSaver` se cargan desde unpkg.

## Estructura

```
index.html   Formulario y vista previa
styles.css   Estilos
app.js       Lógica: vista previa, KPIs, generación del .docx
```
