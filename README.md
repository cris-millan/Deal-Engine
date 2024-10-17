
# Dev

1. Clonar el .env.template y crear el .env
2. Ejecutar el comando ```docker compose up -d```
3. Ejecutar el comando ``` npm install ```
4. ejecutar el comando para pasar el archivo csv a la carpeta /dist ```tsc && cpx 'src/data/*.csv' dist/data ```
5. Ejecutar el comando ``` npm run dev ```

Existen cron-jobs el primero WeatherScheduler busca en el archivo data/dataset.csv las coordenadas unicas, despues de esto se dispacharan unos jobs que consultaran el clima de cada cordenada en la API weatherAPI y guardara en cache la respuesta de la api por un dia.

Hay otro cronjob send-email que se ejecuta al inicio del dia que es el encargado de leer el archivo csv
por cada cordenada busca en cache y obtiene la informacion para enviar el correo.
el envio de correo esta pendiente.



beatriz ramirez 
grabriel rivera
