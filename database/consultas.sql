-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS inteligencia_consulta_medicamentos;
USE inteligencia_consulta_medicamentos;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    preferencia_notificacion ENUM('email', 'sms', 'ambos') NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla Medicamentos
CREATE TABLE Medicamentos (
    id_medicamento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    sintomas VARCHAR(50) NOT NULL, -- Almacena la lista de síntomas en formato JSON
    dosis_recomendada VARCHAR(100),
    efectos_secundarios VARCHAR(50) NOT NULL, -- Almacena los efectos secundarios en formato JSON
    restricciones VARCHAR(50) NOT NULL, -- Almacena las restricciones de uso en formato JSON
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Subtabla Recetas en Usuarios
CREATE TABLE Recetas (
    id_receta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT, -- Llave foránea que referencia a Usuarios
    id_medicamento INT, -- Llave foránea que referencia a Medicamentos
    frecuencia VARCHAR(50),
    duracion_dias INT,
    fecha_inicio DATE,
    fecha_fin DATE GENERATED ALWAYS AS (DATE_ADD(fecha_inicio, INTERVAL duracion_dias DAY)) VIRTUAL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_medicamento) REFERENCES Medicamentos(id_medicamento) ON DELETE CASCADE
);

-- Subtabla Notificaciones en Recetas
CREATE TABLE Notificaciones (
    id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
    
    id_receta INT, -- Llave foránea que referencia a Recetas
    fecha_programada TIMESTAMP,
    estado ENUM('pendiente', 'enviada', 'fallida') NOT NULL,
    medio ENUM('email', 'sms') NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_receta) REFERENCES Recetas(id_receta) ON DELETE CASCADE
);

-- Tabla Interacciones (opcional)
CREATE TABLE Interacciones (
    id_interaccion INT AUTO_INCREMENT PRIMARY KEY,
    medicamento1 INT, -- Llave foránea que referencia a Medicamentos
    medicamento2 INT, -- Llave foránea que referencia a Medicamentos
    descripcion TEXT,
    FOREIGN KEY (medicamento1) REFERENCES Medicamentos(id_medicamento) ON DELETE CASCADE,
    FOREIGN KEY (medicamento2) REFERENCES Medicamentos(id_medicamento) ON DELETE CASCADE
);
