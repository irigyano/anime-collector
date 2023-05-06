import { User } from "@prisma/client";
import getCurrentUser from "../../actions/getCurrentUser";

type SearchPageLayoutProp = {
  children: React.ReactNode;
  params: { currentUser: User | null };
};

export const metadata = {
  title: "搜尋作品 | Banngumi View | Annict.com",
};

const SearchPageLayout = async ({ children, params }: SearchPageLayoutProp) => {
  const currentUser = await getCurrentUser();
  params.currentUser = currentUser;

  return <> {children}</>;
};
export default SearchPageLayout;