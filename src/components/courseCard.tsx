import Link from "next/link";
export type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      <div className="courseIcon">📚</div>

      <h2>{course.title}</h2>

      <p className="courseCode">รหัสวิชา: {course.code}</p>

      <p>หน่วยกิต: {course.credits} หน่วยกิต</p>

      <p
        className={course.isOpen ? "courseStatus open" : "courseStatus closed"}
      >
        {course.isOpen ? "● เปิดลงทะเบียน" : "● ปิดลงทะเบียน"}
      </p>
      <button
        type="button"
        onClick={() => onToggleFavorite(course.id)}
        className={`favorite-button ${isFavorite ? "favorite-active" : ""}`}
        aria-label={isFavorite ? "ลบออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
      >
        {isFavorite ? (
          <>
            <span>รายการโปรด</span> <span>♥</span>
          </>
        ) : (
          "♡"
        )}
      </button>
      <p>{course.code}</p> 
      <button type="button" onClick={onEdit}>แก้ไข</button> 
      <button type="button" onClick={onDelete}>ลบ</button>
    </article>
  );
}
