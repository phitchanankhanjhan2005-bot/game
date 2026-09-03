import CoursesCard from "../../components/courseCard";
import { courses } from "../data/coursesdata";

export default function CoursesPage() {
  return (
    <main className="coursePage">
      <div className="courseContainer">

        <div className="courseHeader">
          <h1>📚 My Courses</h1>
          <p>รายวิชาที่กำลังศึกษา</p>
        </div>

        <div className="courseGrid">
          {courses.map((course, index) => (
            <CoursesCard
              key={course.id ?? index}
              course={course}
            />
          ))}
        </div>

      </div>
    </main>
  );
}