

let inventario = {};

document.addEventListener("DOMContentLoaded", function() {
    
    let inv = inventario;

    // Asegúrate de que el ID del select coincida
    var select = document.getElementById('productoS');
    for (const producto in inv) {
        const option = document.createElement("option");
        option.value = producto;  // Usamos el nombre del producto como valor
        option.textContent = producto;  // Usamos el nombre del producto como texto
        select.appendChild(option); // Añadimos la opción al select
    }

});


function agregarProducto() {
    const p = document.getElementById('producto').value;
    const c = parseInt(document.getElementById('cantidad').value);

    if (p in inventario) {
        inventario[p] += c;
    } else {
        inventario[p] = c;
    }

    document.getElementById("producto").value = '';
    document.getElementById("cantidad").value = '';

    console.log(inventario);
    agregarProducto(p,c)
}

import supabase from './supabase'

async function guardarEnInventario(producto, cantidad) {
  const { data, error } = await supabase
    .from('inventario')
    .insert([
      { producto: producto, cantidad: cantidad }
    ])

  if (error) {
    console.error('Error al guardar:', error)
  } else {
    console.log('Guardado:', data)
  }
}
