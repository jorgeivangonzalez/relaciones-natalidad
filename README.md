# Sondeo: Relaciones y Natalidad · CDMX 2025

Cuestionario de investigación sobre dinámicas de emparejamiento y natalidad en México.

---

## Archivos del proyecto

```
encuesta/
├── index.html       ← El cuestionario completo (este es el que se publica)
├── apps-script.gs   ← Script para Google Sheets (recibe y guarda respuestas)
└── README.md        ← Este archivo
```

---

## Despliegue en 4 pasos (15 minutos total)

### Paso 1 — Crear el Google Sheet y conectar el script

1. Ve a [sheets.google.com](https://sheets.google.com) y crea una hoja en blanco. Nómbrala como quieras.
2. En el menú superior: **Extensiones → Apps Script**
3. Borra el código que aparece por defecto y pega **todo el contenido** de `apps-script.gs`
4. Haz clic en 💾 **Guardar** (nombre del proyecto: `Encuesta Receptor` o el que prefieras)
5. Haz clic en **Implementar → Nueva implementación**
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
6. Haz clic en **Implementar** → autoriza los permisos cuando te lo pida
7. **Copia la URL** que aparece (termina en `/exec`). La necesitarás en el Paso 2.

> ⚠️ Guarda bien esa URL. Si la pierdes puedes obtenerla de nuevo en Implementar → Administrar implementaciones.

---

### Paso 2 — Conectar el cuestionario con tu Sheet

1. Abre `index.html` con cualquier editor de texto (Bloc de notas, VS Code, etc.)
2. Busca esta línea cerca del final del archivo:
   ```
   const GOOGLE_SCRIPT_URL = "REEMPLAZA_CON_TU_URL_DE_APPS_SCRIPT";
   ```
3. Reemplaza el texto entre comillas con la URL que copiaste en el Paso 1:
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/TU_ID_AQUI/exec";
   ```
4. Guarda el archivo.

---

### Paso 3 — Subir a GitHub y activar GitHub Pages

1. Crea una cuenta en [github.com](https://github.com) si no tienes una.
2. Crea un repositorio nuevo:
   - Nombre: `encuesta-relaciones-natalidad` (o el que prefieras)
   - Visibilidad: **Public** (necesario para GitHub Pages gratuito)
3. Sube `index.html` al repositorio (puedes arrastrarlo directamente en la interfaz web de GitHub)
4. Ve a **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / carpeta: **/ (root)**
   - Haz clic en **Save**
5. Espera 1-2 minutos. GitHub te dará una URL pública del tipo:
   ```
   https://tu-usuario.github.io/encuesta-relaciones-natalidad/
   ```

¡Esa es la URL que compartes con los participantes!

---

### Paso 4 — Verificar que funciona

1. Abre la URL de GitHub Pages en tu navegador
2. Contesta el cuestionario de prueba (puedes usar datos ficticios)
3. Ve a tu Google Sheet — deberías ver una nueva fila con tus respuestas
4. Si ves la fila: **todo está funcionando correctamente** ✓

---

## Ver y exportar los datos

### Ver respuestas en tiempo real
Abre tu Google Sheet — cada respuesta nueva aparece automáticamente como una fila.

### Exportar para análisis en Python / pandas
En Google Sheets: **Archivo → Descargar → Valores separados por comas (.csv)**

```python
import pandas as pd

df = pd.read_csv("respuestas.csv")
print(df.head())
print(df.describe())
```

---

## Descripción de columnas

| Columna | Descripción |
|---|---|
| `timestamp` | Fecha y hora exacta del envío (ISO 8601) |
| `p1_edad` | Rango de edad |
| `p2_genero` | Género declarado |
| `p2_bloque` | Bloque respondido (hombre/mujer) — relevante para género "otro" |
| `p3_residencia` | Zona de residencia (cdmx / edomex / otro_estado) |
| `p3_detalle` | Municipio del EDOMEX o estado específico |
| `p5_medios` | Medios de búsqueda (valores separados por `\|`) |
| `p8_genes` | Puntos asignados a atributos genéticos (0–10) |
| `p8_estatus` | Puntos asignados a atributos de estatus (0–10) |
| `p8_riqueza` | Puntos asignados a atributos de riqueza (0–10) |
| `p6`, `p10`, `p15h`, `p16m`, `p22`, `p25` | Escalas Likert: 5=Totalmente de acuerdo, 1=Totalmente en desacuerdo |
| `p13h_*` a `p17h_*` | Solo se llenan para participantes del Bloque H |
| `p13m_*` a `p18m_*` | Solo se llenan para participantes del Bloque M |
| `p15m_ghost` | Respuesta abierta (texto libre) |
| `p20_desea` | Solo se llena si `p19_hijos = 0` |
| `p21_edad_ide` | Se llena si desea hijos O si ya tiene hijos |

---

## Solución de problemas comunes

**El Sheet no recibe respuestas**
- Verifica que la URL en `index.html` sea exacta (sin espacios extra)
- Asegúrate de que el Apps Script esté implementado con acceso "Cualquier usuario"
- Revisa que el Apps Script no haya expirado (reimplementa si es necesario)

**Error al implementar el Apps Script**
- Si Google pide autorización, acepta todos los permisos
- Si dice "no verificado", haz clic en "Configuración avanzada → Ir a [nombre] (no seguro)"

**GitHub Pages muestra 404**
- Espera 5 minutos más y recarga
- Verifica que el archivo se llame exactamente `index.html` (minúsculas)
- Verifica que el repositorio sea público

---

## Contacto del investigador

*Agrega aquí tu nombre e información de contacto si lo consideras pertinente.*
