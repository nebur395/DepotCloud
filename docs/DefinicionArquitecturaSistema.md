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
Diagrama de despliegue que identifique claramente todos los componentes de hardware de la arquitectura y que muestre cómo la aplicación se despliega sobre dicho hardware.
Debe verificarse que es completa en términos de hardware (se identifican todas las plataformas de hardware y las relaciones entre ellas) y
de software (se identifican todos los interfaces, componentes, middleware y bases de datos) que se desarrollan en el proyecto 
(**no incluir** componentes reusables que el proyecto puedeo producir o reutilizar).
### Componentes de hardware y sus relaciones
Tomando como referencia la vista general:
* Describir cada uno de los componentes de hardware del sistema
* Los interfaces físicos entre ellos en los escenarios de implementación previstos (por ejemplo, _el smartphone y el servidor se conectan a través de una línea de datos móviles_)

Identifica potenciales riesgos y problemas de derivados de desviarse de este plan (si los hubiera)
### Componentes de software y sus relaciones
 
![CyC](images/CyC.png)

El componente DepotCloudApp se corresponde al cliente web para móvil de la aplicación. Todas las conexiones que se realizan con los Services se hacen vía API REST salvo con el componente NotificationsService que se comunica mediante WebSockets para actualizarlo en tiempo real.

Cada uno de los componentes Services se corresponden a la API pública de interfaces REST conteniendo los conjuntos de funcionalidades correspondientes a cada uno de ellos.

Por otro lado se encuentran los Repository correspondientes para acceder a la base de datos correspondiente.

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
