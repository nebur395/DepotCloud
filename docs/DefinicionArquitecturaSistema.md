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
* El servidor web, componiéndose del entorno de ejecución Node.js/Apache Tomcat en el cual se despliega Spring/Express, una aplicación framework que actúa como middleware, conteniendo a su vez la lógica de la aplicación. La conexión del equipo se realiza en la capa de transporte con la máquina que aloja el servidor vía TCP/IP y en la capa de aplicación entre el navegador y el servidor vía HTTP.
* El servidor de base de datos, el cual se conecta con la aplicación del servidor mediante un DB Driver, en este caso Mongoose/JDBC.

**Exposición de razones**  


### Componentes de software y sus relaciones
**Catálogo de la visata**  
* El componente DepotCloudApp se corresponde al cliente web para móvil de la aplicación. Todas las conexiones que se realizan con los Services se hacen vía API REST salvo con el componente NotificationsService que se comunica mediante WebSockets para actualizarlo en tiempo real.

Cada uno de los componentes Services se corresponden a la API pública de interfaces REST conteniendo los conjuntos de funcionalidades correspondientes a cada uno de ellos. Todos los componentes Services que se comunican con los Repository lo hacen mediante Mongoose/jdbc.

Por otro lado se encuentran los Repository correspondientes para acceder a la base de datos MongoDB/MySQL.

**Exposición de razones**

### Requisitos no funcionales
Describe qué requisitos no funcionales son importantes para el proyecto y cómo la arquitectura descrita les da soporte. 
Su importancia de cara al proyecto puede graduarse de forma parecida al alcance del documento de términos de referencia 
(debe, debería, podrá, queda fuera por ahora).

| Requisito no funcional | Prioridad | Cómo es apoyado por la arquitectura |
| ---------------------- | --------- | ----------- |
| Usabilidad | Alta | El sistema debe someterse a la técnica KLM, y algunas métricas probadas con posibles usuarios finales. Los tiempos analizados resultantes con KLM de las actividades principales deberían ser inferiores a 2 minutos. Podría tener una forma rápida para traducir la aplicación. Quedan fuera por ahora aspectos de accesibilidad.
| Rendimiento | Media | Cualquier tiempo de respuesta de la aplicación no debería superar el minuto.
| Capacidad | Media | ¿Qué numero de usuarios simultáneos va a tener el sistema? ¿Qué volumen de datos van a ser transmitidos? Se va a trabajar con imágenes Full HD como máximo, siendo estos los datos más pesados en la transmisión. Al menos 3 personas deben poder acceder concurrentemente a la aplicación. Podría hacerse uso de herramientas como Apache Jmeter para analizar la carga del sistema.
| Escalabilidad | Media | ¿Cómo se va a acomodar la arquitectura a futuros aumentos de escala?
| Seguridad | Media | ¿Qué requisitos de seguridad va a tener la solución? 
| Disponibilidad | Media | ¿Cuándo se va a utilizar la aplicación? ¿Qué momentos pueden ser críticos?
| Resilencia | Baja | ¿Cómo se puede asegurar la disponibilidad? ¿Cómo se tratan los fallos para que no produzcan pérdida de datos?
| Recuperación | Baja | ¿Cómo se recupera el sistema tras un desastre?
### Mantenibilidad
Sobre la base de una expectativa de vida del sistema hay que identificar qué aspectos se han tenido en cuenta en la arquitectura
para asegurar que la solución cumpla dicha expectativa.
## Entornos técnicos
### Plataforma de desarrollo
Hay que identificar todas las herramientas de software que se van a utilizar durante el desarrollo. Esta lista es extensa ya que hay
que incluir compiladores, entornos de desarrollo, sistemas de gestión de configuraciones, herramientas de pruebas, etc.
### Plataforma de destino
Hay que identificar todo el hardware necesario así como todas las herramientas necesarias para su administración y mantenimiento.
