// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDgD24OIJa0q_fPUQRVEpdWy2kLqfvn8rE",
    authDomain: "mediboot-d6d85.firebaseapp.com",
    projectId: "mediboot-d6d85",
    storageBucket: "mediboot-d6d85.firebasestorage.app",
    messagingSenderId: "636585030532",
    appId: "1:636585030532:web:b0f30147a45d9c03a563d1",
    measurementId: "G-WGGS5W549Z"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función para mostrar el formulario de registro de nuevo usuario
function showAddUserForm() {
    console.log("Mostrar formulario");
    const form = document.querySelector('.edit-user-form');
    form.style.display = "block"; // Mostrar el formulario
}

// Función para ocultar el formulario
function hideAddUserForm() {
    console.log("Ocultar formulario");
    const form = document.querySelector('.edit-user-form');
    form.style.display = "none"; // Ocultar el formulario
}

// Event listener para el botón de añadir usuario
document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded");
    const addButton = document.getElementById("add-new-user-btn");

    if (addButton) {
        console.log("Botón encontrado");
        addButton.addEventListener("click", () => {
            console.log("Botón 'Añadir Nuevo' clickeado");
            showAddUserForm();
        });
    }

    const cancelButton = document.getElementById("cancel-btn");
    if (cancelButton) {
        console.log("Botón Cancelar encontrado");
        cancelButton.addEventListener("click", () => {
            console.log("Botón 'Cancelar' clickeado");
            hideAddUserForm();
        });
    }

    loadUsers(); // Cargar usuarios al inicio
});

// Función para cargar usuarios de Firebase
async function loadUsers() {
    const tableBody = document.getElementById("user-table-body");
    const snapshot = await db.collection("usuarios").get();
    snapshot.forEach((doc) => {
        const user = doc.data();
        const row = document.createElement("tr");
        row.dataset.id = doc.id;
        row.innerHTML = `
            <td>
                <button class="edit-button">Editar</button>
                <button class="delete-button">Eliminar</button>
            </td>
            <td>${doc.id}</td>
            <td>${user.nombre}</td>
            <td>${user.actualizado_en.toDate().toLocaleDateString()}</td>
        `;
        tableBody.appendChild(row);

        row.querySelector(".edit-button").addEventListener("click", () => showEditForm(doc.id, user));
    });
}
