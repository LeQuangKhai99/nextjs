import UserTable from "../components/users/user.table";

const UsersPage = async (props: any) => {
  const LIMIT = 1;
  const page = props?.searchParams?.page ?? 1;

  const res: any = await fetch(`http://localhost:8000/users?page=${page}&limit=${LIMIT}`, {
    method: 'GET',
  });
  
  let data = await res.json();
  const total = data.total;
  data = data.data;

  return (
    <div>
      <UserTable 
        users={data || []}
        limit={LIMIT}
        page={page}
        total={total}
        />
    </div>
  )
}

export default UsersPage;