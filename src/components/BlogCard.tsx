interface BlogType {
  date: string;
  title: string;
  description: string;
}

const BlogCard = ({ blog }: { blog: BlogType }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="p-6">
        <time className="text-sm text-blue-600 font-medium">{blog.date}</time>
        <h3 className="text-xl font-bold text-gray-900 mt-3 mb-3 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-600 leading-relaxed line-clamp-3">
          {blog.description}
        </p>
        <button className="mt-4 text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2 group-hover:gap-3 transition-all">
          Read More
          <span>→</span>
        </button>
      </div>
    </article>
  );
};

export default BlogCard;
