export interface Blog {
  date: string;
  title: string;
  description: string;
}

type BlogListProps = {
  blogs: Blog[];
};

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogs.map((b, i) => (
        <div key={i} className="border-b pb-4">
          <p className="text-sm text-gray-500">{b.date}</p>
          <h2 className="text-xl font-semibold">{b.title}</h2>
          <p className="text-gray-600">{b.description}</p>
          <button className="text-blue-600 mt-2">Read full post</button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
