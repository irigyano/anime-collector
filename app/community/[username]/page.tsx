import prisma from "@/lib/prisma";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const user = await prisma.user.findUnique({ where: { username: `${params.username}` } });

  console.log(user);

  if (!user) {
    return <div>no user found</div>;
  }

  return (
    <>
      <div>{user.username}</div>
      <div>{user.avatar}</div>
    </>
  );
};
export default UserPage;
