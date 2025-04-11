import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ivbfaduevotbrkgggjwr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2YmZhZHVldm90YnJrZ2dnandyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMTgxOTIsImV4cCI6MjA1OTg5NDE5Mn0.ziXW6xVX53Mm6VKLUiVdD-k4f3chR8s36IiTj64_dlA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function mostrarInventario() {
    const { data, error } = await supabase.from('inventario').select();
  
    if (error) {
      console.error('Error al obtener inventario:', error.message);
      return;
    }
  
    const tbody = document.getElementById("tablaInventario");
    tbody.innerHTML = ''; // Limpiar tabla
  
    data.forEach(item => {
      const fila = document.createElement("tr");
  
      const celdaNombre = document.createElement("td");
      celdaNombre.textContent = item.name;
  
      const celdaCantidad = document.createElement("td");
      celdaCantidad.textContent = item.quantity;
  
      fila.appendChild(celdaNombre);
      fila.appendChild(celdaCantidad);
      tbody.appendChild(fila);
    });
  }

document.addEventListener("DOMContentLoaded", mostrarInventario())
  