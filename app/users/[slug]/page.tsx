const DetailUserPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      slug = {params.slug}
    </div>
  )
}

export default DetailUserPage;