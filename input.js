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
}




  
  