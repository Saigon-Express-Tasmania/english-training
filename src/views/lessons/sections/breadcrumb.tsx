import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";

export function Breadcrumb() {
  return (
    <section className="breadcrumb bg-main-25 relative z-1 mb-0 overflow-hidden py-120">
      <EduImage
        src={images.shape1}
        alt="Image"
        className="shape one animation-rotation hidden md:block"
      />
      <EduImage
        src={images.shape2}
        alt="Image"
        className="shape two animation-scalation hidden md:block"
      />
      <EduImage
        src={images.shape3}
        alt="Image"
        className="shape eight animation-walking hidden md:block"
      />
      <EduImage
        src={images.shape5}
        alt="Image"
        className="shape six animation-walking hidden md:block"
      />
      <EduImage
        src={images.shape4}
        alt="Image"
        className="shape four animation-scalation"
      />
      <EduImage
        src={images.shape4}
        alt="Image"
        className="shape nine animation-scalation"
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="breadcrumb__wrapper">
              <h1 className="breadcrumb__title display-4 fw-semibold text-center">
                Courses List View
              </h1>
              <ul className="breadcrumb__list align-items-center justify-content-center flex gap-4">
                <li className="breadcrumb__item">
                  <a
                    href="index.html"
                    className="breadcrumb__link hover-text-main-600 font-medium text-neutral-500"
                  >
                    <i className="ph-bold ph-house inline-flex text-lg"></i> Home
                  </a>
                </li>
                <li className="breadcrumb__item">
                  <i className="ph-bold ph-caret-right flex text-neutral-500"></i>
                </li>
                <li className="breadcrumb__item">
                  <a
                    href="course.html"
                    className="breadcrumb__link hover-text-main-600 font-medium text-neutral-500"
                  >
                    Courses
                  </a>
                </li>
                <li className="breadcrumb__item">
                  <i className="ph-bold ph-caret-right flex text-neutral-500"></i>
                </li>
                <li className="breadcrumb__item">
                  <span className="text-main-two-600">List View</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
