import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";

export function Certificate() {
  return (
    <div className="certificate">
      <div className="container--lg container">
        <div className="certificate-box bg-main-600 rounded-16 px-16">
          <div className="container">
            <div className="relative py-80">
              <div className="row align-items-center">
                <div className="col-xl-6">
                  <div className="certificate__content">
                    <div className="wow bounceInDown mb-16 flex items-center gap-8">
                      <span className="rounded-circle h-8 w-8 bg-white"></span>
                      <h5 className="mb-0 text-white">Get Certificate</h5>
                    </div>
                    <h2 className="wow bounceIn mb-40 font-medium text-white">
                      Get Quality Skills Certificate From the EduAll
                    </h2>
                    <a
                      href="sign-up.html"
                      className="btn btn-white rounded-pill hover-bg-main-800 wow bounceInUp !inline-flex items-center gap-8"
                    >
                      Get Started Now{" "}
                      <i className="ph-bold ph-arrow-up-right flex text-lg"></i>
                    </a>
                  </div>
                </div>
                <div className="col-xl-6 hidden xl:block">
                  <div className="certificate__thumb" data-aos="fade-up-left">
                    <EduImage
                      src={images.certificateImg}
                      className="vanilla-tilt"
                      alt="Image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
