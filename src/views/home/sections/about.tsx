import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";

export function About() {
  return (
    <section className="about mash-bg-main mash-bg-main-two relative z-1 py-120">
      <EduImage
        src={images.shape2}
        alt="Image"
        className="shape one animation-scalation"
      />{" "}
      <EduImage
        src={images.shape6}
        alt="Image"
        className="shape four animation-scalation"
      />
      <div className="relative">
        <div className="container">
          <div className="row align-items-center flex-wrap-reverse gap-y-[3rem] xl:gap-y-0">
            <div className="col-xl-6">
              <div className="about-thumbs pe-lg-5 relative">
                <EduImage
                  src={images.shape7}
                  alt="Image"
                  className="shape seven animation-scalation"
                />
                <div className="offer-message rounded-12 bg-main-two-50 border-neutral-30 animation-upDown !inline-flex items-center gap-16 border px-24 py-12 font-medium">
                  <span className="bg-main-two-600 rounded-circle !flex h-48 w-48 flex-shrink-0 items-center justify-center text-2xl text-white">
                    <i className="ph ph-watch"></i>
                  </span>
                  <div>
                    <h6 className="mb-4">20% OFF</h6>
                    <span className="text-neutral-500">For All Courses</span>
                  </div>
                </div>
                <div className="row gap-y-[1.5rem]">
                  <div className="col-sm-6">
                    <EduImage
                      src={images.aboutImg1}
                      alt="Image"
                      className="rounded-12 vanilla-tilt w-100"
                    />
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-24 flex items-center gap-24">
                      <div
                        className="bg-main-600 rounded-12 w-50-percent px-2 py-24 text-center"
                        data-aos="fade-right"
                      >
                        <h1 className="mb-0 text-white">
                          <span className="counter">16</span> +
                        </h1>
                        <span className="text-white">Years of experience</span>
                      </div>
                      <div
                        className="rounded-12 w-50-percent bg-neutral-700 px-2 py-24 text-center"
                        data-aos="fade-left"
                      >
                        <h1 className="mb-0 text-white">
                          <span className="counter">55</span> +
                        </h1>
                        <span className="text-white">Years of experience</span>
                      </div>
                    </div>
                    <EduImage
                      src={images.aboutImg2}
                      alt="Image"
                      className="rounded-12 vanilla-tilt w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="about-content">
                <div className="mb-40">
                  <div className="wow bounceInDown mb-16 flex items-center gap-8">
                    <span className="bg-main-600 rounded-circle h-8 w-8"></span>
                    <h5 className="text-main-600 mb-0">About EduAll</h5>
                  </div>
                  <h2 className="wow bounceIn mb-24">
                    The Place Where You Can Achieve
                  </h2>
                  <p className="text-line-2 wow bounceInUp text-neutral-500">
                    Welcome to EduAll, where learning knows no bounds. Whether
                    you&apos;re a student, professional, or lifelong learner...
                  </p>
                </div>
                <div
                  className="align-items-start mb-32 flex items-center gap-28"
                  data-aos="fade-left"
                  data-aos-duration="200"
                >
                  <span className="bg-main-25 border-neutral-30 rounded-circle !flex h-80 w-80 flex-shrink-0 items-center justify-center border">
                    <EduImage src={images.aboutIcon1} alt="Image" />
                  </span>
                  <div className="flex-grow-1">
                    <h4 className="mb-12 text-neutral-500">Our Mission</h4>
                    <p className="text-neutral-500">
                      Driven by a team of dedicated educators, technologists,
                      and visionaries, we strive to create a supportive
                    </p>
                  </div>
                </div>
                <div
                  className="align-items-start mb-0 flex items-center gap-28"
                  data-aos="fade-left"
                  data-aos-duration="400"
                >
                  <span className="bg-main-25 border-neutral-30 rounded-circle !flex h-80 w-80 flex-shrink-0 items-center justify-center border">
                    <EduImage src={images.aboutIcon2} alt="Image" />
                  </span>
                  <div className="flex-grow-1">
                    <h4 className="mb-12 text-neutral-500">Our Vision</h4>
                    <p className="text-neutral-500">
                      A professional seeking to upskill, or a lifelong learner
                      exploring new horizons, we&apos;re here to accompany you
                      every step of the way.
                    </p>
                  </div>
                </div>
                <div
                  className="border-top mt-40 flex flex-wrap items-center gap-32 border-0 border-dashed border-neutral-50 pt-40"
                  data-aos="fade-left"
                  data-aos-duration="600"
                >
                  <a
                    href="course.html"
                    className="btn btn-main rounded-pill !flex items-center gap-8"
                  >
                    Read More{" "}
                    <i className="ph-bold ph-arrow-up-right flex text-lg"></i>
                  </a>
                  <div className="flex items-center gap-20">
                    <EduImage
                      src={images.ceoImg}
                      alt="Image"
                      className="rounded-circle object-fit-cover h-52 w-52 flex-shrink-0"
                    />
                    <div className="flex-grow-1">
                      <span className="mb-4">
                        <EduImage src={images.signature} alt="Image" />{" "}
                      </span>
                      <span className="block text-sm">CEO Of Company</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
