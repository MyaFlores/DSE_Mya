        // Almacenar los contactos
        let contacts = [];
        let isEditing = false;
        let currentEditId = null;

        // Elementos del DOM
        const contactForm = document.getElementById('contact-form');
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const contactIdInput = document.getElementById('contact-id');
        const submitBtn = document.getElementById('submit-btn');
        const cancelBtn = document.getElementById('cancel-btn');
        const contactsList = document.getElementById('contacts-list');
        const searchInput = document.getElementById('search');
        const successMessage = document.getElementById('success-message');

        // Expresiones regulares para validación
        const phoneRegex = /^[\d\s\-()+]{7,15}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Event Listeners
        contactForm.addEventListener('submit', handleSubmit);
        cancelBtn.addEventListener('click', cancelEdit);
        searchInput.addEventListener('input', filterContacts);

        // Función para manejar el envío del formulario
        function handleSubmit(e) {
            e.preventDefault();
            
            // Validar campos
            if (!validateForm()) {
                return;
            }
            
            // Crear objeto contacto
            const contact = {
                id: isEditing ? currentEditId : Date.now().toString(),
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim()
            };
            
            if (isEditing) {
                // Actualizar contacto existente
                const index = contacts.findIndex(c => c.id === contact.id);
                contacts[index] = contact;
                showMessage('Contacto actualizado correctamente');
            } else {
                // Agregar nuevo contacto
                contacts.push(contact);
                showMessage('Contacto agregado correctamente');
            }
            
            // Resetear formulario y actualizar lista
            resetForm();
            renderContacts();
        }

        // Función para validar el formulario
        function validateForm() {
            let isValid = true;
            
            // Validar nombre
            if (nameInput.value.trim() === '') {
                document.getElementById('name-error').textContent = 'El nombre es requerido';
                isValid = false;
            } else {
                document.getElementById('name-error').textContent = '';
            }
            
            // Validar teléfono
            if (phoneInput.value.trim() === '') {
                document.getElementById('phone-error').textContent = 'El teléfono es requerido';
                isValid = false;
            } else if (!phoneRegex.test(phoneInput.value.trim())) {
                document.getElementById('phone-error').textContent = 'Formato de teléfono inválido';
                isValid = false;
            } else {
                document.getElementById('phone-error').textContent = '';
            }
            
            // Validar email
            if (emailInput.value.trim() === '') {
                document.getElementById('email-error').textContent = 'El correo es requerido';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                document.getElementById('email-error').textContent = 'Formato de correo inválido';
                isValid = false;
            } else {
                document.getElementById('email-error').textContent = '';
            }
            
            return isValid;
        }

        // Función para renderizar los contactos
        function renderContacts(contactsToRender = contacts) {
            contactsList.innerHTML = '';
            
            if (contactsToRender.length === 0) {
                contactsList.innerHTML = '<tr><td colspan="4" style="text-align: center;">No hay contactos registrados</td></tr>';
                return;
            }
            
            contactsToRender.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contact.name}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.email}</td>
                    <td>
                        <button class="action-btn edit-btn" data-id="${contact.id}">Editar</button>
                        <button class="action-btn delete-btn" data-id="${contact.id}">Eliminar</button>
                    </td>
                `;
                contactsList.appendChild(row);
            });
            
            // Agregar event listeners a los botones
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', () => editContact(btn.dataset.id));
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', () => deleteContact(btn.dataset.id));
            });
        }

        // Función para editar un contacto
        function editContact(id) {
            const contact = contacts.find(c => c.id === id);
            if (!contact) return;
            
            isEditing = true;
            currentEditId = id;
            
            // Llenar formulario con datos del contacto
            nameInput.value = contact.name;
            phoneInput.value = contact.phone;
            emailInput.value = contact.email;
            contactIdInput.value = contact.id;
            
            // Cambiar texto del botón
            submitBtn.textContent = 'Actualizar Contacto';
            cancelBtn.style.display = 'inline-block';
            
            // Scroll al formulario
            contactForm.scrollIntoView({ behavior: 'smooth' });
        }

        // Función para cancelar edición
        function cancelEdit() {
            resetForm();
        }

        // Función para eliminar un contacto
        function deleteContact(id) {
            if (confirm('¿Estás seguro de eliminar este contacto?')) {
                contacts = contacts.filter(contact => contact.id !== id);
                renderContacts();
                showMessage('Contacto eliminado correctamente');
                
                // Si estábamos editando este contacto, resetear el formulario
                if (isEditing && currentEditId === id) {
                    resetForm();
                }
            }
        }

        // Función para filtrar contactos
        function filterContacts() {
            const searchTerm = searchInput.value.toLowerCase();
            
            if (searchTerm === '') {
                renderContacts();
                return;
            }
            
            const filteredContacts = contacts.filter(contact => 
                contact.name.toLowerCase().includes(searchTerm) || 
                contact.email.toLowerCase().includes(searchTerm)
            );
            
            renderContacts(filteredContacts);
        }

        // Función para resetear el formulario
        function resetForm() {
            contactForm.reset();
            contactIdInput.value = '';
            isEditing = false;
            currentEditId = null;
            submitBtn.textContent = 'Agregar Contacto';
            cancelBtn.style.display = 'none';
            
            // Limpiar mensajes de error
            document.querySelectorAll('.error').forEach(el => {
                el.textContent = '';
            });
        }

        // Función para mostrar mensajes de éxito
        function showMessage(message) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }

        // Inicializar la lista de contactos
        renderContacts();
