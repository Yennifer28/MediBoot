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

// Función para agregar un usuario
async function addUser(name, lastName, email, phone, notificationPreference) {
    try {
        const docRef = await db.collection("usuarios").add({
            nombre: name,
            apellido: lastName,
            email: email,
            telefono: phone,
            preferencia_notificacion: notificationPreference,
            creado_en: new Date(),
            actualizado_en: new Date()
        });
        console.log("Usuario agregado con ID: ", docRef.id);
        alert("Usuario agregado exitosamente!");
    } catch (e) {
        console.error("Error al agregar usuario: ", e);
        alert("Hubo un error al agregar el usuario.");
    }
}

// Event listener para el botón de añadir usuario
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded cargado.");

    const addButton = document.querySelector(".add-button");
    if (addButton) {
        addButton.addEventListener("click", () => {
            console.log("Botón de añadir presionado.");
            
            // Obtener los datos del nuevo usuario
            const name = prompt("Ingrese el nombre del usuario:");
            const lastName = prompt("Ingrese el apellido del usuario:");
            const email = prompt("Ingrese el email del usuario:");
            const phone = prompt("Ingrese el teléfono del usuario:");
            const notificationPreference = prompt("Ingrese la preferencia de notificación (email/sms/ambos):");

            // Verificar que se haya ingresado toda la información
            if (name && lastName && email && phone && notificationPreference) {
                addUser(name, lastName, email, phone, notificationPreference);
            } else {
                alert("Por favor, ingrese todos los datos.");
            }
        });
    } else {
        console.log("No se encontró el botón de añadir.");
    }
});
