
const libros = [
    { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', precio: 100},
    { titulo: 'Harry Potter y el Prisionero de Azkaban', autor: 'J.K Rowlings', precio: 1000.000 },
    { titulo: 'La casa de los espíritus', autor: 'Isabel Allende', precio: 666 }
];

let carrito = [];

function actualizarCarrito() {

    const contenedorCarrito = document.getElementById('carrito');
    const totalElemento = document.getElementById('total');
    contenedorCarrito.innerHTML = '';
    
    let total = 0;
    
    carrito.forEach(libro => {
        const divCarrito = document.createElement('div');
        divCarrito.className = 'carrito-item';
        divCarrito.textContent = `${libro.titulo} - $${libro.precio.toFixed(2)}`;
        contenedorCarrito.appendChild(divCarrito);
        total += libro.precio;
    });
    
    totalElemento.textContent = total.toFixed(2);
}

function mostrarLibros() {
    const contenedorTienda = document.getElementById('tienda');
    contenedorTienda.innerHTML = '';

    libros.forEach(libro => {
        const divLibro = document.createElement('div');
        divLibro.className = 'libro';
        divLibro.innerHTML = `
            <h2>${libro.titulo}</h2>
            <p>Autor: ${libro.autor}</p>
            <p>Precio: $${libro.precio.toFixed(2)}</p>
        `;

        divLibro.addEventListener('click', () => {
            carrito.push(libro);
            actualizarCarrito();
        });

        contenedorTienda.appendChild(divLibro);
    });
}

fetch('datos.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(libro => libros.push(libro));
        mostrarLibros();
    })
    .catch(error => console.error('Error al cargar los datos:', error));

mostrarLibros();
