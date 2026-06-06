import {
  footerCategories,
  footerNavigation,
  socialLinks,
} from "@/assets/data/home";
import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";

export function Footer() {
  return (
    <footer className="footer bg-main-25 relative z-1">
      <EduImage
        src={images.shape2}
        alt="Image"
        className="shape five animation-scalation"
      />{" "}
      <EduImage
        src={images.shape6}
        alt="Image"
        className="shape one animation-scalation"
      />
      <div className="py-120">
        <div className="container-two container">
          <div className="row row-cols-xxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gap-y-[3rem]">
            <div className="col" data-aos="fade-up" data-aos-duration="300">
              <div className="footer-item">
                <div className="footer-item__logo">
                  <a href="index.html">
                    <EduImage src={images.logo} alt="Image" />
                  </a>
                </div>
                <p className="mt-[25px] mb-32">
                  EduAll exceeded all my expectations! The instructors were not
                  only experts
                </p>
                <ul className="social-list !flex items-center gap-24">
                  {socialLinks.map((link) => (
                    <li key={link.href} className="social-list__item">
                      <a
                        href={link.href}
                        className="text-main-600 hover-text-main-two-600 text-2xl"
                      >
                        <i className={`ph-bold ${link.icon}`}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col" data-aos="fade-up" data-aos-duration="400">
              <div className="footer-item">
                <h4 className="footer-item__title mb-32">Navigation</h4>
                <ul className="footer-menu">
                  {footerNavigation.map((item, index) => (
                    <li
                      key={item.label}
                      className={index === footerNavigation.length - 1 ? "mb-0" : "mb-16"}
                    >
                      <a
                        href={item.href}
                        className="hover-text-main-600 hover-text-decoration-underline text-neutral-500"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col" data-aos="fade-up" data-aos-duration="600">
              <div className="footer-item">
                <h4 className="footer-item__title mb-32">Category</h4>
                <ul className="footer-menu">
                  {footerCategories.map((item) => (
                    <li key={item.label} className="mb-16">
                      <a
                        href={item.href}
                        className="hover-text-main-600 hover-text-decoration-underline text-neutral-500"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col" data-aos="fade-up" data-aos-duration="800">
              <div className="footer-item">
                <h4 className="footer-item__title mb-32">Contact Us</h4>
                <div className="mb-24 flex items-center gap-20">
                  <span className="icon text-32 text-main-600 flex">
                    <i className="ph ph-phone"></i>
                  </span>
                  <div>
                    <a
                      href="tel:(207)555-0119"
                      className="hover-text-main-600 mb-4 block text-neutral-500"
                    >
                      (207) 555-0119{" "}
                    </a>
                    <a
                      href="tel:(704)555-0127"
                      className="hover-text-main-600 mb-0 block text-neutral-500"
                    >
                      (704) 555-0127
                    </a>
                  </div>
                </div>
                <div className="mb-24 flex items-center gap-20">
                  <span className="icon text-32 text-main-600 flex">
                    <i className="ph ph-envelope-open"></i>
                  </span>
                  <div>
                    <a
                      href="mailto:dwallo@gmail.com"
                      className="hover-text-main-600 mb-4 block text-neutral-500"
                    >
                      dwallo@gmail.com{" "}
                    </a>
                    <a
                      href="mailto:eduAll@gmail.com"
                      className="hover-text-main-600 mb-0 block text-neutral-500"
                    >
                      eduAll@gmail.com
                    </a>
                  </div>
                </div>
                <div className="mb-24 flex items-center gap-20">
                  <span className="icon text-32 text-main-600 flex">
                    <i className="ph ph-map-trifold"></i>
                  </span>
                  <div>
                    <span className="mb-4 block text-neutral-500">
                      5488 srker Rd .{" "}
                    </span>
                    <span className="mb-0 block text-neutral-500">
                      8745 doer Dr.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col" data-aos="fade-up" data-aos-duration="1000">
              <div className="footer-item">
                <h4 className="footer-item__title mb-32">Subscribe Here</h4>
                <p className="text-neutral-500">
                  Enter your email address to register to our newsletter
                  subscription
                </p>
                <form action="#" className="relative mt-24">
                  <input
                    type="email"
                    className="form-control border-neutral-30 rounded-pill focus-border-main-600 h-52 border bg-white ps-24 pe-48 shadow-none"
                    placeholder="Email..."
                  />{" "}
                  <button
                    type="submit"
                    className="rounded-circle bg-main-600 hover-bg-main-800 translate-middle-y inset-inline-end-0 absolute top-50 me-8 !flex h-36 w-36 items-center justify-center text-white"
                  >
                    <i className="ph ph-paper-plane-tilt"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="bottom-footer bg-main-25 border-top border-main-100 border-0 border-dashed py-32">
          <div className="container-two container">
            <div className="bottom-footer__inner !flex flex-wrap items-center justify-between gap-3">
              <p className="bottom-footer__text">
                Copyright &copy;{" "}
                <span id="copyrightYear">{new Date().getFullYear()}</span>{" "}
                <a href="index.html" className="text-main-600 font-medium">
                  EduAll{" "}
                </a>
                . All Rights Reserved.
              </p>
              <div className="footer-links">
                <a
                  href="privacy-policy.html"
                  className="hover-text-main-600 hover-text-decoration-underline text-neutral-500"
                >
                  Privacy Policy{" "}
                </a>
                <a
                  href="privacy-policy.html"
                  className="hover-text-main-600 hover-text-decoration-underline text-neutral-500"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
