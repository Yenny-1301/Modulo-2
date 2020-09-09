function crearTarjeta(event) {
	// previene los eventos por defecto
	event.preventDefault();
	// cree variables con las informacion ingresada por el usuario
	let titulo= event.target.titulo.value;
	let texto= event.target.texto.value;
	let color= event.target.color.value;
// cree una variable llamada padre la cul mcontiene la informacion del section
	let parent= document.getElementById('cards');
// cree otras variables que crean un elemento html
	let article= document.createElement('article');
	let h3= document.createElement('h3');
	let p= document.createElement('p');
// a las variables que contienen los elementos html les asigne el valor ingresado por el ususario
	h3.innerText=titulo;
	p.innerText=texto;
// le dije al article que estos serian sus nuevos hijos
	article.appendChild(h3);
	article.appendChild(p);
// le asigne el color de fondo segun lo elija el usuario
	article.style.backgroundColor= color;
// le agregue la variable article como hijo del section
	parent.appendChild(article);
}