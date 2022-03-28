########################################################################################################

HERRAMIENTAS O SOFTWARE UTILIZADOS

MONGODB: base de datos NoSQL
Intalacion en windows de manera local:

-Descargar la version commnity server mediante este link: https://www.mongodb.com/try/download/community

-Seguir la instruciones de instalacion del ejecutable de mongodb 

-Elegir modo de instalacion en 'COMPLETA'

-Desmarcar casilla de instalar como servicio 

-Mantener marcado la casilla de mongodb compass para instalar la intefaz grafica de mongodb

-Levantar el servidor:
  -Crear una carpeta "data" en la raiz del disco 'C:'
  -Dentro de la carpeta "data" crear una carpeta "db"
  -Abrir variables del entorno del sistema 
  -Agregar direccion de alojamiento de la carpeta "bin" de mongodb en la variable PATH (variable de entorno del sistema)
  -Ejecutar en la consola de comandos la instruccion "mongod" para ejecutar por primera vez el servidor de mongo  y crear los archivos de mongo dentro de la carpeta "db"

-video de instalacion: https://www.youtube.com/watch?v=kPKwJWr_9TM

-Para utilizar Mongo Atlas (No local) ver el siguiente video: https://www.youtube.com/watch?v=Imwk0HtEuGY&t=32s

REDIS SERVER: Redis es un motor de base de datos en memoria cache

Descargue la version de windows mediante el siguiente link: https://github.com/microsoftarchive/redis/releases/download/win-3.2.100/Redis-x64-3.2.100.msi

Instalacion en windows:

-Seguir las instruciones del ejecutable, dejar todo por defecto.

-Iniciar servidor de redis
 -Abrir variables del entorno del sistema 
 -Agregar direccion de alojamiento de la carpeta "redis" de redis en la variable PATH (variable de entorno del sistema)
 -Abrir consola de comando y ejecutar el comando: 
  redis-cli

video de instalacion: https://www.youtube.com/watch?v=gmcfZYA47_8

REDIS DESKTOP MANAGER

Descargar la interfaz de redis del lado del cliente mediante este link:https://es.freedownloadmanager.org/Windows-PC/Redis-Desktop-Manager-GRATIS.html

-Seguir todos los pasos de instalacion por defecto del ejecutable
-Abrir Redis desktop manager 
-selecionar el boton que dice connect to redis server
-poner un nombre a la bd,el host por defecto de redis server y el puerto por defecto de redis server

Visual studio code:

Descargue la version de windows mediante el siguiente link: https://code.visualstudio.com/download

-Seguir las instruciones del ejecutable, dejar todo por defecto.

Verificar si toodas la herramientas se instalaron correctamente usar el comando en consola:

--version

ej: node --version || mongo --version || redis --version

########################################################################################################

FRAMEWORK UTILIZADOS:
-NODEJS

########################################################################################################

Inicio de nuevo proyecto nodejs:

-Abrir una consola de comando donde la ruta este ubicada en este proyecto ej:'C:\Users\samud\Desktop\Repositorio_Git_Lab\sprint_proyect\sprint_proyect_II>'

En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
npm init -y

Librerias/modulos utilizados:

Express:
-Instalacion de express:
 -En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
  npm i express

Nodemon:
-Instalacion de nodemon:
 -En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
  npm i nodemon -D 

(-D para ponerlo en la seccion de dependencia de desarrollo)

Swagger:

-Instalacion de swagger:
 -En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
  npm i swagger-jsdoc swagger-ui-express 

Helmet:

-Instalacion de helmet:
 -En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
 npm i helmet

Dotenv:

-Instalacion de dotenv:
 -En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
 npm i dotenv

Jsonwebtoken:

-Instalacion de jsonwebtoken:
 -En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
 npm i jsonwebtoken

Mocha:

-Instalacion de mocha:
 -En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
 npm i mocha

Mongoose:

-Instalacion de mongoose:
 -En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
 npm i mongoose

Redis:

-Instalacion de redis:
 -En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
 npm i redis@3.0.0

NOTA IMPORTANTE: tengo problemas de versionamiento por eso utilizo la version 3.0.0 de redis

Supertest:

-Instalacion de supertest:
 -En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
 npm i supertest

chai:

-Instalacion de chai:
 -En la consola de comando con la ruta abierta en este proyecto para ejecutar instrucciones:
 npm i chai

########################################################################################################

configuracion en el archivo package.json:

En el main cambiar:
 -De index.js a server.js

En la seccion de scripts:
 -Debe poner dos instrucciones:
  "test": "mocha --exit"
  "dev": "nodemon src/server.js"

########################################################################################################

Arranque api-rest: 

Para que esta api pueda arrancar se necesita asignarle algunas variables de entorno por eso usamos el modulo dotenv para facilitarnos el uso de variables de entorno:

-Crear un arhivo ".env" en la carpeta raiz del proyecto y agregar las variables de entorno
 
 MONGO_URI=Aca va a ir la url para la conexion a la bd de mongodb

 TOKEN_FIRMA=Aca va a ir la firma o palabra secreta para la firma del token de seguridad

 KEY_CRYTO=Aca va ir la clave secreta para la encriptacion de contraseñas

 HOST_REDIS=Aca va a ir el host de redis

 PORT_REDIS=El puerto de redis

 URL_SWAGGER=la url del host y puerto para swagger

 PORT=puerto donde va a arracar el servido

Ejecutar nodemon: 
 -Desde la caperta raiz "sprint_proyect_II" ejecutar alguno de estos dos comando:
  npx nodemon src/server.js
  npm run dev

Sin ejecutar nodemon:
 -Desde la caperta raiz "sprint_proyect_II" ejecutar comando:
  node src/server.js

########################################################################################################

Ejecutar entorno de prueba:
 -Antes de iniciar prueba de test, apagar el servidor
 -Desde la caperta raiz "sprint_proyect_II" ejecutar comando:
  npm run test

########################################################################################################

Desde postman o swagger enviarle datos.
