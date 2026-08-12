/* ============================================================
   GENERADOR UNIVERSAL DE INFORMES — APP V2
   ============================================================ */

// ─── CONFIGURACIONES ─────────────────────────────────────────
const ESTILOS = {
  moderno: {
    name: 'Moderno',
    headerBg: 'F1F5F9',
    headerTitleColor: '0F172A',
    headerSubtitleColor: '0284C7',
    headerBorderLeft: { style: 'SINGLE', size: 36, color: '0284C7' },
    secBg: 'F1F5F9',
    secTextColor: '0F172A',
    bodyTextColor: '1E293B',
    secBorders: {
      top: 'NONE', bottom: 'NONE', left: 'SINGLE', right: 'NONE',
      leftColor: '0284C7', leftSize: 36
    },
    kpiHeaderBg: '0F172A',
    kpiHeaderText: 'FFFFFF',
    estadoColors: {
      BORRADOR: 'E2E8F0',
      APROBADO: 'D1FAE5',
      'REQUIERE ACCIÓN': 'FEE2E2',
      CONFIDENCIAL: 'FEF3C7'
    },
    metaBg: 'F8FAFC',
    metaBorder: 'E2E8F0',
    quoteBg: 'F1F5F9',
    quoteBorder: '0284C7'
  },
  corporativo: {
    name: 'Corporativo Oscuro',
    headerBg: '1E3A5F',
    headerTitleColor: 'FFFFFF',
    headerSubtitleColor: 'C9A227',
    headerBorderLeft: { style: 'SINGLE', size: 36, color: 'C9A227' },
    secBg: '1E3A5F',
    secTextColor: 'FFFFFF',
    bodyTextColor: '1E293B',
    secBorders: {
      top: 'NONE', bottom: 'SINGLE', left: 'NONE', right: 'NONE',
      bottomColor: 'C9A227', bottomSize: 24
    },
    kpiHeaderBg: '1E3A5F',
    kpiHeaderText: 'FFFFFF',
    estadoColors: {
      BORRADOR: 'E2E8F0',
      APROBADO: 'D1FAE5',
      'REQUIERE ACCIÓN': 'FEE2E2',
      CONFIDENCIAL: 'FEF3C7'
    },
    metaBg: 'F1F5F9',
    metaBorder: '1E3A5F',
    quoteBg: 'F1F5F9',
    quoteBorder: 'C9A227'
  },
  ecologico: {
    name: 'Ecológico',
    headerBg: 'F0FDF4',
    headerTitleColor: '14532D',
    headerSubtitleColor: '16A34A',
    headerBorderLeft: { style: 'SINGLE', size: 36, color: '15803D' },
    secBg: 'F0FDF4',
    secTextColor: '14532D',
    bodyTextColor: '1E293B',
    secBorders: {
      top: 'NONE', bottom: 'NONE', left: 'SINGLE', right: 'NONE',
      leftColor: '15803D', leftSize: 36
    },
    kpiHeaderBg: '15803D',
    kpiHeaderText: 'FFFFFF',
    estadoColors: {
      BORRADOR: 'E2E8F0',
      APROBADO: 'DCFCE7',
      'REQUIERE ACCIÓN': 'FEE2E2',
      CONFIDENCIAL: 'FEF9C3'
    },
    metaBg: 'F0FDF4',
    metaBorder: '16A34A',
    quoteBg: 'F0FDF4',
    quoteBorder: '16A34A'
  },
  tecnologico: {
    name: 'Tecnológico',
    headerBg: '0F172A',
    headerTitleColor: 'FFFFFF',
    headerSubtitleColor: '38BDF8',
    headerBorderLeft: { style: 'SINGLE', size: 36, color: '38BDF8' },
    secBg: '1E293B',
    secTextColor: 'FFFFFF',
    bodyTextColor: '1E293B',
    secBorders: {
      top: 'NONE', bottom: 'NONE', left: 'SINGLE', right: 'NONE',
      leftColor: '0EA5E9', leftSize: 36
    },
    kpiHeaderBg: '0F172A',
    kpiHeaderText: '38BDF8',
    estadoColors: {
      BORRADOR: 'E2E8F0',
      APROBADO: 'D1FAE5',
      'REQUIERE ACCIÓN': 'FEE2E2',
      CONFIDENCIAL: 'FEF3C7'
    },
    metaBg: 'F1F5F9',
    metaBorder: '0F172A',
    quoteBg: 'F1F5F9',
    quoteBorder: '0EA5E9'
  },
  clasico: {
    name: 'Clásico Papel',
    headerBg: 'FFFBEB',
    headerTitleColor: '78350F',
    headerSubtitleColor: '92400E',
    headerBorderLeft: { style: 'DOUBLE', size: 24, color: '92400E' },
    secBg: 'FEF3C7',
    secTextColor: '78350F',
    bodyTextColor: '451A03',
    secBorders: {
      top: 'SINGLE', bottom: 'SINGLE', left: 'NONE', right: 'NONE',
      topColor: '92400E', topSize: 12,
      bottomColor: '92400E', bottomSize: 12
    },
    kpiHeaderBg: '92400E',
    kpiHeaderText: 'FFFBEB',
    estadoColors: {
      BORRADOR: 'E2E8F0',
      APROBADO: 'DCFCE7',
      'REQUIERE ACCIÓN': 'FEE2E2',
      CONFIDENCIAL: 'FEF9C3'
    },
    metaBg: 'FFFBEB',
    metaBorder: '92400E',
    quoteBg: 'FFFBEB',
    quoteBorder: '92400E'
  }
};

const FORMALIDADES = {
  estandar: {
    font: 'Calibri',
    lineSpacing: 276,
    sectionUppercase: false,
    addQuotes: false,
    compact: false,
    spacious: false,
    romanNumbers: false,
    sectionSpacing: { before: 120, after: 120 }
  },
  interno: {
    font: 'Arial',
    lineSpacing: 240,
    sectionUppercase: false,
    addQuotes: false,
    compact: true,
    spacious: false,
    romanNumbers: false,
    sectionSpacing: { before: 80, after: 80 }
  },
  ejecutivo: {
    font: 'Georgia',
    lineSpacing: 300,
    sectionUppercase: false,
    addQuotes: true,
    compact: false,
    spacious: true,
    romanNumbers: false,
    sectionSpacing: { before: 200, after: 160 }
  },
  solemne: {
    font: 'Times New Roman',
    lineSpacing: 360,
    sectionUppercase: true,
    addQuotes: false,
    compact: false,
    spacious: true,
    romanNumbers: true,
    sectionSpacing: { before: 240, after: 200 }
  }
};

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

// ─── ESTADO ──────────────────────────────────────────────────
let kpis = [
  { label: 'Presupuesto Ejecutado', value: '84%' },
  { label: 'Nivel de Cumplimiento', value: 'Conforme a Cronograma' },
  { label: 'Satisfacción del Cliente', value: '4.7 / 5.0' },
  { label: 'Tiempo Medio de Respuesta', value: '18 minutos' },
  { label: 'Procesos Automatizados', value: '85%' },
  { label: 'Personal Certificado', value: '94%' }
];
let sectionCounter = 0;

// ─── INICIALIZACIÓN ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('fechaDoc').valueAsDate = new Date();
  renderKPIs();
  updateStylePreview();
  updateFormalityHint();
  updateSubChecks();

  document.getElementById('btnAddKpi').addEventListener('click', addKpi);
  document.getElementById('reportForm').addEventListener('submit', (e) => {
    e.preventDefault();
    generarWord();
  });
  document.getElementById('headerImage').addEventListener('change', onImageChange);
  document.getElementById('estiloVisual').addEventListener('change', updateStylePreview);
  document.getElementById('nivelFormalidad').addEventListener('change', updateFormalityHint);
  document.getElementById('incluirContenido').addEventListener('change', updateSubChecks);
});

function onImageChange(e) {
  const file = e.target.files[0];
  const hint = document.getElementById('imageHint');
  if (file) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    hint.textContent = `Seleccionado: ${file.name} (${sizeMB} MB)`;
    hint.style.color = '#0284c7';
  } else {
    hint.textContent = 'Ninguna imagen seleccionada.';
    hint.style.color = '#64748b';
  }
}

function updateStylePreview() {
  const estilo = document.getElementById('estiloVisual').value;
  const preview = document.getElementById('stylePreview');
  preview.className = 'style-preview ' + estilo;
  preview.textContent = ESTILOS[estilo].name;
}

function updateFormalityHint() {
  const f = document.getElementById('nivelFormalidad').value;
  const cfg = FORMALIDADES[f];
  const hints = {
    estandar: `Fuente ${cfg.font}, interlineado normal`,
    interno: `Fuente ${cfg.font}, formato compacto`,
    ejecutivo: `Fuente ${cfg.font}, espaciado amplio, citas en bloque`,
    solemne: `Fuente ${cfg.font}, doble espacio, numeración romana, blanco y negro`
  };
  document.getElementById('formalityHint').textContent = hints[f];
}

function updateSubChecks() {
  const checked = document.getElementById('incluirContenido').checked;
  const container = document.getElementById('subChecksContent');
  container.classList.toggle('disabled', !checked);
  const groups = ['resumenGroup', 'desarrolloGroup', 'kpisGroup', 'conclusionesGroup', 'estadoGroup'];
  groups.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.opacity = checked ? '1' : '0.4';
  });
}

// ─── KPIs DINÁMICOS ──────────────────────────────────────────
function renderKPIs() {
  const container = document.getElementById('kpiContainer');
  container.innerHTML = '';
  kpis.forEach((kpi, index) => {
    const row = document.createElement('div');
    row.className = 'kpi-row';

    const inputLabel = document.createElement('input');
    inputLabel.type = 'text';
    inputLabel.placeholder = 'Métrica / Indicador';
    inputLabel.value = kpi.label;
    inputLabel.required = true;
    inputLabel.addEventListener('input', (e) => { kpis[index].label = e.target.value; });

    const inputValue = document.createElement('input');
    inputValue.type = 'text';
    inputValue.placeholder = 'Valor / Estado';
    inputValue.value = kpi.value;
    inputValue.required = true;
    inputValue.addEventListener('input', (e) => { kpis[index].value = e.target.value; });

    row.appendChild(inputLabel);
    row.appendChild(inputValue);

    if (kpis.length > 1) {
      const btnRemove = document.createElement('button');
      btnRemove.type = 'button';
      btnRemove.className = 'btn-remove';
      btnRemove.textContent = '×';
      btnRemove.setAttribute('aria-label', 'Eliminar métrica');
      btnRemove.addEventListener('click', () => {
        kpis.splice(index, 1);
        renderKPIs();
      });
      row.appendChild(btnRemove);
    }
    container.appendChild(row);
  });
}

function addKpi() {
  kpis.push({ label: '', value: '' });
  renderKPIs();
  const rows = document.querySelectorAll('.kpi-row');
  if (rows.length > 0) {
    const lastRow = rows[rows.length - 1];
    const firstInput = lastRow.querySelector('input');
    if (firstInput) firstInput.focus();
  }
}

// ─── HELPERS ─────────────────────────────────────────────────
function readImageAsBuffer(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No se pudo leer la imagen seleccionada.'));
    reader.readAsArrayBuffer(file);
  });
}

function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo obtener las dimensiones de la imagen.'));
    };
    img.src = url;
  });
}

function calcProportionalSize(imgW, imgH, maxW, maxH) {
  const ratio = Math.min(maxW / imgW, maxH / imgH, 1);
  return { width: Math.round(imgW * ratio), height: Math.round(imgH * ratio) };
}

function formatDateES(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString + 'T00:00:00');
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

function showToast(message, type = 'error') {
  const box = document.getElementById('toastBox');
  box.innerHTML = `<div class="toast ${type}">${message}</div>`;
  box.classList.add('visible');
  setTimeout(() => {
    box.classList.remove('visible');
    box.innerHTML = '';
  }, 5000);
}

function createWatermarkImage(text) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const W = 1200, H = 1700;
    canvas.width = W;
    canvas.height = H;
    ctx.clearRect(0, 0, W, H);
    const fontSize = 130;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = 'rgba(160, 160, 160, 0.18)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(text, 0, 0);
    ctx.fillText(text, 0, -fontSize * 2.2);
    ctx.fillText(text, 0, fontSize * 2.2);
    ctx.restore();
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsArrayBuffer(blob);
    }, 'image/png');
  });
}

// ─── CONSTRUCCIÓN DEL DOCUMENTO ──────────────────────────────
async function generarWord() {
  const btn = document.getElementById('btnExport');
  const originalText = btn.textContent;
  sectionCounter = 0;

  const form = document.getElementById('reportForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!window.docx || !window.docx.Document) {
    showToast('Error: la librería docx.js no se cargó correctamente. Verificá tu conexión.', 'error');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Generando documento…';

  try {
    const {
      Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
      WidthType, AlignmentType, ImageRun, BorderStyle, Header, Footer, PageNumber
    } = window.docx;

    // ── 1. Lectura de campos ────────────────────────────────
    const estiloKey = document.getElementById('estiloVisual').value;
    const formalidadKey = document.getElementById('nivelFormalidad').value;
    const marcaAgua = document.getElementById('marcaAgua').value;
    const alineacionSel = document.getElementById('alineacionTexto').value;
    const numFirmas = parseInt(document.getElementById('numFirmas').value, 10);

    const incluirMetadatos = document.getElementById('incluirMetadatos').checked;
    const incluirContenido = document.getElementById('incluirContenido').checked;
    const incluirResumen = document.getElementById('incluirResumen').checked;
    const incluirDesarrollo = document.getElementById('incluirDesarrollo').checked;
    const incluirKPIs = document.getElementById('incluirKPIs').checked;
    const incluirConclusiones = document.getElementById('incluirConclusiones').checked;
    const incluirEstado = document.getElementById('incluirEstado').checked;

    const imageInput = document.getElementById('headerImage')?.files[0];
    const titulo = document.getElementById('tituloInforme').value;
    const subtitulo = document.getElementById('subtituloInforme').value;
    const autor = document.getElementById('autor').value;
    const departamento = document.getElementById('departamento').value;
    const destinatario = document.getElementById('destinatario').value;
    const fechaRaw = document.getElementById('fechaDoc').value;
    const fechaStr = formatDateES(fechaRaw);
    const resumen = document.getElementById('resumenEjecutivo').value;
    const desarrollo = document.getElementById('desarrolloText').value;
    const conclusiones = document.getElementById('conclusionesText').value;
    const estado = document.getElementById('estadoDoc').value;

    // ── 2. Configuraciones ──────────────────────────────────
    let CFG = { ...ESTILOS[estiloKey] };
    let FMT = { ...FORMALIDADES[formalidadKey] };

    // Solemne anula colores del estilo
    if (formalidadKey === 'solemne') {
      CFG = {
        ...CFG,
        headerBg: 'FFFFFF',
        headerTitleColor: '000000',
        headerSubtitleColor: '333333',
        headerBorderLeft: { style: 'SINGLE', size: 36, color: '000000' },
        secBg: 'FFFFFF',
        secTextColor: '000000',
        bodyTextColor: '000000',
        secBorders: {
          top: 'NONE', bottom: 'SINGLE', left: 'NONE', right: 'NONE',
          bottomColor: '000000', bottomSize: 12
        },
        kpiHeaderBg: '000000',
        kpiHeaderText: 'FFFFFF',
        metaBg: 'FFFFFF',
        metaBorder: '000000',
        quoteBg: 'FFFFFF',
        quoteBorder: '000000'
      };
    }

    function alignmentMap(val) {
      return val === 'JUSTIFY' ? AlignmentType.JUSTIFY : AlignmentType.LEFT;
    }

    // ── 3. Validación de imagen ─────────────────────────────
    let headerImageBuffer = null;
    let headerImageSize = { width: 120, height: 60 };
    if (imageInput) {
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];
      const MAX_SIZE_MB = 5;
      if (!ALLOWED_TYPES.includes(imageInput.type)) {
        throw new Error('Solo se permiten imágenes PNG o JPG.');
      }
      if (imageInput.size > MAX_SIZE_MB * 1024 * 1024) {
        throw new Error(`La imagen no debe superar los ${MAX_SIZE_MB} MB.`);
      }
      const dims = await getImageDimensions(imageInput);
      headerImageSize = calcProportionalSize(dims.width, dims.height, 150, 90);
      headerImageBuffer = await readImageAsBuffer(imageInput);
    }

    // ── 4. Marca de agua ────────────────────────────────────
    let headerConfig = undefined;
    if (marcaAgua !== 'NINGUNA') {
      const watermarkBuffer = await createWatermarkImage(marcaAgua.toUpperCase());
      headerConfig = new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: watermarkBuffer,
                transformation: { width: 520, height: 720 },
                floating: {
                  horizontalPosition: { relative: 'page', align: 'center' },
                  verticalPosition: { relative: 'page', align: 'center' },
                  wrap: { type: 'none' },
                  behindDocument: true
                }
              })
            ]
          })
        ]
      });
    }

    // ── 5. Helpers de construcción ──────────────────────────
    function makeBorder(style, size, color) {
      if (style === 'NONE' || !style) return { style: BorderStyle.NONE, size: 0, color: 'auto' };
      const bs = BorderStyle[style] || BorderStyle.SINGLE;
      return { style: bs, size: size || 12, color: color || '000000' };
    }

    function buildCellBorders(cfg) {
      const b = cfg.secBorders;
      return {
        top: makeBorder(b.top, b.topSize, b.topColor),
        bottom: makeBorder(b.bottom, b.bottomSize, b.bottomColor),
        left: makeBorder(b.left, b.leftSize, b.leftColor),
        right: makeBorder(b.right, b.rightSize, b.rightColor)
      };
    }

    function buildHeaderCellBorders(cfg) {
      const bl = cfg.headerBorderLeft;
      return {
        top: makeBorder('NONE', 0, 'auto'),
        bottom: makeBorder('NONE', 0, 'auto'),
        left: makeBorder(bl.style, bl.size, bl.color),
        right: makeBorder('NONE', 0, 'auto')
      };
    }

    function sectionTitle(text) {
      sectionCounter++;
      let display = text;
      if (FMT.romanNumbers) {
        display = `${ROMAN_NUMERALS[sectionCounter - 1] || sectionCounter}. ${text}`;
      }
      if (FMT.sectionUppercase) {
        display = display.toUpperCase();
      }
      return display;
    }

    function tr(opts) {
      return new TextRun({
        text: opts.text || '',
        bold: opts.bold || false,
        italics: opts.italics || false,
        color: opts.color || '000000',
        size: opts.size || 20,
        font: opts.font || FMT.font
      });
    }

    function cellShading(fill) {
      return fill && fill !== 'FFFFFF' ? { fill } : undefined;
    }

    // ── 6. Banner Header ────────────────────────────────────
    const bannerHeader = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: headerImageBuffer ? 70 : 100, type: WidthType.PERCENTAGE },
              shading: cellShading(CFG.headerBg),
              margins: { top: 180, bottom: 180, left: 200, right: 200 },
              borders: buildHeaderCellBorders(CFG),
              children: [
                new Paragraph({
                  spacing: { after: 60 },
                  children: [tr({ text: subtitulo.toUpperCase(), color: CFG.headerSubtitleColor, size: 16, bold: true })]
                }),
                new Paragraph({
                  children: [tr({ text: titulo, color: CFG.headerTitleColor, size: 28, bold: true })]
                })
              ]
            }),
            ...(headerImageBuffer ? [
              new TableCell({
                width: { size: 30, type: WidthType.PERCENTAGE },
                shading: cellShading(CFG.headerBg),
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                borders: {
                  top: makeBorder('NONE', 0, 'auto'),
                  bottom: makeBorder('NONE', 0, 'auto'),
                  left: makeBorder('NONE', 0, 'auto'),
                  right: makeBorder('NONE', 0, 'auto')
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new ImageRun({
                      data: headerImageBuffer,
                      transformation: { width: headerImageSize.width, height: headerImageSize.height }
                    })]
                  })
                ]
              })
            ] : [])
          ]
        })
      ]
    });

    // ── 7. Metadatos ────────────────────────────────────────
    const tablaMetadatos = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: cellShading(CFG.metaBg),
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              borders: {
                top: makeBorder('NONE', 0, 'auto'),
                bottom: makeBorder('NONE', 0, 'auto'),
                left: makeBorder('NONE', 0, 'auto'),
                right: makeBorder('NONE', 0, 'auto')
              },
              children: [
                new Paragraph({ children: [
                  tr({ text: 'Elaborado por: ', bold: true, size: 18, color: '334155' }),
                  tr({ text: autor, size: 18 })
                ]}),
                new Paragraph({ children: [
                  tr({ text: 'Área: ', bold: true, size: 18, color: '334155' }),
                  tr({ text: departamento, size: 18 })
                ]})
              ]
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: cellShading(CFG.metaBg),
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              borders: {
                top: makeBorder('NONE', 0, 'auto'),
                bottom: makeBorder('NONE', 0, 'auto'),
                left: makeBorder('NONE', 0, 'auto'),
                right: makeBorder('NONE', 0, 'auto')
              },
              children: [
                new Paragraph({ children: [
                  tr({ text: 'Dirigido a: ', bold: true, size: 18, color: '334155' }),
                  tr({ text: destinatario, size: 18 })
                ]}),
                new Paragraph({ children: [
                  tr({ text: 'Fecha: ', bold: true, size: 18, color: '334155' }),
                  tr({ text: fechaStr, size: 18 })
                ]})
              ]
            })
          ]
        })
      ]
    });

    // ── 8. Barra de sección ─────────────────────────────────
    function crearBarraSeccion(texto) {
      return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: cellShading(CFG.secBg),
                margins: { top: 100, bottom: 100, left: 140, right: 140 },
                borders: buildCellBorders(CFG),
                children: [
                  new Paragraph({
                    children: [tr({ text: sectionTitle(texto), bold: true, color: CFG.secTextColor, size: 22 })]
                  })
                ]
              })
            ]
          })
        ]
      });
    }

    // ── 9. Cita en bloque (ejecutivo) ───────────────────────
    function crearCitaBloque(texto) {
      return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: cellShading(CFG.quoteBg),
                margins: { top: 120, bottom: 120, left: 200, right: 200 },
                borders: {
                  top: makeBorder('NONE', 0, 'auto'),
                  bottom: makeBorder('NONE', 0, 'auto'),
                  left: makeBorder('SINGLE', 36, CFG.quoteBorder),
                  right: makeBorder('NONE', 0, 'auto')
                },
                children: [
                  new Paragraph({
                    alignment: alignmentMap(alineacionSel),
                    spacing: { line: FMT.lineSpacing },
                    children: [tr({ text: texto, size: 20, italics: true, color: CFG.bodyTextColor })]
                  })
                ]
              })
            ]
          })
        ]
      });
    }

    // ── 10. KPIs ────────────────────────────────────────────
    const kpiRows = [];
    kpiRows.push(
      new TableRow({
        children: [
          new TableCell({
            shading: cellShading(CFG.kpiHeaderBg),
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [tr({ text: 'VARIABLE / INDICADOR', bold: true, color: CFG.kpiHeaderText, size: 18 })]
            })]
          }),
          new TableCell({
            shading: cellShading(CFG.kpiHeaderBg),
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [tr({ text: 'VALOR / ESTADO', bold: true, color: CFG.kpiHeaderText, size: 18 })]
            })]
          })
        ]
      })
    );
    kpis.forEach(kpi => {
      kpiRows.push(
        new TableRow({
          children: [
            new TableCell({
              margins: { top: 80, bottom: 80, left: 100, right: 100 },
              borders: {
                top: makeBorder('NONE', 0, 'auto'),
                bottom: makeBorder('NONE', 0, 'auto'),
                left: makeBorder('NONE', 0, 'auto'),
                right: makeBorder('NONE', 0, 'auto')
              },
              children: [new Paragraph({ children: [tr({ text: kpi.label, size: 18 })] })]
            }),
            new TableCell({
              margins: { top: 80, bottom: 80, left: 100, right: 100 },
              borders: {
                top: makeBorder('NONE', 0, 'auto'),
                bottom: makeBorder('NONE', 0, 'auto'),
                left: makeBorder('NONE', 0, 'auto'),
                right: makeBorder('NONE', 0, 'auto')
              },
              children: [new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [tr({ text: kpi.value, bold: true, size: 18 })]
              })]
            })
          ]
        })
      );
    });

    const tablaKPIs = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: kpiRows
    });

    // ── 11. Estado ──────────────────────────────────────────
    const colorFondoEstado = CFG.estadoColors[estado] || 'E2E8F0';
    const tablaEstado = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 40, type: WidthType.PERCENTAGE },
              shading: cellShading(CFG.kpiHeaderBg),
              margins: { top: 100, bottom: 100, left: 100, right: 100 },
              borders: {
                top: makeBorder('NONE', 0, 'auto'),
                bottom: makeBorder('NONE', 0, 'auto'),
                left: makeBorder('NONE', 0, 'auto'),
                right: makeBorder('NONE', 0, 'auto')
              },
              children: [new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [tr({ text: 'ESTADO DEL DOCUMENTO', bold: true, color: CFG.kpiHeaderText, size: 18 })]
              })]
            }),
            new TableCell({
              width: { size: 60, type: WidthType.PERCENTAGE },
              shading: cellShading(colorFondoEstado),
              margins: { top: 100, bottom: 100, left: 100, right: 100 },
              borders: {
                top: makeBorder('NONE', 0, 'auto'),
                bottom: makeBorder('NONE', 0, 'auto'),
                left: makeBorder('NONE', 0, 'auto'),
                right: makeBorder('NONE', 0, 'auto')
              },
              children: [new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [tr({ text: estado, bold: true, size: 20, color: CFG.bodyTextColor })]
              })]
            })
          ]
        })
      ]
    });

    // ── 12. Firmas ──────────────────────────────────────────
    let bloqueFirmas = [];
    if (numFirmas > 0) {
      const celdasFirma = [];
      for (let i = 0; i < numFirmas; i++) {
        celdasFirma.push(
          new TableCell({
            borders: {
              top: makeBorder('SINGLE', 12, '000000'),
              bottom: makeBorder('NONE', 0, 'auto'),
              left: makeBorder('NONE', 0, 'auto'),
              right: makeBorder('NONE', 0, 'auto')
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [tr({ text: i === 0 ? autor : destinatario, bold: true, size: 18 })]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [tr({ text: i === 0 ? departamento : 'Revisado / Aprobado', size: 16, color: '64748B' })]
              })
            ]
          })
        );
      }
      bloqueFirmas = [
        new Paragraph({ spacing: { before: 600 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [new TableRow({ children: celdasFirma })]
        })
      ];
    }

    // ── 13. Párrafos del cuerpo ─────────────────────────────
    function bodyParagraph(text, extraSpacing = {}) {
      return new Paragraph({
        alignment: alignmentMap(alineacionSel),
        spacing: { line: FMT.lineSpacing, after: 180, ...extraSpacing },
        children: [tr({ text: text.trim(), size: 20, color: CFG.bodyTextColor })]
      });
    }

    const párrafosDesarrollo = desarrollo.split('\n\n')
      .filter(p => p.trim() !== '')
      .map(p => bodyParagraph(p.trim()));

    // ── 14. ENSAMBLADO ──────────────────────────────────────
    const docChildren = [];

    // Banner
    docChildren.push(bannerHeader);
    docChildren.push(new Paragraph({ spacing: { before: 180, after: 100 } }));

    // Metadatos
    if (incluirMetadatos) {
      docChildren.push(tablaMetadatos);
      docChildren.push(new Paragraph({ spacing: { before: 200, after: 150 } }));
    }

    // Contenido
    if (incluirContenido) {
      if (incluirResumen) {
        docChildren.push(crearBarraSeccion('Resumen Ejecutivo'));
        if (FMT.addQuotes && resumen.trim()) {
          docChildren.push(new Paragraph({ spacing: { before: 120 } }));
          docChildren.push(crearCitaBloque(resumen));
        } else {
          docChildren.push(bodyParagraph(resumen, {
            before: FMT.sectionSpacing.before,
            after: FMT.sectionSpacing.after
          }));
        }
      }

      if (incluirDesarrollo) {
        docChildren.push(crearBarraSeccion('Desarrollo y Análisis'));
        docChildren.push(new Paragraph({ spacing: { before: FMT.sectionSpacing.before } }));
        docChildren.push(...párrafosDesarrollo);
        docChildren.push(new Paragraph({ spacing: { before: 100, after: 100 } }));
      }

      if (incluirKPIs) {
        docChildren.push(crearBarraSeccion('Tabla de Métricas'));
        docChildren.push(new Paragraph({ spacing: { before: FMT.sectionSpacing.before } }));
        docChildren.push(tablaKPIs);
        docChildren.push(new Paragraph({ spacing: { before: 240, after: 100 } }));
      }

      if (incluirConclusiones) {
        docChildren.push(crearBarraSeccion('Conclusiones y Recomendaciones'));
        docChildren.push(bodyParagraph(conclusiones, {
          before: FMT.sectionSpacing.before,
          after: FMT.sectionSpacing.after
        }));
      }

      if (incluirEstado) {
        docChildren.push(tablaEstado);
      }
    }

    // Firmas
    if (bloqueFirmas.length > 0) {
      docChildren.push(...bloqueFirmas);
    }

    // ── 15. Documento final ─────────────────────────────────
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: FMT.compact ? 900 : 1150,
              right: 1150,
              bottom: FMT.compact ? 900 : 1150,
              left: 1150
            }
          }
        },
        headers: headerConfig ? { default: headerConfig } : undefined,
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  tr({ text: 'Página ', size: 18, color: '64748B' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '64748B', font: FMT.font }),
                  tr({ text: ' de ', size: 18, color: '64748B' }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '64748B', font: FMT.font })
                ]
              })
            ]
          })
        },
        children: docChildren
      }]
    });

    // ── 16. Descarga ────────────────────────────────────────
    const blob = await Packer.toBlob(doc);
    const safeTitle = titulo.trim().replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, '_');
    const nombreArchivo = `Informe_${safeTitle}_${estiloKey}_${formalidadKey}.docx`;
    window.saveAs(blob, nombreArchivo);

    showToast('Documento generado correctamente.', 'success');

  } catch (err) {
    console.error(err);
    showToast(err.message || 'Ocurrió un error al generar el documento.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}
