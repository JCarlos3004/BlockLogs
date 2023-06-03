    // Obtener elementos relevantes
    var searchInput = document.getElementById('searchInput');
    var menuItems = document.querySelectorAll('#side-menu li:not(.sidebar-search)');

    // Agregar evento de entrada al campo de búsqueda
    searchInput.addEventListener('input', function() {
        var searchValue = searchInput.value.toLowerCase();
        filterMenuItems(searchValue);
    });

    // Filtrar elementos del menú según el término de búsqueda
    function filterMenuItems(searchValue) {
        for (var i = 0; i < menuItems.length; i++) {
            var menuItemText = menuItems[i].textContent.toLowerCase();
            if (menuItemText.includes(searchValue)) {
                menuItems[i].style.display = 'block';
            } else {
                menuItems[i].style.display = 'none';
            }
        }
    }