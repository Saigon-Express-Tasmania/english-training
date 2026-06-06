import { chooseUsPoints, enrolledStudents } from "@/assets/data/home";
import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";

export function ChooseUs() {
  return (
    <section className="choose-us mash-bg-main mash-bg-main-two relative z-1 pt-120">
      <EduImage
        src={images.shape2}
        alt="Image"
        className="shape one animation-scalation"
      />{" "}
      <EduImage
        src={images.shape2}
        alt="Image"
        className="shape six animation-scalation"
      />
      <div className="container">
        <div className="row gap-y-[1.5rem]">
          <div className="col-xl-6">
            <div className="choose-us__content">
              <div className="mb-40">
                <div className="wow bounceInDown mb-16 flex items-center gap-8">
                  <span className="bg-main-600 rounded-circle h-8 w-8"></span>
                  <h5 className="text-main-600 mb-0">Why Choose Us</h5>
                </div>
                <h2 className="wow bounceIn mb-24">
                  Our Commitment to Excellence, Learn, Grow & Success.
                </h2>
                <p className="text-line-2 wow bounceInUp text-neutral-500">
                  We are passionate about transforming lives through education.
                  Founded with a vision to make learning accessible to all, we
                  believe in the power of knowledge to unlock opportunities and
                  shape the future.
                </p>
              </div>
              <ul>
                {chooseUsPoints.map((point, index) => (
                  <li
                    key={point}
                    className="mb-16 flex items-center gap-12"
                    data-aos="fade-up-left"
                    data-aos-duration={200 + index * 200}
                  >
                    <span className="text-main-600 flex flex-shrink-0 text-xl">
                      <i className="ph-bold ph-checks"></i>{" "}
                    </span>
                    <span className="flex-grow-1 text-neutral-500">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="border-top mt-28 border-0 border-dashed border-neutral-50 pt-24">
                <a
                  href="about.html"
                  className="btn btn-main rounded-pill !inline-flex items-center gap-8"
                >
                  Read More{" "}
                  <i className="ph-bold ph-arrow-up-right flex text-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="choose-us__thumbs relative">
              <div className="offer-message style-two rounded-12 box-shadow-lg animation-upDown !inline-flex items-center gap-16 bg-white px-24 py-12 font-medium">
                <span className="bg-dark-yellow rounded-circle !flex h-48 w-48 flex-shrink-0 items-center justify-center text-2xl text-white">
                  <EduImage src={images.starsIcon} alt="Image" />
                </span>
                <div>
                  <span className="block text-lg text-neutral-700">
                    4.6 <span className="text-neutral-100">(2.4k)</span>{" "}
                  </span>
                  <span className="text-neutral-500">AVG Reviews</span>
                </div>
              </div>
              <div
                className="banner-box one style-two rounded-12 box-shadow-lg d-inline-block bg-white px-24 py-12 font-medium"
                data-aos="fade-left"
              >
                <span className="text-main-600">36k+</span> Enrolled Students
                <div className="enrolled-students mt-12">
                  {enrolledStudents.map((student, index) => (
                    <EduImage
                      key={index}
                      src={student}
                      alt="Image"
                      className="rounded-circle object-fit-cover h-48 w-48"
                    />
                  ))}
                </div>
              </div>
              <div className="text-end" data-aos="zoom-out">
                <div className="d-sm-inline-block relative block">
                  <EduImage
                    src={images.chooseUsImg1}
                    alt="Image"
                    className="choose-us__img rounded-12 vanilla-tilt"
                  />{" "}
                  <span className="shadow-main-two bg-main-two-600 rounded-circle inset-block-start-0 inset-inline-start-0 ms--40 animation-upDown absolute mt-40 !flex h-80 w-80 items-center justify-center">
                    <EduImage src={images.bookIcon} alt="Image" />
                  </span>
                </div>
              </div>
              <div className="animation-video" data-aos="zoom-in">
                <EduImage
                  src={images.chooseUsImg2}
                  alt="Image"
                  className="rounded-circle vanilla-tilt border border-3 border-white"
                />{" "}
                <a
                  href="https://www.youtube.com/watch?v=MFLVmAE4cqg"
                  className="play-button bg-main-600 rounded-circle translate-middle absolute start-50 top-50 !flex h-48 w-48 items-center justify-center text-xl text-white"
                >
                  <i className="ph-fill ph-play"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
