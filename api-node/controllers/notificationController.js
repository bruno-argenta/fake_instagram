const User = require("../models/User");

/**
 * Agrega una notificación a un usuario
 * @param {string} userId - ID del usuario que recibirá la notificación
 * @param {Object} notification - Objeto con los detalles de la notificación
 */
const addNotification = async (userId, notification) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    user.notifications.push(notification);
    await user.save();
  } catch (error) {
    console.error("Error al agregar la notificación:", error.message);
  }
};

const getNotifications = async (userId) => {
  try {
    const user = await User.findById(userId)
      .select("notifications")
      .populate("notifications.fromUserId", "username profilePicture")
      .populate("notifications.postId", "imageUrl");

    if (!user) throw new Error("Usuario no encontrado");

    return user.notifications;
  } catch (error) {
    console.error("Error al obtener las notificaciones:", error.message);
    throw error;
  }
};

module.exports = {
  addNotification,
  getNotifications,
};
