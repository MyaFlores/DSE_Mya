
// Manejo de pestañas
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover clase active de todas las pestañas y contenidos
        document.querySelectorAll('.tab, .tab-content').forEach(el => {
            el.classList.remove('active');
        });
        
        // Agregar clase active a la pestaña clickeada
        tab.classList.add('active');
        
        // Mostrar el contenido correspondiente
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Manejo de archivos
document.getElementById('btnSeleccionar').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('fileName').textContent = `Nombre: ${file.name}`;
        document.getElementById('fileSize').textContent = `Tamaño: ${(file.size / 1024).toFixed(2)} KB`;
        document.getElementById('fileType').textContent = `Tipo: ${file.type || 'Desconocido'}`;
        document.getElementById('fileInfo').classList.remove('hidden');
    }
});

document.getElementById('btnGuardar').addEventListener('click', () => {
    // Crear contenido para el archivo (ejemplo)
    const contenido = `Este es un archivo de ejemplo generado el ${new Date().toLocaleString()}`;
    
    // Crear Blob
    const blob = new Blob([contenido], { type: 'text/plain' });
    
    // Crear URL para descarga
    const url = URL.createObjectURL(blob);
    
    // Crear elemento <a> para descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archivo_ejemplo.txt';
    a.click();
    
    // Liberar memoria
    URL.revokeObjectURL(url);
});
