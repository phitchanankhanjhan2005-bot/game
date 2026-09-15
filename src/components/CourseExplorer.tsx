"use client";

import { useState, type ChangeEvent } from "react";
import CourseCard from "./courseCard";
import CourseForm, { type CourseDraft as CourseFormDraft } from "./CourseForm";

type Course = {
  id: number;
  name: string;
  code: string;
  credits: number;
  title: string;
};

export type CourseDraft = CourseFormDraft;

// กำหนดค่าเริ่มต้นของ CourseDraft
const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: 0,
  instructor: "",
};

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({
  initialCourses,
}: CourseExplorerProps) {
  // เติม: ชื่อ Props ที่รับข้อมูลตั้งต้นมาจาก Server Component
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: Math.max(...courses.map((course) => course.id), 0) + 1,
      code: draft.code.trim(),
      name: draft.name.trim(),
      credits: Number(draft.credit),
      title: draft.name.trim(),
    };

    setCourses([...courses, newCourse]);
  }

  function handleToggleFavorite(id: number) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id],
    );
  }

  function handleDelete(id: number) {
    // เติม: เมธอดของ Array ที่คืนเฉพาะสมาชิกที่ผ่านเงื่อนไข
    setCourses(courses.filter((course) => course.id !== id));
  }

  function handleUpdate(id: number, draft: CourseDraft) {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credits: Number(draft.credit),
            }
          : course,
      ),
    );

    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }

    handleUpdate(editingId, draft);
  }

  const editingCourse = courses.find((course) => course.id === editingId);

  const searchText = keyword.trim().toLowerCase();

  const visibleCourses = courses.filter(
    (course) =>
      (course.name ?? "").toLowerCase().includes(searchText) ||
      (course.code ?? "").toLowerCase().includes(searchText),
  );

  return (
    <div>
      <input
        type="search"
        aria-label="ค้นหารายวิชา"
        value={keyword}
        onChange={handleKeywordChange}
        placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
      />

      {visibleCourses.length === 0 ? (
        <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={{ ...course, isOpen: false }}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
              onEdit={() => setEditingId(course.id)}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </section>
      )}
      <CourseForm
        key={editingId ?? "new"}
        initialCourse={
          editingCourse
            ? {
                code: editingCourse.code,
                name: editingCourse.name,
                credit: editingCourse.credits,
                instructor: "",
              }
            : undefined
        }
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />
    </div>
  );
}
