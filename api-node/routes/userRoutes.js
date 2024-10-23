const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/user/profile/{id}:
 *   get:
 *     summary: Obtener el perfil de un usuario dado su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 5f8d04a1b54764421b7156de
 *                 username:
 *                   type: string
 *                   example: "john_doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 profileImage:
 *                   type: string
 *                   example: "https://example.com/profile/john_doe.jpg"
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/profile/:id", protect, getUserProfile);

// /api/user/all:
//   get:
//     summary: Obtener todos los usuarios
//     tags: [Usuarios]
//     responses:
//       200:
//         description: Usuarios obtenidos correctamente
//         content:
//           application/json:
//             schema:
//               type: array
//               items:
//                 type: object
//                 properties:
//                   _id:
//                     type: string
//                     example: 5f8d04a1b54764421b7156de
//                   username:
//                     type: string
//                     example: "john_doe"
//                   email:
//                     type: string
//                     example: "john@example.com"
//                   profileImage:
//                     type: string
//                     example: "https://example.com/profile/john_doe.jpg"
//       500:
//         description: Error del servidor
router.get("/all", protect, getAllUsers);

module.exports = router;
