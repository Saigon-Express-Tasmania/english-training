import { blogs } from "@/assets/data/home";
import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";

export function Blog() {
  return (
    <section className="blog mash-bg-main mash-bg-main-two relative py-120">
      <EduImage
        src={images.shape2}
        alt="Image"
        className="shape two animation-scalation"
      />{" "}
      <EduImage
        src={images.shape6}
        alt="Image"
        className="shape four animation-scalation"
      />
      <div className="container">
        <div className="section-heading text-center">
          <h2 className="wow bounceIn mb-24">Recent Articles</h2>
          <p className="wow bounceInUp">
            Consectetur adipisicing elit, sed do eiusmod tempor inc idid unt ut
            labore et dolore magna aliqua enim ad...
          </p>
        </div>
        <div className="row gap-y-[1.5rem]">
          {blogs.map((blog, index) => (
            <div
              key={`${blog.tag}-${index}`}
              className="col-lg-4 col-sm-6"
              data-aos="fade-up"
              data-aos-duration={200 + index * 200}
            >
              <div className="blog-item scale-hover-item bg-main-25 rounded-16 border-neutral-30 h-100 border p-12">
                <div className="rounded-12 relative overflow-hidden leading-none">
                  <a
                    href="blog-details.html"
                    className="rounded-12 h-100 w-100 overflow-hidden"
                  >
                    <EduImage
                      src={blog.image}
                      alt="Blog Image"
                      className="scale-hover-item__img rounded-12 cover-img transition-2"
                    />
                  </a>
                </div>
                <div className="p-24 pt-32">
                  <div>
                    <span
                      className={`${blog.tagClass} rounded-8 mb-20 inline-block px-20 py-8 font-medium text-white`}
                    >
                      {blog.tag}
                    </span>
                    <h4 className="mb-28">
                      <a href="blog-details.html" className="link text-line-2">
                        {blog.title}
                      </a>
                    </h4>
                    <div className="my-20 flex flex-wrap items-center gap-14">
                      <div className="flex items-center gap-8">
                        <span className="flex text-2xl text-neutral-500">
                          <i className="ph ph-user-circle"></i>{" "}
                        </span>
                        <span className="text-lg text-neutral-500">
                          {blog.author}
                        </span>
                      </div>
                      <span className="rounded-circle h-8 w-8 bg-neutral-100"></span>
                      <div className="flex items-center gap-8">
                        <span className="flex text-2xl text-neutral-500">
                          <i className="ph ph-calendar-dot"></i>{" "}
                        </span>
                        <span className="text-lg text-neutral-500">
                          {blog.date}
                        </span>
                      </div>
                      <span className="rounded-circle h-8 w-8 bg-neutral-100"></span>
                      <div className="flex items-center gap-8">
                        <span className="flex text-2xl text-neutral-500">
                          <i className="ph ph-chat-dots"></i>{" "}
                        </span>
                        <span className="text-lg text-neutral-500">
                          {blog.comments}
                        </span>
                      </div>
                    </div>
                    <p className="text-line-2 text-neutral-500">{blog.excerpt}</p>
                  </div>
                  <div className="border-top mt-28 border-0 border-dashed border-neutral-50 pt-24">
                    <a
                      href="blog-details.html"
                      className="text-main-600 hover-text-decoration-underline transition-1 fw-semibold flex items-center gap-8"
                      tabIndex={0}
                    >
                      Read More <i className="ph ph-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
