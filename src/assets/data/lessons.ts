import { images } from "@/assets/images";
import type { CourseItem } from "@/assets/data/home";

export type FilterCategory = {
  id: string;
  label: string;
  count: number;
};

export const filterCategories: FilterCategory[] = [
  { id: "3254", label: "Health and Wellness Courses", count: 3254 },
  { id: "1522", label: "Language Courses", count: 1522 },
  { id: "2545", label: "Computer and Technology", count: 2545 },
  { id: "3215", label: "HealthWellnessCourses", count: 3215 },
  { id: "5526", label: "Business and Finance Courses", count: 5526 },
  { id: "1563", label: "Academic Courses", count: 1563 },
  { id: "4154", label: "Art and Creative Courses", count: 4154 },
  { id: "categories1", label: "HealthWellnessCourses", count: 3215 },
  { id: "4146", label: "Professional Development", count: 4146 },
  { id: "4955", label: "Science and Engineering", count: 4955 },
];

export type StarFilter = {
  id: string;
  stars: number;
  count: number;
};

export const starFilters: StarFilter[] = [
  { id: "star5", stars: 5, count: 122 },
  { id: "star4", stars: 4, count: 356 },
  { id: "star3", stars: 3, count: 356 },
  { id: "star2", stars: 2, count: 213 },
  { id: "star1s", stars: 1, count: 10 },
];

export const popularTags = [
  "UI/UX Design",
  "Web Development",
  "Wordpress",
  "Machine Learning",
  "AI",
  "Laravel",
  "Python",
] as const;

export const levelFilters = [
  { id: "AllLevels", label: "All Levels" },
  { id: "Beginner", label: "Beginner" },
  { id: "Intermediate", label: "Intermediate" },
  { id: "Expert", label: "Expert" },
] as const;

export const sortOptions = [
  { value: "1", label: "Newest" },
  { value: "2", label: "Trending" },
  { value: "3", label: "Popular" },
] as const;

export const listCourses: CourseItem[] = [
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
  {
    image: images.courseImg7,
    duration: "9h 36m",
    title: "Nutrition Essentials for Healthy Living",
    lessons: "20 Lessons",
    level: "Beginner",
    rating: "4.7",
    reviews: "6.4k",
    instructorImage: images.userImg2,
    instructor: "Robert",
    price: "$345",
  },
  {
    image: images.courseImg9,
    duration: "9h 36m",
    title: "Nutrition Essentials for Healthy Living",
    lessons: "20 Lessons",
    level: "Beginner",
    rating: "4.7",
    reviews: "6.4k",
    instructorImage: images.userImg3,
    instructor: "Robert",
    price: "$345",
  },
  {
    image: images.courseImg8,
    duration: "9h 36m",
    title: "Nutrition Essentials for Healthy Living",
    lessons: "20 Lessons",
    level: "Beginner",
    rating: "4.7",
    reviews: "6.4k",
    instructorImage: images.userImg1,
    instructor: "Robert",
    price: "$345",
  },
];

export const paginationItems = [
  { type: "prev" as const, href: "index.html", label: null },
  { type: "page" as const, href: "index.html", label: "1" },
  { type: "page" as const, href: "index.html", label: "2" },
  { type: "page" as const, href: "index.html", label: "3" },
  { type: "ellipsis" as const, href: "index.html", label: "..." },
  { type: "next" as const, href: "index.html", label: null },
];
