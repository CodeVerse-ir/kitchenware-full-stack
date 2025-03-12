import { axiosFetch } from "@/utils/axios_fetch";

// componets
import CardBlog from "./CardBlog";

interface BlogsBodyProps {
  page: string;
}

interface Blog {
  image: string;
  title: string;
  text: string;
  date: string;
}

const BlogsBody: React.FC<BlogsBodyProps> = async ({ page }) => {
  const blogs = await axiosFetch<Blog[]>({
    fetchType: "get",
    url: `blogs?${page}`,
  });
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {blogs &&
        blogs.map((blog, index) => {
          return <CardBlog key={index} blog={blog} />;
        })}
    </div>
  );
};

export default BlogsBody;
