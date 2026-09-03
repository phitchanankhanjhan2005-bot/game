export default function HomePage() {
  const siteName: string = "Student Course Hub";
  const courseCount: number = 3;
  const isOpen: boolean = true;

  const topics: string[] = [
    "HTML",
    "CSS",
    "TypeScript",
    "Next.js",
  ];

  type Course = {
    id: number;
    code: string;
    title: string;
    credits: number;
    isOpen: boolean;
  };

  const courses: Course[] = [
    {
      id: 1,
      code: "10301231",
      title: "Web Technology",
      credits: 3,
      isOpen: true,
    },
    {
      id: 2,
      code: "10301232",
      title: "Database Systems",
      credits: 3,
      isOpen: false,
    },
    {
      id: 3,
      code: "10301233",
      title: "Software Engineering",
      credits: 3,
      isOpen: true,
    },
  ];

  return (
    <main className="page">
      <h1>{siteName}</h1>

      <p>จำนวนรายวิชา: {courseCount}</p>

      <p>
        สถานะระบบ: {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}
      </p>

      <ul>
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>

      <div className="courseGrid">
        {courses.map((course, index) => (
          <article className="courseCard" key={course.id}>
            <h2>
              {index + 1}. {course.title}
            </h2>

            <p>รหัสวิชา: {course.code}</p>

            <p>{course.credits} หน่วยกิต</p>

            <p
              className={
                course.isOpen
                  ? "courseStatus open"
                  : "courseStatus closed"
              }
            >
              {course.isOpen
                ? "เปิดลงทะเบียน"
                : "ปิดลงทะเบียน"}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}