const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Configurar CORS para permitir peticiones desde tu frontend
app.use(cors());

// Configurar el almacenamiento de archivos con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); // Ajusta la ruta completa aquí
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar la carga de archivos
app.post('/upload', upload.single('imagen'), (req, res) => {
    // Aquí se forma la ruta correcta para devolverla al cliente
    const filePath = `/uploads/${req.file.filename}`; // Asegúrate de que esta ruta sea correcta
    res.json({ filePath });
});

// Ruta para servir los archivos cargados
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta para servir el archivo HTML principal (opcional si está en 'public')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
