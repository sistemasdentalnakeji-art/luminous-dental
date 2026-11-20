# Encargo · Ficha de casino como portada del mapa (19-11-2026)

Pedido de la dueña: cambiar la tarjeta cerrada del mapa (sección «Visit us», en el inicio y en /contact) por una **ficha de casino**.

## Referencia que mandó (descrita, foto en el chat)
Ficha redonda de casino: canto exterior azul con 8 bloques blancos alternados (las «muescas» clásicas), anillo interior blanco fino, centro azul oscuro. Texto en arco arriba («HIGH ROLLER CASINO») y abajo («LAS VEGAS · NEVADA»), en el centro un mini letrero «Welcome to Fabulous Las Vegas» con estrella roja y un valor «$50».

## Cómo debe ser la de Luminous (dibujo propio, no copia)
- Colores del sitio: azul noche / azul marca (`#0a1529`, `#0d1c37`, `#2f63ad`, `#3a70b0`), **toques de oro** de la estrella (`#e0b65c`, `#f3d79a`) y **negro** profundo para darle aire premium (canto con bloques azul/negro/oro, filete dorado, relieve sutil).
- Texto en arco: arriba «LUMINOUS DENTAL», abajo «LAS VEGAS · NEVADA» (por aprobar). En el centro: el logo real de Luminous o su estrella dorada; **sin «$50» ni valores de dinero ni la palabra «casino»** (es una clínica).
- **Animación:** la ficha gira despacio sobre su eje (como moneda), con brillo que recorre el canto; al pasar el cursor o enfocar, gira un poco más rápido. Quieta con «reducir movimiento» y con la pausa del pie (`data-motion-paused`).
- **Se abre en el mapa:** al hacer clic/Enter, la ficha deja de girar, se pone de frente y **se transforma de círculo → óvalo → rectángulo redondeado** que crece hasta ser la ventana del mapa (libre albedrío del diseñador en el detalle; que se vea fluido y que el mapa quede bien visible). Botón de cerrar que la regresa a ficha. Botón real (`<button>`), con nombre accesible («Open map of our location»), foco visible.
- Tamaño acorde a la sección ya compactada: la ficha no más alta que la columna izquierda.

## Reglas
Sin git, sin publicar. Se conserva «© OpenStreetMap contributors» y «Get directions». Typecheck y build en verde; capturas a 1920, 1440 y 375 (ficha cerrada, a medio abrir y abierta); línea en `docs/bitacora.md`; textos nuevos en `docs/datos.md` como por aprobar. Cierra cualquier servidor auxiliar que abras.
