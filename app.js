const API_URL = 'http://localhost:3000/dades';

document.addEventListener('DOMContentLoaded', () => {
    carregarNumPokemons();
    carregarPokemons();
});

// 2. ANEM A BUSCAR EL NÚMERO DE LLOCS
function carregarNumPokemons() {
    fetch('http://localhost:3000/numPokemons')
        .then(res => res.json())
        .then(dades => {
            // Com que el servidor ens torna un array, mirem quants llocs hi ha
            document.getElementById('count-usuaris').textContent = dades[0].total;
        });
}

function carregarPokemons() {
    fetch('http://localhost:3000/pokemons')
        .then(res => res.json())
        .then(esdeveniments => {
            const tbody = document.getElementById('taula-esdeveniments');
            tbody.innerHTML = ''; // Netegem la taula per si de cas
            // Recorrem els esdeveniments un a un
            esdeveniments.forEach(ev => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${ev.Name}</td>
                    <td>${ev.Height}</td>
                `;
                tbody.appendChild(fila);
            });
        })
        .catch(err => console.error("Error carregant les dades:", err));
}

