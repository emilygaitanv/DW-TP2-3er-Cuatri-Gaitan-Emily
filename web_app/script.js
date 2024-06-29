document.addEventListener('DOMContentLoaded', () => {
    const listaNotas = document.getElementById('lista-notas');
    const entradaNota = document.getElementById('entrada-nota');
    const botonAgregarNota = document.getElementById('boton-agregar-nota');
    const botonEliminarTodas = document.getElementById('boton-eliminar-todas');
    const botonInfo = document.getElementById('boton-info');
    const modalInfo = document.getElementById('modal-info');
    const botonCerrar = document.querySelector('.boton-cerrar');

    function cargarNotas() {
        const notas = localStorage.getItem('notas');
        const listaNotasArray = notas ? notas.split('||') : [];
        listaNotas.innerHTML = '';
        listaNotasArray.forEach((nota, indice) => {
            agregarNotaDOM(nota, indice);
        });
    }

    function agregarNotaDOM(nota, indice) {
        const li = document.createElement('li');
        li.className = 'item-nota';
        li.innerHTML = `
            <span>${nota}</span>
            <button onclick="eliminarNota(${indice})">Eliminar</button>
        `;
        listaNotas.appendChild(li);
    }

    botonAgregarNota.addEventListener('click', () => {
        const textoNota = entradaNota.value.trim();
        if (textoNota !== '') {
            let notas = localStorage.getItem('notas');
            notas = notas ? notas.split('||') : [];
            notas.push(textoNota);
            localStorage.setItem('notas', notas.join('||'));
            agregarNotaDOM(textoNota, notas.length - 1);
            entradaNota.value = '';
        }
    });

    botonEliminarTodas.addEventListener('click', () => {
        localStorage.removeItem('notas');
        cargarNotas();
    });

    window.eliminarNota = function(indice) {
        let notas = localStorage.getItem('notas');
        notas = notas ? notas.split('||') : [];
        notas.splice(indice, 1);
        localStorage.setItem('notas', notas.join('||'));
        cargarNotas();
    };

    botonInfo.addEventListener('click', () => {
        modalInfo.style.display = 'flex';
    });

    botonCerrar.addEventListener('click', () => {
        modalInfo.style.display = 'none';
    });

    window.addEventListener('click', (evento) => {
        if (evento.target === modalInfo) {
            modalInfo.style.display = 'none';
        }
    });

    cargarNotas();
});
