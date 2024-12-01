let currentPage = 1;
let searchQuery = '';
let sortColumn = 'nombre';
let sortOrder = 'ASC';

function loadTableData() {
    searchQuery = $('#searchInput').val() || '';
    
    $.ajax({
        url: `api.php?action=read&search=${searchQuery}&column=${sortColumn}&order=${sortOrder}&page=${currentPage}`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const tbody = $("#dataTable tbody");
            tbody.empty();
            
            data.forEach(row => {
                const tr = `
                    <tr>
                        <td>${row.nombre}</td>
                        <td>${row.valor}</td>
                        <td>
                            <button onclick="editRecord(${row.id})">Editar</button>
                            <button onclick="deleteRecord(${row.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
                tbody.append(tr);
            });
        },
        error: function(error) {
            console.error('Error:', error);
            alert("Hubo un problema al cargar los datos.");
        }
    });
}


function addRecord() {
    const nombre = prompt("Nombre:");
    const valor = prompt("Valor:");
    if (nombre && valor) {
        $.ajax({
            url: 'api.php?action=create',
            method: 'POST',
            data: {
                nombre: nombre,
                valor: valor
            },
            success: loadTableData,
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }
}


function editRecord(id) {
    const nombre = prompt("Nuevo Nombre:");
    const valor = prompt("Nuevo Valor:");
    if (nombre && valor) {
        $.ajax({
            url: 'api.php?action=update',
            method: 'POST',
            data: {
                id: id,
                nombre: nombre,
                valor: valor
            },
            success: loadTableData,
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }
}


function deleteRecord(id) {
    if (confirm("¿Seguro que deseas eliminar este registro?")) {
        $.ajax({
            url: 'api.php?action=delete',
            method: 'POST',
            data: { id: id },
            success: loadTableData,
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }
}

function sortTable(column) {
    sortColumn = column;
    sortOrder = (sortOrder === 'ASC') ? 'DESC' : 'ASC';
    loadTableData();
}


// Función para ir a la página anterior
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadTableData();
    }
}

// Función para ir a la página siguiente
function nextPage() {
    currentPage++;
    loadTableData();
}
