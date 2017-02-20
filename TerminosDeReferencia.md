# Depot Cloud

## Propósito de este documento

* Indicar la motivación y los objetivos del proyecto.
* Describir en líneas generales el alcance del proyecto.
* Indicar cualquier dependencia y limitación ya conocida.
* Identificar los recursos requeridos para la siguiente fase del TFG.
* Justificar y asegurar el apoyo para llevar a cabo la siguiente fase del TFG.

## Aprobación

| Persona | Rol | Fecha |
|---------|-----|-------|
| Francisco J. Lopez-Pellicer | Director | 2017-01-10

## Motivación

Este proyecto se motiva por el interés en crear una infraestructura para gestionar 
y optimizar almacenes y viviendas, así como poder realizar búsquedas de los objetos alojados 
en los mismos, para facilitar y automatizar dicha tarea a unidades familiares o 
empresas de almacenamiento. 
 
## Objetivos

El proyecto tiene como objetivo principal desarrollar una solución que de una
solución a los siguientes problemas:

 - Gestionar los productos de almacenes, trasteros y/o viviendas de unidades familiares
 o empresas de almacenamiento.
 - Optimizar los productos de almacenes, trasteros y/o viviendas de unidades familiares
 o empresas de almacenamiento.
 - Buscar y filtrar objetos/productos para poder localizar rápidamente en que almacén, trastero
 o vivienda se encuentran.
- Proporcionar un interfaz de las anteriores funcionalidades a usuarios humanos y máquinas.

## Ámbito

La solución **DEBE** ser capaz de:

- **Realizar** una gestión de cuentas de usuario, donde las cuentas adoptarían 
un rol de "familia" o "empresa" con su nombre, contraseña y si es necesario algunos 
datos adicionales para poder autenticarse.
- **Crear** diversos perfiles dentro de una cuenta sin necesidad de autenticarse de nuevo
con el único fin de poder identificar al usuario que está accediendo a esa cuenta.
- **Crear** distintas entidades de almacenamiento que pueden ser dotadas de información
y/o atributos adicionales para que los usuarios puedan identificarlas (p.ej., vivienda principal, 
vivienda secundaria, trastero...).
- **Introducir** objetos en las entidades que pueden contener información y/o atributos adicionales
para que los usuarios puedan identificarlos.
- **Eliminar** objetos de cualquiera de las entidades creadas, así como las mismas
entidades creadas.
- **Modificar** la información y/o atributos de los distintos objetos o entidades creadas.
- **Mover** un objeto de una entidad a otra.
- **Visualizar** mediante un dashboard en tiempo real la actividad de la cuenta pudiendo
identificar que perfiles han realizado diversas acciones sobre la misma.
- **Detectar** objetos duplicados y avisar al usuario para que lo tenga en cuenta
a la hora de tomar acciones.
- **Notificar** al usuario de forma automática algunas recomendaciones que puede
realizar sobre algunos tipos de objetos específicos (p.ej., "El objeto X ya no está en garantía,
puedes dejar de guardar su caja").
- **Notificar** al usuario formas de optimizar la localización de los objetos 
dependiendo de su actividad en las distintas entidades (p.ej., "El objeto X almacenado
en tu vivienda secundaria tiene mucha actividad, prueba a moverlo a tu vivienda
principal para facilitar su uso").
- **Buscar y filtrar** un objeto para obtener de forma rápida la entidad en la que se 
encuentra localizado.

La solución **IDEALMENTE** ser capaz de:

- **Ofrecer** una interfaz responsive o híbrida que sea usable pensando en que uno
de sus usos es para unidades familiares que no tienen por qué controlar las tecnologías.
- **Crear** subentidades dentro de las propias entidades, ofreciendo así una forma
de localización mejorada en los objetos (p.ej., habitaciones dentro de las viviendas).
- **Ofrecer** mediante una API los servicios principales del sistema para que las empresas
puedan hacer uso de ellas y si lo desean crearse su propia interfaz.
- **Documentar y testear** de una forma intensa la API en caso de que se llegue a ofrecer
públicamente para evitar usos indeseados del sistema.
- **Optimizar** la forma de introducir objetos en el sistema para que al usuario le sea cómodo
y rápido, y que a la vez el sistema siga siendo capaz de aplicar las optimizaciones, detecciones
o recomendaciones apropiadas a los mismos.
- **Cumplir** aspectos legales referentes a la [LOPD](https://www.boe.es/buscar/act.php?id=BOE-A-1999-23750)
así como ofrecer unos términos y condiciones de uso a los usuarios.

Queda **FUERA** el desarrollo de un sistema de cuentas premium/free así como un sistema
de comunicaciones entre los distintos perfiles de las cuentas pensando en un modelo de negocio
orientado más a las empresas que a las unidades familiares.

## Restricciones del proyecto


 
## Beneficios

* 1 TFG.
* 0 ó 1 aplicaciones comerciales.

## Hipótesis y dependencias



## Riesgos del proyecto

- La solución resultante no cumple con algunos aspectos de  la [LOPD](https://www.boe.es/buscar/act.php?id=BOE-A-1999-23750).
- La solución resultante no se consigue que sea totalmente responsive.
- La solución resultante posee problamas de escalabilidad.
- No se consigue ni mediante la interfaz ni mediante el manual de usuario que la 
aplicación sea intuitiva para personas no familiarizadas con las tecnologías.
- Aparición de posibles competidores.
- La solución resultante no tenga la calidad mínima para evolucionar.

## Recursos e instalaciones necesarias

* Un alumno (Rubén Moreno).
* Un puesto de trabajo libre en el L2.09.

## Plazos y costes

* El plazo de finalización de este proyecto es junio 2017.
* El proyecto debe poderse realizar por un alumno durante un plazo de 4 meses.
* Los recursos inicialmente comprometidos para este proyecto son un alumno durante 350 horas y un director durante 
35 horas.

## Implicados
