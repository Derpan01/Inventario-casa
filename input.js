import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ivbfaduevotbrkgggjwr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2YmZhZHVldm90YnJrZ2dnandyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMTgxOTIsImV4cCI6MjA1OTg5NDE5Mn0.ziXW6xVX53Mm6VKLUiVdD-k4f3chR8s36IiTj64_dlA';
const supabase = createClient(supabaseUrl, supabaseKey);



let inventario = {};

document.addEventListener("DOMContentLoaded", function() {
    
    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // Esto previene la recarga de la página
        agregarProducto(); // Llamamos a la función que agregará el producto
    });

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
    guardarEnInventario(p,c);
}

async function guardarEnInventario(producto, cantidad) {
    const { data, error } = await supabase
      .from('inventario') // nombre de tu tabla
      .insert([{ name: producto, quantity: cantidad }]); // columnas que tengas
  
    if (error) {
      console.error('Error al guardar en la base de datos:', error.message);
    } else {
      console.log('Producto guardado correctamente:', data);
    }
  }
  
