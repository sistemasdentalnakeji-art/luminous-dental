
## Contador de dígitos que ruedan · «Counter» de React Bits (27-11-2026, r11, Contact)
- Pieza: Counter (David Haz), https://reactbits.dev/components/counter · código https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Components/Counter
- Licencia: MIT + Commons Clause (se permite usar en un sitio web; no se permite vender ni redistribuir el componente solo).
- Dónde: `apps/web/src/components/RollCounter.tsx` (+ reglas `.counter__*` al final del bloque del letrero en `styles/contact-lines.css`). Sin librería nueva.
- Cambios: sin `'use client'`; `data-motion-paused` cuenta como movimiento reducido; prop nueva `spin` (vuelta completa periódica). Usada para el letrero «24/7» del héroe de Contact.

## Fotos del héroe de servicios · r13 (27-11-2026)
Archivos en `apps/web/public/images/servicios/` (raíz 2000x1125, `640/` y `1280/`, WebP, recorte 16:9). Mapa en `content/servicePhotos.ts`. Revisadas una a una antes de usarlas: imagen real, sin texto agregado ni marca de agua, sin rostros (solo muestras y modelos); pesan 28 KB, 107 KB y 89 KB a 2000 px.
| Servicio | Archivo | Fuente (enlace) | Autor | Licencia |
|---|---|---|---|---|
| teeth-whitening | blanqueamiento | https://www.pexels.com/photo/samples-of-teeth-6627598/ | Karola G | Pexels License (uso comercial, sin atribución obligatoria) |
| porcelain-veneers-and-crowns | carillas-coronas | https://www.pexels.com/photo/veneers-with-a-bright-background-6812496/ | Pavel Danilyuk | Pexels License |
| dental-implants | implantes-dentales | https://unsplash.com/photos/dental-implant-model-with-teeth-W9YEY6G8LVM | Jonathan Borba | Unsplash License (marcada «Free», no Unsplash+) |
| all-on-4-implants | all-on-4 | Dental Nakeji (`public/images/servicios/all-on-4.webp`) | Dental Nakeji | Uso autorizado por la dueña (decisión vigente: fotos de Nakeji en páginas de servicio) |
| all-on-6-implants | all-on-6 | Dental Nakeji (`public/images/servicios/all-on-6.webp`) | Dental Nakeji | Uso autorizado por la dueña |

Pexels License: https://www.pexels.com/license/ · Unsplash License: https://unsplash.com/license
Las fotos de Nakeji de All-on se miraron: sin texto ni marca visible (modelo de prótesis sobre implantes en un laboratorio).
Alternativas guardadas (no usadas): blanqueamiento https://unsplash.com/photos/a-close-up-of-a-womans-mouth-with-white-teeth-RCQnbyQsnUg (Kamal Hoseinianzade, sonrisa en primer plano, sin cara completa) · carillas https://www.pexels.com/photo/different-shades-of-veneers-6812494/ (Pavel Danilyuk) · implantes https://unsplash.com/photos/gloved-hand-holding-a-dental-implant-and-crown-eHwRLpfHSKY (Katarzyna Zygnerska, es vertical).
Las fotos anteriores de esos tres servicios (Nakeji: dentista y asistente; Unsplash de Tony Litvyak; paciente en sillón de Nakeji) ya no se usan.
