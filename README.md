#Descripción:
Este es el frontend de una aplicación web que consume una API de instrumentos musicales. Permite a los usuarios:
- Ver todos los instrumentos disponibles
- Filtrar por tipo (ej: cuerda, viento)
- Buscar por nombre o por país de origen
- Ver detalles de cada instrumento
- Experiencia responsive y con navegación fluida

Tecnologías utilizadas :
- HTML5
- CSS 
- JavaScript 
- Comunicación con API vía fetch

Funcionalidades :
- Ver todos los instrumentos
- Filtrar por tipo (select)
- Filtrar por origen (input)
- Buscar por nombre
- Ver detalle de cada instrumento al hacer clic
- Scroll automático a resultados luego de una búsqueda
 
Comunicación con la API
Este frontend se conecta a: http://localhost:3000/instrumentos
Usa endpoints como:
- /instrumentos/ → todos
- /instrumentos/filtros?tipo=x&origen=y
- /instrumentos/nombre/:nombre
- /instrumentos/:id

Estilos y experiencia :
- Diseño adaptable (responsive)
- Scroll automático al contenedor de resultados tras aplicar filtros
- Indicadores visuales para estados vacíos o sin resultados
  
