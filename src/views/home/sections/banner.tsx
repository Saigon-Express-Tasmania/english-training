import { enrolledStudents } from "@/assets/data/home";
import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";

export function Banner() {
  return (
    <section className="banner relative overflow-hidden py-80">
      <EduImage
        src={images.shape1}
        alt="Image"
        className="shape one animation-rotation"
      />{" "}
      <EduImage
        src={images.shape2}
        alt="Image"
        className="shape two animation-scalation"
      />{" "}
      <EduImage
        src={images.shape3}
        alt="Image"
        className="shape three animation-walking"
      />{" "}
      <EduImage
        src={images.shape4}
        alt="Image"
        className="shape four animation-scalation"
      />{" "}
      <EduImage
        src={images.shape5}
        alt="Image"
        className="shape five animation-walking"
      />
      <div className="container">
        <div className="row align-items-center gap-y-[3rem]">
          <div className="col-xl-6">
            <div className="banner-content pe-md-4">
              <div className="mb-16 flex items-center gap-8" data-aos="fade-down">
                <span className="bg-main-600 rounded-circle h-8 w-8"></span>
                <h5 className="text-main-600 mb-0">Your Future, Achieve Success</h5>
              </div>
              <h1 className="display2 wow bounceInLeft mb-24">
                Find Your{" "}
                <span
                  className="text-main-two-600 wow bounceInRight"
                  data-wow-duration="2s"
                  data-wow-delay=".5s"
                >
                  Ideal{" "}
                </span>
                Course, Build{" "}
                <span
                  className="text-main-600 wow bounceInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".5s"
                >
                  Skills
                </span>
              </h1>
              <p className="text-line-2 wow bounceInUp text-neutral-500">
                Welcome to EduAll, where learning knows no bounds. Whether
                you&apos;re a student, professional, or lifelong learner...
              </p>
              <div className="buttons-wrapper mt-40 !flex flex-wrap items-center gap-24">
                <a
                  href="course.html"
                  className="btn btn-main rounded-pill !flex items-center gap-8"
                  data-aos="fade-right"
                >
                  Browse Courses{" "}
                  <i className="ph-bold ph-arrow-up-right flex text-lg"></i>{" "}
                </a>
                <a
                  href="about.html"
                  className="btn btn-outline-main rounded-pill !flex items-center gap-8"
                  data-aos="fade-left"
                >
                  About Us{" "}
                  <i className="ph-bold ph-arrow-up-right flex text-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="banner-thumb relative">
              <EduImage
                src={images.bannerImg}
                alt="Image"
                className="banner-thumb__img rounded-12 wow bounceIn vanilla-tilt"
                data-wow-duration="3s"
                data-wow-delay=".5s"
                priority
              />{" "}
              <EduImage
                src={images.curveArrow}
                alt="Image"
                className="curve-arrow absolute"
              />
              <div
                className="banner-box one rounded-12 box-shadow-lg d-inline-block bg-white px-24 py-12 font-medium"
                data-aos="fade-down"
              >
                <span className="text-main-600">36k+</span> Enrolled Students
                <div className="enrolled-students mt-12">
                  {enrolledStudents.map((student, index) => (
                    <EduImage
                      key={index}
                      src={student}
                      alt="Image"
                      className="rounded-circle object-fit-cover transition-2 h-48 w-48"
                    />
                  ))}
                </div>
              </div>
              <div
                className="banner-box two rounded-12 box-shadow-lg !inline-flex items-center gap-16 bg-white px-24 py-12 font-medium"
                data-aos="fade-up"
              >
                <span className="banner-box__icon rounded-circle !flex h-48 w-48 flex-shrink-0 items-center justify-center bg-purple-400 text-2xl text-white">
                  <i className="ph ph-watch"></i>
                </span>
                <div>
                  <h6 className="mb-4">20% OFF</h6>
                  <span>For All Courses</span>
                </div>
              </div>
              <div
                className="banner-box three rounded-12 box-shadow-lg !inline-flex items-center gap-16 bg-white px-24 py-12 font-medium"
                data-aos="fade-left"
              >
                <span className="banner-box__icon bg-main-50 text-main-600 rounded-circle !flex h-48 w-48 flex-shrink-0 items-center justify-center text-2xl">
                  <i className="ph ph-phone-call"></i>
                </span>
                <div className="flex flex-col">
                  <span>Online Supports</span>{" "}
                  <a
                    href="tel:(704)555-0127"
                    className="text-main-600 hover-text-main-500 mt-8 block text-xl font-medium"
                  >
                    (704) 555-0127
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
