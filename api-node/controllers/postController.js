const Post = require('../models/Post');
const multer = require('multer');

// Configuración de Multer para la subida de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// Subir publicación
const uploadPost = async (req, res) => {
    const { caption } = req.body;
    try {
        const post = new Post({
            user: req.user._id,
            imageUrl: req.file.path,
            caption
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener el feed
const getFeed = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'username profilePicture');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadPost, getFeed, upload };
