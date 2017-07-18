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
un guardamuebles. El segundo problema, derivado del anterior, es conseguir que en 
esos almacenes no haya objetos guardados que ya no tenga sentido que estén allí,
habiéndonos olvidado que los teníamos y sin haberlos tirado. El segundo problema 
es decidir dónde deberá guardarse cada objeto. El siguiente problema surge cuando
no nos acordamos dónde hemos dejado algo y tenemos que rebuscar en los almacenes
familiares para localizarlo.

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

El proyecto tiene como objetivo principal desarrollar una solución a los siguientes
 problemas relacionados con los almacenes familiares:

 - Mantener un inventario fiel de los objetos almacenados.
 - Aprovechar al máximo el espacio disponible.
 - Localizar rápidamente cualquier objeto que esté almacenado.
 - Recomendar la purga de algunos objetos almacenados.
 - Dado un objeto determinar dónde deberá estar almacenado.
 - Controlar quién mueve y a dónde los objetos almacenados.
 - Gestionar los almacenes personales de una unidad familiar, dando la posibilidad
  de delegar tareas a terceros.
 - Automatizar los procesos anteriores utilizando diferentes tipos de dispositivos. 
 
## Alcance de la solución

La solución debe:
- Usar mecanismos que aseguren que sólo las usuarios autorizados puedan acceder 
al sistema (**completo**).
- Permitir que los usuarios puedan crear una unidad familiar y administrar que 
usuarios del sistema forman parte (**completo**).
- Servir para que los miembros de una unidad familiar puedan crear un almacén 
familiar y con posterioridad puedan modificar sus características e incluso 
darle de baja (**completo**). 
- Permitir que cualquier miembro de una unidad familiar pueda registrar que un 
determinado objeto se situa en un determinado almacén junto con un título, una 
foto y una breve descripción que permita que para que cualquier miembro de la 
unidad familiar pueda identificarlo (**completo**).
- Permitir que cualquier miembro de una unidad familiar pueda actualizar el estado
 del objeto, ya sea tras moverlo de un almacén a otro, o cuando hay interés en 
 registrar cualquier evento mediante una nota o una foto (**completo**). 
- Permitir que cualquier miembro de una unidad familiar retire un objeto del 
control del sistema de almacenes (**completo**).
- Permitir que todos los miembros de la unidad familiar obtengan un listado con 
cualquier acción realizada sobre los almacenes y los objetos almacenados (**completo**).
- Ofrecer diversos informes sobre el estado de cada uno de los objetos contenidos  (**completo**).
- Ayudar a localizar un objeto entre todos los almacenes mediante un búsqueda 
de texto y mostrando la descripción, las fotos y la localización de los que 
coincidan con el texto buscado  (**completo**).
- Cumplir todos los aspectos legales necesarios para una solución de este tipo,
 en particular los referentes a la [LOPD](https://www.boe.es/buscar/act.php?id=BOE-A-1999-23750) (**falta**).
- Tener una interfaz de usuario cómoda tanto en escritorio como en móvil (**completo**).
- Capturar la información de gestión en un almacén con la ayuda del móvil (**completo**).
- Ofrecer un tutorial o manual de usuario sobre el funcionamiento de la aplicación (**completo**).
- Analizar la posiblidad de ser un producto comercial utilizando una aproximación ágil (**falta**). 

La solución debería:
- Cada almacén tiene un nombre, una dirección o localización y una caracterización
 de su accesibilidad. Es decir, se podrán caraterizar como almacenes donde hay 
 objetos frecuentemente utilizados y como almacendes donde hay objetos poco o 
 nada utilizados (**completo**).
- Tener un modelo de datos más rico del objeto almacenado (p. ej., datos de 
garantía, fecha de caducidad, valor, etc.) (**completo**).
- Listar al usuario algunas recomendaciones que pueden implicar la realización 
de acciones en relación con algunos objetos (p.ej., *"El objeto X ya no está en 
garantía, puedes dejar de guardar su caja"*) (**completo**).
- Notificar al usuario que un objeto debería estar en una almacén más accesible 
dependiendo de su actividad (p.ej., *"El objeto X almacenado en tu vivienda 
secundaria tiene mucha actividad, prueba a moverlo a tu vivienda principal para 
facilitar su uso"*) (**falta, me está costando encontrar una forma óptima**).
- Tener un tipo de usuario que sea administrador. No podrán registrarse nuevos 
usuarios administradores, por tanto tiene que haber mínimo una cuenta ya introducida
 de serie en el sistema (**completo**).
- Tener una interfaz de usuario para el administrador que esté pensada para 
dispositivos desktop (**completo**).
- El usuario administrador tiene que poder buscar y dar de alta en el sistema a 
unidades familiares que hayan borrado su cuenta anteriormente (**completo**).
- El usuario administrador tiene que poder buscar y editar el correo y el nombre 
de una unidad familiar (**completo**).
- El usuario administrador puede ver estadísticas con datos relevantes del sistema (**completo**).
- Ofrecer mediante una API acceso a los servicios principales del sistema para 
que empresas o sistemas automáticos puedan hacer uso de ellas (**completo**).
- Tener un API bien documentada y testeada para evitar usos indeseados del sistema (**completo**).

La solución podría:
- Detectar objetos potencialmente registrados dos veces o que se encuentran
 registrados en dos almacenes diferentes utilizando las descripciones y las fotos
  y avisar al usuario para que lo tenga en cuenta a la hora de tomar acciones (**falta, estoy un poco perdido en esto, me falta investigación**).
- Optimizar la forma de introducir objetos en el sistema para que al usuario le 
sea cómodo y rápido, pudiendo reconocer múltiples objetos almacenados con una 
única foto(**falta, estoy un poco perdido en esto, me falta investigación**).
- Compartir información utilizando sistemas de mensajería de terceros (**falta**).

Queda fuera de la solución de cara al TFG:
- Tener un sistema de roles que controlar el acceso a una determinada información
 sobre un objeto o almacen en función del rol.
- Permitir delegar ciertas operaciones de creación, modificación, borrado y 
búsqueda a una persona ajena a la unidad familiar.
- Creación de un enfoque de uso atractivo centrándose en empresas de mudanza 
(check lists) o de gestores de almacenes (personalización de la interfaz para su 
reventa por teceros)
- Un sistema de comunicaciones propio entre los distintos perfiles de la unidad
 familiar o los terceros con acceso.
a sus objetos.

## Restricciones del proyecto
- El proyecto ha de ser terminado antes de septiembre de 2017.
- La implementación de la solución en la parte del back-end tiene que estar escrita 
en Java o Javascript.
- El control de la localización es solo virtual, es decir, no se puede realizar 
ninguna modificación a los objetos o almacenes familiares físicos.
- La solución en el cliente no debe requerir de un gran número de recursos computacionales.
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
- El almacenamiento se podrá realizar sobre una base de datos documental. 
- El back-end se puede implementar utilizando la tecnología Express. 
- El front-end  se puede implementar utilizando la tecnología Ionic2 y AngularJS.

## Riesgos del proyecto

- La solución resultante no cumple con algunos aspectos de  la [LOPD](https://www.boe.es/buscar/act.php?id=BOE-A-1999-23750).
- La solución resultante no se consigue que sea totalmente responsive e híbrida 
entre los distintos dispositivos móviles.
- La solución resultante posee problemas de escalabilidad.
- No se consigue, ni mediante la interfaz, ni mediante el manual de usuario, que la 
aplicación sea intuitiva para personas no familiarizadas con las tecnologías.
- Aparición de posibles competidores.
- La solución resultante no tenga la calidad mínima para evolucionar.
- No se domina lo suficiente la tecnología Javascript con Express como para que 
se tenga que migrar el proyecto a Java con Spring en un estado avanzado del 
desarrollo de la aplicación.
- No se domina lo suficiente la tecnología Ionic2 con Angular2 como para que se 
tenga que migrar el proyecto a Ionic1 con Angular1 en un estado avanzado del 
desarrollo de la aplicación.

## Recursos e instalaciones necesarias

* Un alumno (Rubén Moreno).
* Un puesto de trabajo libre en el L2.09.

## Plazos y costes

* El plazo de finalización de este proyecto es septiembre 2017.
* El proyecto debe poderse realizar por un alumno durante un plazo de 4 meses.
* Los recursos inicialmente comprometidos para este proyecto son un alumno durante
 350 horas y un director durante 35 horas.
