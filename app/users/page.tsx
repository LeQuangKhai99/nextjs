const UsersPage = async () => {
  const res = await fetch("http://localhost:8000/users", {
    method: 'GET',
  });

  const data = await res.json();
  console.log(data);
  

  return (
    <div>
      users page
    </div>
  )
}

export default UsersPage;