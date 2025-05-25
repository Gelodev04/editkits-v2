import React from 'react';

import Pagination from '@/components/Pagination';
import BlogCard from '@/components/cards/BlogCard';
import { useGetBlogsQuery } from '@/services/api/public';
import BlogLoading from '@/pages/blog/loading';

export default function Blog() {
  // @ts-ignore
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data: blogs } = useGetBlogsQuery(currentPage);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <BlogLoading />;
  }

  return (
    <div className="max-w-[1367px] mx-auto pb-[69px]">
      <h1 className="font-montserrat font-bold text-[48px] leading-[64px] text-center text-[#2c2c2c] dark:text-[#d5d7da] pt-[59px] pb-[27px]">
        EditKits Blog – Everything Media Processing
      </h1>
      <p className="font-lato font-normal text-base leading-[24px] text-center text-[#4f4f4f] dark:text-[#d5d7da] pb-[55px] px-2 max-w-[800px] mx-auto ">
        Stay ahead with the latest in cloud media processing! Explore expert tips, feature updates,
        and deep dives into video, image, and audio editing with EditKits. 🚀
      </p>
      <div className="flex flex-wrap justify-center gap-[34px] px-2">
        {/*@ts-ignore*/}
        {blogs?.map(blog => (
          <div className="col-span-4 ">
            <BlogCard
              slug={blog.slug}
              img={blog.thumbnail_url}
              title={blog.title}
              date={blog.created_at}
              category={blog.category}
            />
          </div>
        ))}
      </div>
      <div className="mt-6 pt-[62px]">
        <Pagination
          currentPage={currentPage}
          //@ts-ignore
          totalPages={Math.ceil(blogs?.length / 12)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
