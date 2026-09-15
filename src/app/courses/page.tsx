import type { Metadata } from "next";

import CoursesCard from "../../components/courseCard";
import { courses } from "../data/coursesdata";
import CourseExplorer from "@/components/CourseExplorer";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};
export default function CoursesPage() {
  return (
    <>
      <CourseExplorer initialCourses={courses as any} />
      {/* <div className="courseGrid">
          {courses.map((course, index) => (
            <CoursesCard
              key={course.id ?? index}
              course={course}
            />
          ))}
        </div> */}
    </>
  );
}
