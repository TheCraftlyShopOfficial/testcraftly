import CategoriesGrid from "@/components/Categories";
import { GetAllCategoryQuery } from "@/query/querys";

function page() {
  return (
    <>
      <CategoriesGrid query={GetAllCategoryQuery} />
    </>
  );
}

export default page;
