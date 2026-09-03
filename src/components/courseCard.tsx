export type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="courseCard">
      <div className="courseIcon">📚</div>

      <h2>{course.title}</h2>

      <p className="courseCode">
        รหัสวิชา: {course.code}
      </p>

      <p>
        หน่วยกิต: {course.credits} หน่วยกิต
      </p>

      <p className={course.isOpen ? "courseStatus open" : "courseStatus closed"}>
        {course.isOpen ? "● เปิดลงทะเบียน" : "● ปิดลงทะเบียน"}
      </p>
    </article>
  );
}