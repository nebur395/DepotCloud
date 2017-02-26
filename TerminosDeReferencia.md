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

En un cuarto para trastos, o en un trastero, almacenamos no solo trastos sino 
también objetos personales, sentimentales y valiosos. Normalmente los guardamos
 en cajas y estos en estanterías.

El primer problema que surge es la ocupación del espacio. Los trastos crecen hasta 
ocupar todo el espacio disponible. La solución es tener varios almacenes familiares: 
el cuarto de los trastos, el trastero del edificio, una segunda vivienda o, incluso, 
un guardamuebles. El segundo problema, derivado del anterior, es conseguir que en esos almacenes
no haya objetos guardados que ya no tenga sentido que estén allí, habiéndonos olvidado
que los teníamos y sin haberlos tirado. El segundo problema es decidir dónde deberá guardarse cada objeto. 
El siguiente problema surge cuando no nos acordamos dónde hemos dejado algo y tenemos 
que rebuscar en los almacenes familiares para localizarlo.

¿Por qué no podemos localizar un objeto almacenado? Principalmente porque ha pasado
tiempo y nos hemos olvidado de dónde lo pusimos. También  puede pasar que nosotros
o un familiar lo haya cambiado de lugar en un trastero, lo haya llevado a otro almacén,
lo ha devuelto a casa o lo ha tirado. Si es un familiar le podemos llegar a preguntar,
pero si todos estos movimientos los ha realizado una empresa de mudanzas es muy probable
que lo hayamos perdido para siempre. Una posible solución a todos estos problemas es tener 
un inventario manual de todo lo almacenado. Esta solución es factible cuando el número 
de objetos es muy bajo. Sin embargo, la experiencia nos dice que rápidamente los trasteros 
se convierten en un caos, por lo que esta solución no es adecuada en la práctica.
 
## Objetivos

El proyecto tiene como objetivo principal desarrollar una solución a los siguientes problemas relacionados con los almacenes familiares:

 - Mantener un inventario fiel de los objetos almacenados.
 - Aprovechar al máximo el espacio disponible.
 - Localizar rápidamente cualquier objeto que esté almacenado.
 - Recomendar la purga de algunos objetos almacenados.
 - Dado un objeto determinar dónde deberá estar almacenado.
 - Controlar quién mueve y a dónde los objetos almacenados.
 - Gestionar los almacenes personales de una unidad familiar, dando la posibilidad de delegar tareas a terceros.
 - Automatizar los procesos anteriores utilizando diferentes tipos de dispositivos. 
 
## Alcance de la solución

**Debe tener**: Son aquellos requisitos críticos para que el trabajo realizado 
durante un periodo de tiempo determinado (en nuestro caso desde ahora hasta junio 2017) 
sea considerado un éxito (TFG aprobado). Si uno de estos requisitos no se incluye, 
el proyecto deberá ser considerado un fallo (no se puede presentar el TFG o el TFG es suspendido). 
**Debe tener** en [MoSCoW](https://en.wikipedia.org/wiki/MoSCoW_method) es **MUST** 
que puede ser considerado un acrónimo de **M**inimum **U**sable **S**ubse**T**. 
En ese sentido se puede entender como la unión de los requisitos del [producto mínimo viable](https://en.wikipedia.org/wiki/Minimum_viable_product) 
con los requisitos legales (p.ej. documentación en forma de memoria de TFG, cumplimiento LOPD, etc.) 
y de seguridad (en el sentido de robustez y calidad de la solución) obligatorios o acordados. 

**Debería tener**: Son aquellos que son importantes pero no necesarios para ser 
realizados durante el periodo de tiempo determinado. Pueden posponerse para ser 
realizado en el siguiente periodo. Son vitales pero no vitales, si no se implementan 
la solución es viable pero es doloroso no hacerlo (no se alcanzara un notable en el TFG, por ejemplo). 

**Podrá tener**: Son aquellos que comparados con los anteriores son los menos 
deseados o tienen menor impacto. Hay que tenerlos controlados ya que sólo se podrán 
entregar si se dan las mejores condiciones (por ejemplo, el proyecto va más rápido de 
los esperado). Si hay algún riesgo en la entrega del proyecto estos requisitos serían 
los primeros en ser descartados. Si no, el proyecto cubrirá todos sus objetivos (p. ej. 
se tendrá un sobresaliente o matrícula en el TFG).

**No tendrá**: Son aquellos que no van a ser entregados durante el periodo considerado. 
Se mantienen en esta lista de alcance para clarificar el alcance de la solución. Esto evita 
que informalmente sean introducidos ms tarde. El objetivo es ayudar a mantener el foco en la solución.

La solución **DEBE TENER** que ser capaz de:

- **Permitir** que todos los miembros de la unidad familiar se puedan autenticar y acceder al sistema.
- **Permitir** gestionar al menos los siguientes tipos de almacenes familiares: vivienda principal,
cuarto en vivienda principal, trastero en vivienda principal, vivienda secundaria, y guardamuebles.
- **Permitir** que cualquier miembro de la unidad familiar pueda registrar un almacén familiar y sus características.
- **Introducir** objetos en los almacenes familiares que pueden contener información y/o características adicionales
para que los usuarios puedan identificarlos.
- **Eliminar** objetos de cualquiera de los almacenes familiares creados.
- **Eliminar** los almacenes familiares creados.
- **Modificar** la información y/o características de los distintos objetos o almacenes familiares creados.
- **Mover** un objeto de una almacén familiar a otro.
- **Visualizar** en una lista la actividad (ordenada cronológicamente) de la cuenta
de la familia en tiempo real pudiendo identificar que perfiles han realizado diversas acciones sobre la misma.
- **Detectar** objetos duplicados y avisar al usuario para que lo tenga en cuenta
a la hora de tomar acciones.
- **Notificar** al usuario de forma automática algunas recomendaciones que puede
realizar sobre algunos tipos de objetos específicos (p.ej., "El objeto X ya no está en garantía,
puedes dejar de guardar su caja").
- **Notificar** al usuario formas de optimizar la localización de los objetos 
dependiendo de su actividad en los distintos almacenes familiares (p.ej., "El objeto X almacenado
en tu vivienda secundaria tiene mucha actividad, prueba a moverlo a tu vivienda
principal para facilitar su uso").
- **Buscar** un objeto para obtener de forma rápida la entidad en la que se 
encuentra localizado.
- **Cumplir** aspectos legales referentes a la [LOPD](https://www.boe.es/buscar/act.php?id=BOE-A-1999-23750)
así como ofrecer unos términos y condiciones de uso a los usuarios.

La solución **DEBERÍA TENER** que ser capaz de:
- **Ofrecer** una interfaz de usuario responsive o híbrida que sea usable pensando en que una
de sus orientaciones está pensada para unidades familiares que no tienen por qué controlar las tecnologías.
- **Permitir** que un tercero a la unidad familiar pueda autenticarse y acceder al sistema.
- **Permitir** que un tercero a la unidad familiar pueda ejercer acciones sobre los objetos
almacenados en el guardamuebles pertenecientes a la unidad familiar y que a esta le aparezca registrado
en su lista de actividad de cuenta.
- **Ofrecer** mediante una API los servicios principales del sistema para que las empresas
o sistemas automáticos puedan hacer uso de ellas.


La solución **PODRÁ TENER** que ser capaz de:
- **Documentar y testear** de una forma intensa la API en caso de que se llegue a ofrecer
públicamente para evitar usos indeseados del sistema.
- **Optimizar** la forma de introducir objetos en el sistema para que al usuario le sea cómodo
y rápido, y que a la vez el sistema siga siendo capaz de aplicar las optimizaciones, detecciones
o recomendaciones apropiadas a los mismos.
- **Ofrecer** un tutorial o manual de usuario sobre el funcionamiento de la aplicación.

Queda **FUERA** el análisis de un modelo de negocio para la solución implementada, 
el desarrollo de un sistema de cuentas premium/free así como crear un enfoque de uso atractivo
centrándose en empresas de mudanza o de gestores de almacenes, y un sistema de 
comunicaciones entre los distintos perfiles de la unidad familiar o los terceros con acceso
a sus objetos.

## Restricciones del proyecto
- El proyecto ha de ser terminado antes de julio de 2017.
- La implementación de la solución en la parte del back-end tiene que estar escrita 
en Java.
- No se puede realizar ninguna modificación a los objetos o almacenes familiares físicos.
- La solución no debe requerir de un gran número de recursos computacionales.
- La solución no puede asumir nunca que la información existente en el sistema, de los objetos y 
almacenes familiares, pertenecientes a una unidad familiar es actualizada al 100% constantemente.
 
## Beneficios

* 1 TFG.
* 0 ó 1 aplicaciones comerciales.

## Hipótesis y dependencias

- El proceso y diseño de la interfaz de usuario ha contado con el apoyo del suficiente
feedback de diversos usuarios como para conseguir una interfaz usable.
- Se requiere de asesoramiento legal debido a la falta de conocimiento y formación 
en aspectos legales referentes a la [LOPD](https://www.boe.es/buscar/act.php?id=BOE-A-1999-23750).
- El almacenamiento se podrá realizar sobre una base de datos SQL. 
- El back-end se puede implementar utilizando la tecnología Spring. 
- El front-end  se puede implementar utilizando la tecnología AngularJS y el uso
de algunas librerías como Bootstrap o W3CSS.

## Riesgos del proyecto

- La solución resultante no cumple con algunos aspectos de  la [LOPD](https://www.boe.es/buscar/act.php?id=BOE-A-1999-23750).
- La solución resultante no se consigue que sea totalmente responsive.
- La solución resultante posee problemas de escalabilidad.
- No se consigue, ni mediante la interfaz, ni mediante el manual de usuario, que la 
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
