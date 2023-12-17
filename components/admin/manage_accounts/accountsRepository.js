const db = require("../../../db/index");

exports.getAllUsers = async (role) => {
  const result = await db.connection.execute(
    "select * from accounts where role=?", [role]
  );

  return result[0].length > 0 ? result[0] : null;
};

exports.getAllClasses = async () => {
  const result = await db.connection.execute(
    "select * from class"
  );

  return result[0].length > 0 ? result[0] : null;
};

exports.updateUser = async (id, fullname, birthday) => {
  const result = await db.connection.execute(
    "update accounts set fullname=?,birthday=? where id=?",
    [fullname, birthday, id]
  );
  return result[0];
};

exports.banUser = async (email, active, sociallogin) => {
  const result = await db.connection.execute(
    "update accounts set email=?,active=?, sociallogin=? where email=?",
    [email, active, sociallogin, email]
  );
  return result[0];
};

exports.activeClass = async (id, value) => {
  const result = await db.connection.execute(
    "update class set active=? where id=?",
    [value, id]
  );
  return result[0];
};

exports.getStudentIds = async () => {
  const result = await db.connection.execute(
    "select * from studentId", []
  );

  return result[0].length > 0 ? result[0] : null;
};

exports.mapStudentId = async (id, userId) => {
  const result = await db.connection.execute(
    "update studentId set iduser=? where id=?", [userId, id]
  );
  console.log(result)
  return result[0];
};

exports.mapListStudentId = async (listUserIds) => {
  try {
    const results = [];
    for (let i = 0; i < listUserIds.length; i++) {
      const iduser = listUserIds[i].iduser;
      const id = listUserIds[i].id;
      
      const result = await db.connection.execute(
        "UPDATE studentId SET iduser=? WHERE id=?", [iduser, id]
      );

      results.push(result[0]);
    }
    return results[0].length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Lỗi trong quá trình cập nhật:', error.message);
    return null;
  }
};

