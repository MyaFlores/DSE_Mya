
        function openTab(evt, tabName) {
            // Oculta todos los contenidos de pestañas
            var tabContents = document.getElementsByClassName("tab-content");
            for (var i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove("active");
            }
            
            // Desactiva todos los botones de pestañas
            var tabButtons = document.getElementsByClassName("tab-button");
            for (var i = 0; i < tabButtons.length; i++) {
                tabButtons[i].classList.remove("active");
            }
            
            // Muestra la pestaña actual y activa su botón
            document.getElementById(tabName).classList.add("active");
            evt.currentTarget.classList.add("active");
        }
