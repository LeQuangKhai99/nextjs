import Image from "next/image";

export default function Home() {
  async function create(formData: FormData) {
    'use server'
    console.log('form data', formData.get('username'));
    
  }

  return (
    <>
      <div>Home page</div>
      <div>
        <form action={create}>
          <input type="text" name="username" />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
}
