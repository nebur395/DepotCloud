# Definición de la arquitectura del sistema
## Propósito del documento
* Proporcionar un entendimiento común de las arquitecturas técnicas que van a ser usadas durante el desarrollo y despliegue de la solución incluyendo:
  * Hardware/Infraestructure
  * Arquitectura de Software
* Describir en entorno de despliegue de la solución y (si es diferente) el entorno de desarrollo.
* Proporcionar una descripción general de la evolución prevista de áreas de:
  * Hardware (infraestructura, almacenamiento, etc.)
  * Software (componentes, interacciones principales, etc.)
  * Seguridad (polticas de acceso, control de acceso, etc.)
## Arquitectura del sistema
### Vista general
**Diagrama de despliegue**
![CyC](images/Deployment.png)

**Diagrama de Componentes y Conectores**
![CyC](images/CyC.png)

### Componentes de hardware y sus relaciones
**Catálogo de la vista**  
Siguiendo un orden de flujo de interacción se encuentran los siguientes componentes:
* El cliente, componiéndose de un dispositivo móvil que puede ser iOS y Android. Incluye el navegador web Cordova para conseguir un funcionamiento híbrido, el cual además es el encargado de generar las peticiones HTTP e interpretar la aplicación cliente y las respuestas del servidor.
* El servidor web, componiéndose del entorno de ejecución Node.js en el cual se despliega Express, una aplicación framework que actúa como middleware, conteniendo a su vez la lógica de la aplicación. La conexión se realiza en la capa de aplicación entre el navegador y el servidor vía HTTP.
* El servidor de base de datos, el cual se conecta con la aplicación del servidor mediante un DB Driver, en este caso Mongoose.

**Exposición de razones**  
Se ha tomado la decisión de escoger la tecnología Cordova para el navegador web del dispositivo móvil en la parte del cliente. Las razones para ello son porque de esa forma, se permite tener una arquitectura web cliente-servidor, en la cual además, el cliente puede utilizar utilidades nativas (como la cámara) de los dispositivos siendo así una aplicación híbrida que funciona tanto en iOS como en Andriod, e incluso en desktop.

Además, se ha decidido utilizar el stack MEAN para garantizar que todos los componentes se puedan integrar correctamente pudiendo ofrecer algunos aspectos para ayudar a la escalabilidad del sistema dando un mejor soporte a la arquitectura software detallada en la siguiente sección. De esta forma tenemos un servidor con un entorno de ejecución de Node.js con la lógica del servidor de de la aplicación, la cual se puede replicar fácilmente (puesto que está contenida en un nodo específico) de forma horizontal en distintos servidores cuando se lleguen a ciertos umbrales en la capacidad del sistema. A su vez, nos encontramos con un nodo aparte conteniendo una base de datos no relacional (MongoDB), la cual nos puede ayudar también a la hora de gesetionar la escalabilidad del sistema gracias a su sistema automático de *sharding*.

### Componentes de software y sus relaciones
**Catálogo de la visata**  
* El componente DepotCloudApp se corresponde al cliente web para móvil de la aplicación. Todas las conexiones que se realizan con los Services se hacen vía API REST salvo con el componente NotificationsService que se comunica mediante WebSockets para actualizarlo en tiempo real.

Cada uno de los componentes Services se corresponden a la API pública de interfaces REST conteniendo los conjuntos de funcionalidades correspondientes a cada uno de ellos. Todos los componentes Services que se comunican con los Repository lo hacen mediante Mongoose.

Por otro lado se encuentran los Repository correspondientes para acceder a la base de datos MongoDB.

**Exposición de razones**  
La arquitectura presentada de los componentes software se ha decidido que siga los principios de los servicios web RESTful. Esta decisión de diseño se ha tomado en base al objetivo de querer conseguir un sistema que pueda escalar gracias a las características de estos servicios, y porque se adaptaba bien a una arquitectura orientada a los recursos web, en vez de a las funcionalidades (para las cuales se podría hacer uso de otros servicios web como SOAP y WISDL).

Es por eso que nos encontramos el servidor dividido en componentes que se identifican como recursos web que pueden ser accedidos e identificados vía URIs. Además, puesto que nos encontramos con una base de datos no relacional, se han decidido crear unos esquemas de objetos con el framework Mongoose, para mantener un mínimo de organización esquemática en la base de datos, los cuales son usados por los recursos RESTful del servidor para acceder a la base de datos.

### Requisitos no funcionales
Describe qué requisitos no funcionales son importantes para el proyecto y cómo la arquitectura descrita les da soporte. 
Su importancia de cara al proyecto puede graduarse de forma parecida al alcance del documento de términos de referencia 
(debe, debería, podrá, queda fuera por ahora).

| Requisito no funcional | Prioridad | Cómo es apoyado por la arquitectura |
| ---------------------- | --------- | ----------- |
| Usabilidad | Alta | El sistema debe someterse a la técnica KLM, y algunas métricas probadas con posibles usuarios finales. Los tiempos analizados resultantes con KLM de las actividades principales deberían ser inferiores a 2 minutos. Podría tener una forma rápida para traducir la aplicación. Quedan fuera por ahora aspectos de accesibilidad.
| Rendimiento | Media | Cualquier tiempo de respuesta de la aplición no debería tener tiempos de respuesta altos. Esto se quiere conseguir gracias a la implementación de una arquitectura RESTful.
| Capacidad | Media | Se va a trabajar con imágenes Full HD como máximo, siendo estos los datos más pesados en la transmisión. Al menos 3 personas deben poder acceder concurrentemente a la aplicación.
| Escalabilidad | Alta | El sistema debe plantear una arquitectura que sea mínimamente escabale, así como dejar descrita una documentación de qué debería de hacerse en el futuro para conseguirlo. Podría hacerse uso de herramientas como Apache Jmeter para analizar la carga del sistema.
| Seguridad | Media | La aplicación va hacer uso de tráfico cifrado mediante https. Debe cifrar al menos las contraseñas en la base de datos. Se deben documentar aspectos pensados con la protección contra sistemas de SPAM y de BOTs, aunque la implementación queda fuera del alcance.
| Disponibilidad | Media | Se va a seguir una metología de integración continua para intentar garantizar que todos los despliegues del sistema se hagan de forma automática y reducir el tiempo que pueda pasar al sistema desconectado debido a fallos o falta de despliegue automático.
| Resilencia | Baja | Se van a dejar documentados aspectos referentes pero no se van a llevar a cabo en la implementación del sistema.
| Recuperación | Baja | Se van a dejar documentados aspectos referentes pero no se van a llevar a cabo en la implementación del sistema.
### Mantenibilidad
Se busca un sistema que al menos tenga una vida útil de más de 2 años.  

Con eso en mente, se ha de pensar en un sistema claramente modularizado y organizado, con una buena documentación y un código legible. Para ello, el sistema podría contar con una serie de estándares y definiciones de hecho, así como el uso de algunas herramientas de *Quality Assurance* como SonarQube.
 
Por otro lado, para conseguir una buena documentación de la API de forma mantenible, el sistema podría hacer uso de la herramienta *swagger*.

## Entornos técnicos
### Plataforma de desarrollo
Las herramientas de software que se van a utilizar durante el desarrollo de la aplicación se encuentran en la siguiente lista:
* El entorno de ejecución [Node.js](https://nodejs.org/en/)
* La base de datos [MongoDB](https://www.mongodb.com/)
* El framework [Ionic](https://ionicframework.com/docs/api/) junto con el navegador web Cordova.
* Un ID con capacidad para debuggear entornos javascript, en este caso [IntelliJ IDEA](https://www.jetbrains.com/idea/) o [WebStorm](https://www.jetbrains.com/webstorm/).
* La herramienta para la documentación automática de la API: [Swagger](http://swagger.io/).
* La herramienta [SonarQube](https://www.sonarqube.org/)  para *Quality Assurance*.
* La aplicación web [GitHub](https://github.com/) junto con [Git](https://git-scm.com/downloads) para el control de versiones y la gestión de configuraciones.
* La herramienta de pruebas [Protractor](http://www.protractortest.org/#/) para los test de sistema y aceptación.
* La herramienta de pruebas [Mocha](https://mochajs.org/) para los test unitarios.
* [TravisCI](https://travis-ci.com/) junto con [Codecov](https://codecov.io/gh) para facilitar un entorno de integración continua con GitHub.

### Plataforma de destino
El hardware necesarioasí como todas las herramientas necesarias para su administración y mantenimiento es el siguiente:
* Dispsitivo móvil Android 6.0 + con las opciones de desarrollador activadas para debuggear en un entorno de cliente real.
* Mínimo un ordenador con capacidad para lanzar un entorno de desarrollo como IntelliJ IDEA o WebStorm para poder desarrollar. Además, ha de contar con un navegador web para el desarrollo de las funcionalidades que no requieran de aspectos nativos en dispositivos móviles.
* Mínimo un ordenador con capacidad de atender al menos a 3 clientes simultáneamente para tener corriendo el servidor con la base de datos simulando un entorno de despliegue real.

*Nota:* El ordenador a utilizar puede ser el mismo en los dos últimos casos mientras tenga la capacidad para cumplir ambas.
