const currentUserFormate = (user) => {
  return {
    user_id: user.uid,
    user_uuid: user.uuid,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
  };
};

module.exports = {
  currentUserFormate
}