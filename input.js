let inventario = {};

function agregarProducto() {
    const p = document.getElementById('producto').value;
    const c = parseInt(document.getElementById('cantidad').value);

    if (p in inventario) {
        inventario[p] += c;
    } else {
        inventario[p] =c;
    }

    console.log(inventario)

    let contenido = '';
    for (const producto in inventario) {
        contenido += `${producto}: ${inventario[producto]}\n`;
    }

    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventario.txt'; // Nombre del archivo que el usuario descargará
    a.click();

    URL.revokeObjectURL(url);
}

function leerInventario() {
    fetch('inventario.txt')
      .then(response => response.text()) // Obtiene el contenido del archivo como texto
      .then(contenido => {
        const inventario = parseInventario(contenido); // Procesa el contenido
        console.log(inventario); // Muestra el inventario cargado
      })
      .catch(error => console.error('Error al leer el archivo:', error));
  }
  
  function parseInventario(contenido) {
    const lineas = contenido.split('\n');
    const inventario = {};
  
    lineas.forEach(linea => {
      const [producto, cantidad] = linea.split(':').map(item => item.trim());
      if (producto && cantidad) {
        inventario[producto] = parseInt(cantidad);
      }
    });
  
    return inventario;
  }
  
  leerInventario(); 


  
  