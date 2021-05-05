const opReturnFormate = (data, process, errorMessage) => {
  return {
    data: data,
    process: process,
    ...(errorMessage !== '' && { errorMessage }),
  };
};

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
  opReturnFormate,
  currentUserFormate,
};
