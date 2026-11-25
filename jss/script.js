let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contador = document.getElementById("contador");

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    contador.textContent = carrito.length;
}

contador.textContent = carrito.length;

const botones = document.querySelectorAll(".btn-agregar");

if (botones.length > 0) {
    const lista = document.getElementById("lista-carrito");
    const totalSpan = document.getElementById("total");
    const aviso = document.getElementById("aviso");

    function mostrarCarrito() {
        lista.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, indice) => {
            total += producto.precio;
            const li = document.createElement("li");
            li.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)}
                            <button onclick="quitar(${indice})">❌</button>`;
            lista.appendChild(li);
        });

        totalSpan.textContent = total.toFixed(2);
    }

    window.quitar = function (indice) {
        carrito.splice(indice, 1);
        guardar();
        mostrarCarrito();
    };

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            carrito.push({
                nombre: boton.dataset.nombre,
                precio: Number(boton.dataset.precio)
            });
            guardar();
            mostrarCarrito();

            aviso.classList.add("mostrar");
            setTimeout(() => aviso.classList.remove("mostrar"), 1500);
        });
    });

    document.getElementById("vaciar").addEventListener("click", () => {
        carrito = [];
        guardar();
        mostrarCarrito();
    });

    mostrarCarrito();
}

const elementos = document.querySelectorAll(".reveal");

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

elementos.forEach(el => observador.observe(el));