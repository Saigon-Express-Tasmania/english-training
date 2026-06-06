import type { StaticImageData } from "next/image";

import { images } from "@/assets/images";

export const lessonTitle = "Learn Python: From Beginner to Advanced";

export const lessonIntro =
  "Unlock the power of Python, one of the most versatile and in-demand programming languages today. This comprehensive course is designed for both beginners and experienced programmers looking to enhance their skills. Whether you're aiming to start a new career in software development, data analysis, or simply want to automate everyday tasks, this course will provide you with the skills and knowledge you need to succeed.";

export const whatYouWillLearn = [
  "Foundations of Python: Understand the basics of Python programming, including syntax, variables, and data types. Learn how to write, debug, and execute Python scripts.",
  "Data Structures and Algorithms: Master Python's built-in data structures such as lists, dictionaries, and sets. Implement algorithms for sorting, searching, and manipulating data efficiently.",
  "Object-Oriented Programming (OOP): Gain proficiency in OOP concepts like classes, objects, inheritance, and polymorphism, which are crucial for developing complex and modular programs.",
  "File Handling and I/O Operations: Learn how to read from and write to files, manage file directories, and handle exceptions for robust file operations.",
  "Libraries and Frameworks: Explore essential Python libraries such as NumPy, Pandas, Matplotlib, and Seaborn for data manipulation and visualization. Get an introduction to web frameworks like Flask and Django.",
  "Data Science and Machine Learning: Dive into data analysis and visualization. Use Scikit-learn for building and evaluating machine learning models.",
  "Project Development: Apply your skills in real-world scenarios with hands-on projects. Develop a comprehensive capstone project that showcases your mastery of Python.",
] as const;

export const whyChooseThisCourse = [
  "Expert Instruction: Learn from Dr. Jane Smith, an experienced software developer and educator, who brings real-world insights and practical knowledge to the classroom.",
  "Hands-On Learning: Engage in interactive exercises and projects that reinforce your learning and provide practical experience.",
  "Flexible Learning: Study at your own pace with lifetime access to all course materials, including video lectures, coding exercises, and downloadable resources.",
  "Comprehensive Curriculum: Cover all essential aspects of Python programming, from the basics to advanced topics, ensuring a well-rounded understanding of the language.",
  "Supportive Community: Benefit from a supportive learning environment with access to the course forum, where you can ask questions, share insights, and collaborate with fellow learners.",
] as const;

export const idealFor = [
  "Beginners with no prior programming experience looking to start a career in software development or data science.",
  "Intermediate programmers who want to deepen their understanding of Python and explore advanced topics.",
  "Professionals seeking to automate tasks, analyze data, or develop web applications using Python.",
] as const;

export const enrollToday = [
  "Take the first step towards mastering Python. Enroll now and start your journey to becoming a proficient Python programmer!",
] as const;

export const lessonOutro =
  "This detailed overview should give potential students a clear understanding of what they can expect from the course and the benefits of enrolling. Feel free to adjust any part of it to better fit your specific course offerings. Let me know if you need further customization or additional details!";

export const averageRating = {
  score: "4.8",
  ratingCount: "26 Rating",
  breakdown: [
    { star: "5", percent: 90 },
    { star: "5", percent: 75 },
    { star: "5", percent: 67 },
    { star: "5", percent: 44 },
    { star: "5", percent: 21 },
  ],
} as const;

export const sortOptions = [
  { value: "1", label: "Newest" },
  { value: "2", label: "Trending" },
  { value: "3", label: "Popular" },
] as const;

export type ReviewItem = {
  quote: string;
  name: string;
  role: string;
  image: StaticImageData;
  likes: string;
  showReplyInput?: boolean;
  replyAvatar?: StaticImageData;
};

export const reviews: ReviewItem[] = [
  {
    quote:
      "\"This course was fantastic! The instructor's explanations were clear and concise, making it easy to understand even the more complex topics.\"",
    name: "Mary Johnson",
    role: "Project Manager",
    image: images.reviewerImg1,
    likes: "178",
    showReplyInput: true,
    replyAvatar: images.reviewerImg2,
  },
  {
    quote:
      "\"Great course for beginners and advanced learners alike. The projects were particularly helpful in applying what I learned. Highly recommend!\"",
    name: "Alice Brown",
    role: "Software Developer",
    image: images.reviewerImg2,
    likes: "178",
  },
  {
    quote:
      "\"Dr. Smith is an amazing instructor. Her real-world experience and teaching style made this course one of the best I've ever taken.\"",
    name: "David Wilson",
    role: "Ethical Hacker",
    image: images.reviewerImg3,
    likes: "178",
  },
];

export const curriculumLessons = [
  "What is Python?",
  "Setting up your Python environment",
  "Writing your first Python program",
  "Understanding Python syntax and structure",
] as const;

export const curriculumSections = [
  { id: "collapseOneTwo", title: "Introduction to Python", defaultOpen: true },
  { id: "collapseTwoTwo", title: "Core Python Programming", defaultOpen: false },
  { id: "collapseThreeTwo", title: "Data Structures", defaultOpen: false },
  { id: "collapseFourTwo", title: "Advanced Python Concepts", defaultOpen: false },
  { id: "collapseFiveTwo", title: "Working with Libraries", defaultOpen: false },
  { id: "collapseSixTwo", title: "Project and Capstone", defaultOpen: false },
] as const;
