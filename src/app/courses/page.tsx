import CoursesCard from "../../components/courseCard";
import { courses } from "../data/coursesdata";
export default function CoursesPage() {
  return (
    <>
      <div className="p-4">
        {courses.map((course, index) => (
            <CoursesCard key={course.id ?? index} course={course} />
        ))}
      </div>
    </>
  );
}