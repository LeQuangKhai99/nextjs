import { revalidateTag } from "next/cache";
import UserTable from "../components/users/user.table";

const UsersPage = async (props: any) => {
  const LIMIT = 1;
  const page = props?.searchParams?.page ?? 1;

  async function create(formData: FormData) {
    'use server'
    console.log('form data', formData.get('username'));
    
    const rawResponse = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: formData.get('username'),
        email: formData.get('email'),
      })
    });
    const content = await rawResponse.json();
    revalidateTag('list-user');
    return content;
  }

  const res: any = await fetch(`http://localhost:8000/users?page=${page}&limit=${LIMIT}`, {
    method: 'GET',
    next: {tags: ['list-user']}
  });
  
  let data = await res.json();
  const total = data.total;
  data = data.data;

  return (
    <div>
      <form action={create}>
        <input type="text" name="username" />
        <input type="email" name="email" />
        <button type="submit">submit</button>
      </form>
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