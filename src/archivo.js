<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    document.addEventListener('DOMContentLoaded', function() {
        const fileInput = document.getElementById('fileInput');
        const loadFileBtn = document.getElementById('loadFileBtn');
        const saveFileBtn = document.getElementById('saveFileBtn');
        const filePreview = document.getElementById('filePreview');
        const contentToSave = document.getElementById('contentToSave');
        
        // Manejar la carga de archivos
        loadFileBtn.addEventListener('click', function() {
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    if (file.type.startsWith('image/')) {
                        filePreview.innerHTML = `<img src="${e.target.result}" class="img-fluid" alt="Preview">`;
                    } else if (file.type === 'application/pdf') {
                        filePreview.innerHTML = `<p>Archivo PDF seleccionado: ${file.name}</p>`;
                    } else {
                        filePreview.textContent = e.target.result;
                    }
                    
                    // Llenar el área de texto con el contenido para facilitar la edición
                    if (file.type === 'text/plain') {
                        contentToSave.value = e.target.result;
                    }
                };
                
                if (file.type.startsWith('image/') || file.type === 'application/pdf') {
                    reader.readAsDataURL(file);
                } else {
                    reader.readAsText(file);
                }
            } else {
                alert('Por favor, selecciona un archivo primero.');
            }
        });
        
        // Manejar el guardado de archivos
        saveFileBtn.addEventListener('click', function() {
            if (contentToSave.value.trim() === '') {
                alert('Por favor, ingresa algún contenido para guardar.');
                return;
            }
            
            const blob = new Blob([contentToSave.value], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'archivo_guardado.txt';
            document.body.appendChild(a);
            a.click();
            
            // Limpiar
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 0);
        });
    });