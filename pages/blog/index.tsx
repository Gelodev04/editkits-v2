import React from 'react';

import Pagination from "@/components/Pagination";
import BlogCard from "@/components/cards/BlogCard";
import {useGetBlogsQuery} from "@/services/api";

export default function Blog() {
  // @ts-ignore
  const { data: blogs } = useGetBlogsQuery();
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="max-w-[1367px] mx-auto">
      <p
        className="font-montserrat font-bold text-[48px] leading-[64px] text-center text-[#2c2c2c] pt-[59px] pb-[27px]">Welcome
        to the Editkits Blog!</p>
      <p className="font-lato font-normal text-base leading-[24px] text-center text-[#4f4f4f] pb-[31px] w-[743px] mx-auto">Et
        proin tellus duis tristique mauris mi donec in et. Id vel interdum scelerisque sit. Imperdiet donec mi pretium
        mauris venenatis dui in. Quam vitae in ac cras adipiscing. Urna ultrices ut volutpat cursus pellentesque.</p>
      <div className="grid grid-cols-12 gap-[34px]">
        {/*@ts-ignore*/}
        {blogs?.map(blog => (
          <div className="col-span-4">
            <BlogCard slug={blog.slug} img={blog.thumbnail_url} title={blog.title} date={blog.created_at}/>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        //@ts-ignore
        totalPages={blogs?.length}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
