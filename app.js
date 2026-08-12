document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('fechaDoc').valueAsDate = new Date();
  renderKPIs();
  document.getElementById('btnAddKpi').addEventListener('click', addKpi);
  document.getElementById('reportForm').addEventListener('submit', (e) => {
    e.preventDefault();
    generarWord();
  });
  document.getElementById('headerImage').addEventListener('change', (e) => {
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
  });
});

/* ============================================================
   KPIs DINÁMICOS
   ============================================================ */
let kpis = [
  { label: 'Presupuesto Ejecutado', value: '84%' },
  { label: 'Nivel de Cumplimiento', value: 'Conforme a Cronograma' }
];

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

/* ============================================================
   HELPERS
   ============================================================ */
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
  return {
    width: Math.round(imgW * ratio),
    height: Math.round(imgH * ratio)
  };
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

/* ============================================================
   MARCA DE AGUA DIAGONAL (Canvas → PNG → ImageRun)
   ============================================================ */
function createWatermarkImage(text) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const W = 1200;
    const H = 1700;
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

/* ============================================================
   GENERACIÓN DEL DOCUMENTO
   ============================================================ */
async function generarWord() {
  const btn = document.getElementById('btnExport');
  const originalText = btn.textContent;

  const form = document.getElementById('reportForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!window.docx || !window.docx.Document) {
    showToast('Error: la librería docx.js no se cargó correctamente. Verificá tu conexión a internet.', 'error');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Generando documento…';

  try {
    const {
      Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
      WidthType, AlignmentType, ImageRun, BorderStyle, Header, Footer, PageNumber
    } = window.docx;

    // 1. Lectura de campos
    const estilo = document.getElementById('estiloVisual').value;
    const formalidad = document.getElementById('nivelFormalidad').value;
    const marcaAgua = document.getElementById('marcaAgua').value;
    const alineacionSel = document.getElementById('alineacionTexto').value;
    const numFirmas = parseInt(document.getElementById('numFirmas').value, 10);

    // Checkboxes de inclusión
    const incluirBanner = document.getElementById('incluirBanner').checked;
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

    // 2. Validación de imagen
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

    // 3. Mapeo de formalidad
    function alignmentMap(val) {
      if (val === 'JUSTIFY') return AlignmentType.JUSTIFY;
      return AlignmentType.LEFT;
    }

    let CONFIG_FORMALIDAD = {
      font: 'Calibri',
      alignment: alignmentMap(alineacionSel),
      lineSpacing: 276
    };

    if (formalidad === 'interno') {
      CONFIG_FORMALIDAD.font = 'Arial';
      CONFIG_FORMALIDAD.lineSpacing = 240;
    } else if (formalidad === 'ejecutivo') {
      CONFIG_FORMALIDAD.font = 'Georgia';
      CONFIG_FORMALIDAD.lineSpacing = 300;
    } else if (formalidad === 'solemne') {
      CONFIG_FORMALIDAD.font = 'Times New Roman';
      CONFIG_FORMALIDAD.lineSpacing = 360;
    }

    // 4. Configurar paleta visual
    let CONFIG_ESTILO = {
      headerBg: formalidad === 'solemne' ? 'FFFFFF' : 'F1F5F9',
      headerTitleColor: formalidad === 'solemne' ? '000000' : '0F172A',
      headerSubtitleColor: formalidad === 'solemne' ? '333333' : '0284C7',
      headerBorderLeft: { style: BorderStyle.SINGLE, size: 36, color: formalidad === 'solemne' ? '000000' : '0284C7' },
      secBg: formalidad === 'solemne' ? 'FFFFFF' : 'F1F5F9',
      secTextColor: formalidad === 'solemne' ? '000000' : '0F172A',
      bodyTextColor: formalidad === 'solemne' ? '000000' : '1E293B',
      secBorders: {
        top: { style: BorderStyle.NONE },
        bottom: formalidad === 'solemne' ? { style: BorderStyle.SINGLE, size: 12, color: '000000' } : { style: BorderStyle.NONE },
        left: formalidad === 'solemne' ? { style: BorderStyle.NONE } : { style: BorderStyle.SINGLE, size: 36, color: '0284C7' },
        right: { style: BorderStyle.NONE }
      }
    };

    if (estilo === 'tonoPastel' && formalidad !== 'solemne') {
      CONFIG_ESTILO = {
        headerBg: 'E0F2FE',
        headerTitleColor: '0F172A',
        headerSubtitleColor: '0369A1',
        headerBorderLeft: { style: BorderStyle.NONE },
        secBg: 'E0F2FE',
        secTextColor: '0369A1',
        bodyTextColor: '0F172A',
        secBorders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE }
        }
      };
    } else if (estilo === 'minimalista' && formalidad !== 'solemne') {
      CONFIG_ESTILO = {
        headerBg: 'FFFFFF',
        headerTitleColor: '0F172A',
        headerSubtitleColor: '0284C7',
        headerBorderLeft: { style: BorderStyle.NONE },
        secBg: 'FFFFFF',
        secTextColor: '0284C7',
        bodyTextColor: '1E293B',
        secBorders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.SINGLE, size: 18, color: '0284C7' },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE }
        }
      };
    }

    // 5. Marca de agua diagonal
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

    // 6. Helper para barras de sección
    function crearBarraSeccion(texto) {
      return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: CONFIG_ESTILO.secBg !== 'FFFFFF' ? { fill: CONFIG_ESTILO.secBg } : undefined,
                margins: { top: 100, bottom: 100, left: 140, right: 140 },
                borders: CONFIG_ESTILO.secBorders,
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: (estilo === 'minimalista' || formalidad === 'solemne') ? texto.toUpperCase() : texto,
                        bold: true,
                        color: CONFIG_ESTILO.secTextColor,
                        size: 22,
                        font: CONFIG_FORMALIDAD.font
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });
    }

    // 7. Banner Header
    const bannerHeader = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: headerImageBuffer ? 70 : 100, type: WidthType.PERCENTAGE },
              shading: CONFIG_ESTILO.headerBg !== 'FFFFFF' ? { fill: CONFIG_ESTILO.headerBg } : undefined,
              margins: { top: 180, bottom: 180, left: 200, right: 200 },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: CONFIG_ESTILO.headerBorderLeft,
                right: { style: BorderStyle.NONE }
              },
              children: [
                new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    new TextRun({
                      text: subtitulo.toUpperCase(),
                      color: CONFIG_ESTILO.headerSubtitleColor,
                      size: 16,
                      font: CONFIG_FORMALIDAD.font,
                      bold: true
                    })
                  ]
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: titulo,
                      bold: true,
                      color: CONFIG_ESTILO.headerTitleColor,
                      size: 28,
                      font: CONFIG_FORMALIDAD.font
                    })
                  ]
                })
              ]
            }),
            ...(headerImageBuffer ? [
              new TableCell({
                width: { size: 30, type: WidthType.PERCENTAGE },
                shading: CONFIG_ESTILO.headerBg !== 'FFFFFF' ? { fill: CONFIG_ESTILO.headerBg } : undefined,
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new ImageRun({ data: headerImageBuffer, transformation: { width: headerImageSize.width, height: headerImageSize.height } })]
                  })
                ]
              })
            ] : [])
          ]
        })
      ]
    });

    // 8. Metadatos
    const tablaMetadatos = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: { fill: 'F8FAFC' },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: 'Elaborado por: ', bold: true, size: 18, color: '334155', font: CONFIG_FORMALIDAD.font }), new TextRun({ text: autor, size: 18, font: CONFIG_FORMALIDAD.font })] }),
                new Paragraph({ children: [new TextRun({ text: 'Área: ', bold: true, size: 18, color: '334155', font: CONFIG_FORMALIDAD.font }), new TextRun({ text: departamento, size: 18, font: CONFIG_FORMALIDAD.font })] })
              ]
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: { fill: 'F8FAFC' },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: 'Dirigido a: ', bold: true, size: 18, color: '334155', font: CONFIG_FORMALIDAD.font }), new TextRun({ text: destinatario, size: 18, font: CONFIG_FORMALIDAD.font })] }),
                new Paragraph({ children: [new TextRun({ text: 'Fecha: ', bold: true, size: 18, color: '334155', font: CONFIG_FORMALIDAD.font }), new TextRun({ text: fechaStr, size: 18, font: CONFIG_FORMALIDAD.font })] })
              ]
            })
          ]
        })
      ]
    });

    // 9. KPIs dinámicos
    const kpiRows = [];
    kpiRows.push(
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: '0F172A' },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'VARIABLE / INDICADOR', bold: true, color: 'FFFFFF', size: 18, font: CONFIG_FORMALIDAD.font })] })]
          }),
          new TableCell({
            shading: { fill: '0F172A' },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'VALOR / ESTADO', bold: true, color: 'FFFFFF', size: 18, font: CONFIG_FORMALIDAD.font })] })]
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
              children: [new Paragraph({ children: [new TextRun({ text: kpi.label, size: 18, font: CONFIG_FORMALIDAD.font })] })]
            }),
            new TableCell({
              margins: { top: 80, bottom: 80, left: 100, right: 100 },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: kpi.value, bold: true, size: 18, font: CONFIG_FORMALIDAD.font })] })]
            })
          ]
        })
      );
    });

    const tablaKPIs = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: kpiRows
    });

    // 10. Estado
    let colorFondoEstado = 'E2E8F0';
    if (estado === 'APROBADO') colorFondoEstado = 'D1FAE5';
    if (estado === 'REQUIERE ACCIÓN') colorFondoEstado = 'FEE2E2';
    if (estado === 'CONFIDENCIAL') colorFondoEstado = 'FEF3C7';

    const tablaEstado = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 40, type: WidthType.PERCENTAGE },
              shading: { fill: '0F172A' },
              margins: { top: 100, bottom: 100, left: 100, right: 100 },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'ESTADO DEL DOCUMENTO', bold: true, color: 'FFFFFF', size: 18, font: CONFIG_FORMALIDAD.font })] })]
            }),
            new TableCell({
              width: { size: 60, type: WidthType.PERCENTAGE },
              shading: { fill: colorFondoEstado },
              margins: { top: 100, bottom: 100, left: 100, right: 100 },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: estado, bold: true, size: 20, color: '0F172A', font: CONFIG_FORMALIDAD.font })] })]
            })
          ]
        })
      ]
    });

    // 11. Bloque de Firmas
    let bloqueFirmas = [];
    if (numFirmas > 0) {
      const celdasFirma = [];
      celdasFirma.push(
        new TableCell({
          borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '000000' }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: autor, bold: true, size: 18, font: CONFIG_FORMALIDAD.font })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: departamento, size: 16, color: '64748B', font: CONFIG_FORMALIDAD.font })] })
          ]
        })
      );

      if (numFirmas === 2) {
        celdasFirma.push(
          new TableCell({
            borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '000000' }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: destinatario, bold: true, size: 18, font: CONFIG_FORMALIDAD.font })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Revisado / Aprobado', size: 16, color: '64748B', font: CONFIG_FORMALIDAD.font })] })
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

    // 12. Párrafos del cuerpo con color consistente
    const párrafosDesarrollo = desarrollo.split('\n\n').filter(p => p.trim() !== '').map(p =>
      new Paragraph({
        alignment: CONFIG_FORMALIDAD.alignment,
        spacing: { line: CONFIG_FORMALIDAD.lineSpacing, after: 180 },
        children: [new TextRun({ text: p.trim(), size: 20, font: CONFIG_FORMALIDAD.font, color: CONFIG_ESTILO.bodyTextColor })]
      })
    );

    // 13. ENSAMBLADO DINÁMICO del documento
    const docChildren = [];

    if (incluirBanner) {
      docChildren.push(bannerHeader);
      docChildren.push(new Paragraph({ spacing: { before: 180, after: 100 } }));
    }

    if (incluirMetadatos) {
      docChildren.push(tablaMetadatos);
      docChildren.push(new Paragraph({ spacing: { before: 200, after: 150 } }));
    }

    if (incluirContenido) {
      if (incluirResumen) {
        docChildren.push(crearBarraSeccion('Resumen Ejecutivo'));
        docChildren.push(new Paragraph({
          alignment: CONFIG_FORMALIDAD.alignment,
          spacing: { before: 120, after: 240, line: CONFIG_FORMALIDAD.lineSpacing },
          children: [new TextRun({ text: resumen, size: 20, font: CONFIG_FORMALIDAD.font, color: CONFIG_ESTILO.bodyTextColor })]
        }));
      }

      if (incluirDesarrollo) {
        docChildren.push(crearBarraSeccion('Desarrollo y Análisis'));
        docChildren.push(new Paragraph({ spacing: { before: 120 } }));
        docChildren.push(...párrafosDesarrollo);
        docChildren.push(new Paragraph({ spacing: { before: 100, after: 100 } }));
      }

      if (incluirKPIs) {
        docChildren.push(tablaKPIs);
        docChildren.push(new Paragraph({ spacing: { before: 240, after: 100 } }));
      }

      if (incluirConclusiones) {
        docChildren.push(crearBarraSeccion('Conclusiones y Recomendaciones'));
        docChildren.push(new Paragraph({
          alignment: CONFIG_FORMALIDAD.alignment,
          spacing: { before: 120, after: 240, line: CONFIG_FORMALIDAD.lineSpacing },
          children: [new TextRun({ text: conclusiones, size: 20, font: CONFIG_FORMALIDAD.font, color: CONFIG_ESTILO.bodyTextColor })]
        }));
      }

      if (incluirEstado) {
        docChildren.push(tablaEstado);
      }
    }

    // Firmas siempre al final si están configuradas (independiente de contenido)
    if (bloqueFirmas.length > 0) {
      docChildren.push(...bloqueFirmas);
    }

    const doc = new Document({
      sections: [{
        properties: { page: { margin: { top: 1150, right: 1150, bottom: 1150, left: 1150 } } },
        headers: headerConfig ? { default: headerConfig } : undefined,
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Página ', size: 18, color: '64748B', font: CONFIG_FORMALIDAD.font }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '64748B', font: CONFIG_FORMALIDAD.font }),
                  new TextRun({ text: ' de ', size: 18, color: '64748B', font: CONFIG_FORMALIDAD.font }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '64748B', font: CONFIG_FORMALIDAD.font })
                ]
              })
            ]
          })
        },
        children: docChildren
      }]
    });

    // 14. Descarga
    const blob = await Packer.toBlob(doc);
    const nombreArchivo = `Informe_${titulo.trim().replace(/\s+/g, '_')}.docx`;
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
