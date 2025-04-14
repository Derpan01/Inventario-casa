import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ivbfaduevotbrkgggjwr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2YmZhZHVldm90YnJrZ2dnandyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMTgxOTIsImV4cCI6MjA1OTg5NDE5Mn0.ziXW6xVX53Mm6VKLUiVdD-k4f3chR8s36IiTj64_dlA';
const supabase = createClient(supabaseUrl, supabaseKey);

// JS
async function cargarInventario() {
    // 1. Obtener los datos desde Supabase
    const { data, error } = await supabase
      .from('inventarioprueba')
      .select('id, name, quantity, type');
  
    if (error) {
      console.error('Error al obtener inventario:', error.message);
      return;
    }
  
    // 2. Crear la lista de productos
    const productos = data.map(item => item.name);
  
    // 3. Llenar el select de productos
    const selectP = document.getElementById('selectP');
    selectP.innerHTML = ''; // Limpiar primero
    productos.forEach(nombre => {
      const option = document.createElement('option');
      option.value = nombre;
      option.textContent = nombre;
      selectP.appendChild(option);
    });
  
    // 4. Agregar listener para llenar selectC al cambiar de producto
    selectP.addEventListener('change', () => {
      const productoSeleccionado = selectP.value;
      const producto = data.find(p => p.name === productoSeleccionado);
  
      const selectC = document.getElementById('selectC');
      selectC.innerHTML = ''; // Limpiar antes
  
      for (let i = 1; i <= producto.quantity; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectC.appendChild(option);
      }
    });
  
    // Disparar el cambio una vez para inicializar selectC con el primero
    selectP.dispatchEvent(new Event('change'));
  }
  
  // Llama la función cuando cargue la página
  document.addEventListener('DOMContentLoaded', cargarInventario);

function eliminarProducto() {
    descontarProducto()
}

  async function descontarProducto() {
    const productoSeleccionado = document.getElementById("selectP").value;
    const cantidadSeleccionada = parseInt(document.getElementById("selectC").value);

    // Buscar el producto en la base de datos
    const { data, error } = await supabase
        .from("inventarioprueba")
        .select("id, quantity")
        .eq("name", productoSeleccionado)
        .single();

    if (error) {
        console.error("Error al buscar el producto:", error.message);
        return;
    }

    const cantidadActual = data.quantity;
    const nuevaCantidad = cantidadActual - cantidadSeleccionada;

    // Actualizar la cantidad
    const { error: updateError } = await supabase
        .from("inventarioprueba")
        .update({ quantity: nuevaCantidad })
        .eq("id", data.id);

    if (updateError) {
        console.error("Error al actualizar la cantidad:", updateError.message);
    } else {
        console.log(`Cantidad actualizada: ahora hay ${nuevaCantidad} de ${productoSeleccionado}`);
    }
}

document.getElementById("test").addEventListener("submit", async function(e) {
    e.preventDefault();
    await descontarProducto();
  });
  
