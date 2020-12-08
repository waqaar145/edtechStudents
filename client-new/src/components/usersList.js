const UsersList = ({ usersData }) => {
  return (
    <ul>
      {usersData &&
        usersData.map((user) => {
          return <li key={user.id}>{user.title}</li>;
        })}
    </ul>
  );
};

export default UsersList;
