import { courses } from "../../data/coursesdata";
import { notFound } from "next/navigation";
type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  // เติม: เมธอดของ Array ที่คืนสมาชิกตัวแรกที่ผ่านเงื่อนไข
  const course = courses.find(
    (item: (typeof courses)[number]) => item.id === id,
  ) as (typeof courses)[number] | undefined;
  if (!course) {
    notFound();
  }

  return <h1>{course?.name ?? "Course not found"}</h1>;
}
