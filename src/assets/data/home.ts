import type { StaticImageData } from "next/image";

import { images } from "@/assets/images";

export const categoryOptions = [
  "Categories",
  "Design",
  "Development",
  "Architecture",
  "Life Style",
  "Data Science",
  "Marketing",
  "Music",
  "Typography",
  "Finance",
  "Motivation",
] as const;

export type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type NavItem = {
  label: string;
  href?: string;
  active?: boolean;
  children?: NavLink[];
};

export const navItems: NavItem[] = [
  {
    label: "Home",
    active: true,
    children: [
      { label: "Home LMS", href: "index.html", active: true },
      { label: "Home Online Course", href: "index-2.html" },
      { label: "Home University", href: "index-3.html" },
      { label: "Home Tutor", href: "index-4.html" },
      { label: "Home Kindergarten", href: "index-5.html" },
      { label: "Home Kindergarten two", href: "index-6.html" },
    ],
  },
  {
    label: "Courses",
    children: [
      { label: "Course Grid View", href: "course.html" },
      { label: "Course List View", href: "course-list-view.html" },
      { label: "Course Details", href: "course-details.html" },
      { label: "Lesson Details", href: "lesson-details.html" },
    ],
  },
  {
    label: "Pages",
    children: [
      { label: "About", href: "about.html" },
      { label: "About Two", href: "about-two.html" },
      { label: "About Three", href: "about-three.html" },
      { label: "About Four", href: "about-four.html" },
      { label: "Pricing Plan", href: "pricing-plan.html" },
      { label: "Instructor", href: "instructor.html" },
      { label: "Instructor Two", href: "instructor-two.html" },
      { label: "Instructor Details", href: "instructor-details.html" },
      { label: "Premium Tutors", href: "tutor.html" },
      { label: "Premium Tutors Details", href: "tutor-details.html" },
      { label: "FAQ", href: "faq.html" },
      { label: "Tuition Jobs", href: "tuition-jobs.html" },
      { label: "Events", href: "events.html" },
      { label: "Event Details", href: "event-details.html" },
      { label: "Apply Admission", href: "apply-admission.html" },
      { label: "Gallery", href: "gallery.html" },
      { label: "Privacy Policy", href: "privacy-policy.html" },
      { label: "Favorite Course", href: "favorite-course.html" },
      { label: "Find Best Tutors", href: "find-tutors.html" },
      { label: "Book Online Class", href: "book-online-class.html" },
    ],
  },
  {
    label: "Dashboard",
    children: [
      { label: "Admin Dashbord", href: "admin-dashbord.html" },
      { label: "My Profile", href: "my-profile.html" },
      { label: "Message", href: "dashbord-message.html" },
      { label: "Courses", href: "dashbord-courses.html" },
      { label: "Wishlist", href: "dashbord-wishlist.html" },
      { label: "Reviews", href: "deshbord-reviews.html" },
      { label: "Quiz Attempts", href: "dashbord-quiz-attempts.html" },
      { label: "Settings", href: "dashbord-settings.html" },
      { label: "Student Admin Dashbord", href: "student-dashbord.html" },
      { label: "Student My Profile", href: "student-dashbord-my-profile.html" },
      { label: "Student Message", href: "student-dashbord-message.html" },
      {
        label: "Student Enrolled Courses",
        href: "student-dashbord-enrolled-courses.html",
      },
      { label: "Student Wishlist", href: "student-dashbord-wishlist.html" },
      { label: "Student Reviews", href: "student-dashbord-reviews.html" },
      {
        label: "Student My Quiz Attempts",
        href: "student-dashbord-my-quiz-attempts.html",
      },
      {
        label: "Student Assignment",
        href: "student-dashbord-assignment.html",
      },
      { label: "Student Settings", href: "student-dashbord-settings.html" },
      { label: "Instructor Dashbord", href: "instructor-dashboard.html" },
      {
        label: "Instructor My Profile",
        href: "instructor-dashboard-my-profile.html",
      },
      {
        label: "Instructor Message",
        href: "instructor-dashboard-message.html",
      },
      {
        label: "Instructor Enrolled Courses",
        href: "instructor-dashboard-enrolled-courses.html",
      },
      {
        label: "Instructor Wishlist",
        href: "instructor-dashboard-wishlist.html",
      },
      {
        label: "Instructor Reviews",
        href: "instructor-dashboard-reviews.html",
      },
      {
        label: "Instructor My Quiz Attempts",
        href: "instructor-dashboard-my-quiz-attempts.html",
      },
      {
        label: "Instructor Order History",
        href: "instructor-dashboard-order-history.html",
      },
      {
        label: "Instructor My Courses",
        href: "instructor-dashboard-my-courses.html",
      },
      {
        label: "Instructor Announcements",
        href: "instructor-dashboard-announcements.html",
      },
      {
        label: "Instructor Assignment",
        href: "instructor-dashboard-assignment.html",
      },
      {
        label: "Instructor Quiz Attempts",
        href: "instructor-dashboard-quiz-attempts.html",
      },
      {
        label: "Instructor Account Settings",
        href: "instructor-dashboard-account-settings.html",
      },
    ],
  },
  {
    label: "Product",
    children: [
      { label: "Product", href: "product.html" },
      { label: "Product Details", href: "product-details.html" },
      { label: "Cart", href: "cart.html" },
      { label: "Checkout", href: "checkout.html" },
    ],
  },
  {
    label: "Blog",
    children: [
      { label: "Blog Grid", href: "blog.html" },
      { label: "Blog List", href: "blog-list.html" },
      { label: "Blog Classic", href: "blog-classic.html" },
      { label: "Blog Details", href: "blog-details.html" },
    ],
  },
  { label: "Contact", href: "contact.html" },
];

export const brandLogos = [
  images.brandImg1,
  images.brandImg2,
  images.brandImg3,
  images.brandImg4,
  images.brandImg5,
  images.brandImg6,
  images.brandImg7,
  images.brandImg3,
];

export const enrolledStudents = [
  images.enrollStudentImg1,
  images.enrollStudentImg2,
  images.enrollStudentImg3,
  images.enrollStudentImg4,
  images.enrollStudentImg5,
  images.enrollStudentImg6,
];

export type FeatureItem = {
  icon: StaticImageData;
  title: string;
  description: string;
};

export const features: FeatureItem[] = [
  {
    icon: images.featureIcon1,
    title: "Language Learning",
    description:
      "Courses teaching languages such as English, Spanish, French, Mandarin etc",
  },
  {
    icon: images.featureIcon2,
    title: "Creative Arts & Design",
    description:
      "Courses on graphic design, digital art, photography, video editing",
  },
  {
    icon: images.featureIcon3,
    title: "Health & Fitness",
    description:
      "Courses on nutrition, fitness training, yoga, meditation, wellness coaching...",
  },
  {
    icon: images.featureIcon2,
    title: "Creative Arts & Design",
    description:
      "Courses on graphic design, digital art, photography, video editing",
  },
];

export const courseTabs = [
  { id: "pills-categories", label: "All Categories", icon: "ph-squares-four" },
  { id: "pills-design", label: "Design", icon: "ph-magic-wand" },
  { id: "pills-programming", label: "Programming", icon: "ph-code" },
  { id: "pills-webDesign", label: "web Design", icon: "ph-code" },
  { id: "pills-Academic", label: "Academic", icon: "ph-graduation-cap" },
  { id: "pills-marketing", label: "Marketing", icon: "ph-chart-pie-slice" },
] as const;

export type CourseItem = {
  image: StaticImageData;
  duration: string;
  title: string;
  lessons: string;
  level: string;
  rating: string;
  reviews: string;
  instructorImage: StaticImageData;
  instructor: string;
  price: string;
};

export const courses: CourseItem[] = [
  {
    image: images.courseImg1,
    duration: "9h 36m",
    title: "Introduction to Digital Marketing",
    lessons: "20 Lessons",
    level: "Beginner",
    rating: "4.7",
    reviews: "6.4k",
    instructorImage: images.userImg1,
    instructor: "AnikaZ",
    price: "$148",
  },
  {
    image: images.courseImg2,
    duration: "25h 06m",
    title: "Introduction to Python Programming",
    lessons: "20 Lessons",
    level: "Beginner",
    rating: "4.7",
    reviews: "6.4k",
    instructorImage: images.userImg2,
    instructor: "Wade",
    price: "$499",
  },
  {
    image: images.courseImg3,
    duration: "9h 36m",
    title: "Introduction to Photography Masterclass",
    lessons: "20 Lessons",
    level: "Beginner",
    rating: "4.7",
    reviews: "6.4k",
    instructorImage: images.userImg3,
    instructor: "Cody",
    price: "$457",
  },
  {
    image: images.courseImg4,
    duration: "9h 36m",
    title: "Spanish Language Mastery: Beginner to Fluent",
    lessons: "20 Lessons",
    level: "Beginner",
    rating: "4.7",
    reviews: "6.4k",
    instructorImage: images.userImg4,
    instructor: "Dustin",
    price: "$148",
  },
  {
    image: images.courseImg5,
    duration: "9h 36m",
    title: "Financial Planning for Millennials",
    lessons: "20 Lessons",
    level: "Beginner",
    rating: "4.7",
    reviews: "6.4k",
    instructorImage: images.userImg5,
    instructor: "Bruce",
    price: "$546",
  },
  {
    image: images.courseImg6,
    duration: "9h 36m",
    title: "Nutrition Essentials for Healthy Living",
    lessons: "20 Lessons",
    level: "Beginner",
    rating: "4.7",
    reviews: "6.4k",
    instructorImage: images.userImg6,
    instructor: "Robert",
    price: "$345",
  },
];

export const chooseUsPoints = [
  "9/10 Average Satisfaction Rate",
  "96% Completitation Rate",
  "Friendly Environment & Expert Teacher",
];

export const counters = [
  {
    icon: "ph-users",
    value: "2",
    suffix: " K",
    label: "Successfully Trained",
    variant: "main",
  },
  {
    icon: "ph-video-camera",
    value: "17",
    suffix: " K",
    label: "Courses Completed",
    variant: "main-two",
  },
  {
    icon: "ph-thumbs-up",
    value: "5",
    suffix: " K",
    label: "Satisfaction Rate",
    variant: "main",
  },
  {
    icon: "ph-users-three",
    value: "56",
    suffix: " K",
    label: "Students Community",
    variant: "main-two",
  },
] as const;

export type TestimonialItem = {
  image: StaticImageData;
  quote: string;
  name: string;
  role: string;
};

export const testimonials: TestimonialItem[] = [
  {
    image: images.testimonialImg1,
    quote:
      "\"Enrolling in courses at EduAll was one of the best decisions I've made for my career. The flexibility of the online learning platform allowed me to study at my own pace while balancing my work”",
    name: "Kathryn Murphy",
    role: "Software Developer",
  },
  {
    image: images.testimonialImg2,
    quote:
      "\"Signing up for courses at EduAll was quite possibly of the best choice I've made for my vocation. The adaptability of the internet learning stage permitted me to learn at my own speed while adjusting my work\"",
    name: "John Doe",
    role: "UX/UI Designer",
  },
];

export type BlogItem = {
  image: StaticImageData;
  tag: string;
  tagClass: string;
  title: string;
  author: string;
  date: string;
  comments: string;
  excerpt: string;
};

export const blogs: BlogItem[] = [
  {
    image: images.blogImg1,
    tag: "Student life",
    tagClass: "bg-main-two-600",
    title: "The Importance of Diversity in Higher Education",
    author: "Jeswal",
    date: "12 May, 24",
    comments: "24",
    excerpt:
      "Unlock the secrets to effective time management in the digital learning space...",
  },
  {
    image: images.blogImg2,
    tag: "Freedom",
    tagClass: "bg-success-600",
    title: "The Importance of Diversity in Higher Education",
    author: "Jeswal",
    date: "12 May, 24",
    comments: "24",
    excerpt:
      "Unlock the secrets to effective time management in the digital learning space...",
  },
  {
    image: images.blogImg3,
    tag: "Online",
    tagClass: "bg-main-two-600",
    title: "The Importance of Diversity in Higher Education",
    author: "Jeswal",
    date: "12 May, 24",
    comments: "24",
    excerpt:
      "Unlock the secrets to effective time management in the digital learning space...",
  },
];

export const footerNavigation = [
  { label: "About us", href: "about.html" },
  { label: "Courses", href: "courses.html" },
  { label: "Instructor", href: "instructor.html" },
  { label: "FAQs", href: "faq.html" },
  { label: "Blogs", href: "blog.html" },
];

export const footerCategories = [
  { label: "UI/UX Design", href: "courses.html" },
  { label: "Web Development", href: "courses.html" },
  { label: "Python Development", href: "courses.html" },
  { label: "Digital Marketing", href: "courses.html" },
  { label: "Graphic Design", href: "courses.html" },
];

export const socialLinks = [
  { href: "https://www.facebook.com", icon: "ph-facebook-logo" },
  { href: "https://www.twitter.com", icon: "ph-twitter-logo" },
  { href: "https://www.linkedin.com", icon: "ph-instagram-logo" },
  { href: "https://www.pinterest.com", icon: "ph-pinterest-logo" },
];
