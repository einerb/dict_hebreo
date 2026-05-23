# Diccionario Hebreo

Aplicación web de una sola página para buscar palabras en hebreo usando transliteración fonética. Muestra la escritura hebrea (con nikkud) y el significado en español.

## Características

- **Diccionario local** con ~100 palabras organizadas por categorías: saludos, familia, naturaleza, colores, números, términos bíblicos, verbos y más.
- **Múltiples transliteraciones** por palabra (ej. `shalom`, `shalon`, `salom` → שָׁלוֹם).
- **Búsqueda parcial**: encuentra resultados aunque la palabra esté incompleta.
- **Fallback a API**: si la palabra no está en el diccionario local, consulta [MyMemory](https://mymemory.translated.net/) para traducir desde inglés a hebreo y luego a español.
- **Sugerencias**: cuando no hay resultado, muestra palabras similares del diccionario.
- Sin dependencias de build — un solo archivo `.html`.

## Uso

Abre `dict_hebreo.html` directamente en el navegador. No requiere servidor.

```
Ejemplo de búsquedas:
  ahava  →  אַהֲבָה  →  Amor
  malka  →  מַלְכָּה  →  Reina
  emet   →  אֱמֶת   →  Verdad
```

## Tecnologías

- HTML / CSS / JavaScript vanilla
- Google Fonts (Fredoka One, Nunito)
- MyMemory Translation API (fallback)
