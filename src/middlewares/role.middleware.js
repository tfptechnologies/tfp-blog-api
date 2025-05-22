const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: No user ID.", error: "Forbidden" });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message: "User not found.",
            error: "Forbidden",
          });
      }

      if (!allowedRoles.includes(user.role)) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Access denied. Insufficient role.",
            error: "Forbidden",
          });
      }

      next();
    } catch (err) {
      console.error("Role check error:", err);
      return res.status(500).json({ success: false, message: "Internal server error.", error: "Internal Server Error" });
    }
  };
};


// module.exports = function roleCheck(roles = []) {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json(
//         { 
//             success: false,
//             message: "Forbidden: Permissions Denied!",
//             error: "Forbidden"
//          });
//     }
//     next();
//   };
// };


// //      
// // 
// // 