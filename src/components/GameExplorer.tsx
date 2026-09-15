"use client";

// import type สำหรับจัดการ Event ของ input และ form
import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

// import Type และข้อมูลตั้งต้นจากไฟล์ games.ts
import type {
  Game,
  GameDraft,
  GameStatus,
} from "@/app/data/games";

import { initialGames } from "@/app/data/games";

// import CSS สำหรับตกแต่งหน้า Game Backlog
import "../app/games/games.css";

/*
 * ข้อมูลเริ่มต้นของฟอร์ม
 *
 * เราเก็บข้อมูลทุกช่องไว้ใน State ก้อนเดียว
 * เพื่อทำ Controlled Input
 */
const emptyDraft: GameDraft = {
  name: "",
  platform: "",
  hours: 0,
  status: "ยังไม่เริ่ม",
};

/*
 * Type สำหรับเก็บข้อความ Error
 *
 * Partial หมายความว่าแต่ละ field สามารถมีหรือไม่มี error ก็ได้
 */
type FormErrors = Partial<
  Record<keyof GameDraft, string>
>;

export default function GameExplorer() {
  /*
   * games = รายการเกมทั้งหมด
   *
   * เริ่มต้นด้วยข้อมูลจาก initialGames
   *
   * setGames = ฟังก์ชันสำหรับเพิ่ม แก้ไข หรือลบเกม
   */
  const [games, setGames] =
    useState<Game[]>(initialGames);

  /*
   * draft = ข้อมูลที่ผู้ใช้กำลังกรอกในฟอร์ม
   *
   * จุดนี้คือ Controlled Input
   * เพราะ input ทุกตัวจะใช้ค่าจาก draft
   */
  const [draft, setDraft] =
    useState<GameDraft>({
      ...emptyDraft,
    });

  /*
   * errors = เก็บข้อความ Error
   *
   * เช่น
   * {
   *   name: "กรุณาระบุชื่อเกม"
   * }
   */
  const [errors, setErrors] =
    useState<FormErrors>({});

  /*
   * editingId ใช้บอกว่าตอนนี้กำลังแก้ไขเกมไหน
   *
   * null = กำลังเพิ่มเกมใหม่
   * number = กำลังแก้ไขเกมที่มี id นั้น
   */
  const [editingId, setEditingId] =
    useState<number | null>(null);

  /*
   * handleChange
   *
   * ทำงานทุกครั้งที่ผู้ใช้เปลี่ยนค่าของ input
   *
   * เนื่องจาก input.value เป็น string เสมอ
   * เราจึงต้องแปลง hours ให้เป็น number
   */
  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    // ดึงชื่อ field และค่าที่ผู้ใช้กรอก
    const { name, value } = event.target;

    /*
     * อัปเดต draft
     *
     * ...prev หมายถึงเก็บค่าของ field อื่นเอาไว้
     *
     * ถ้า name เป็น hours
     * ให้แปลงจาก string เป็น number
     */
    setDraft((prev: GameDraft) => ({
      ...prev,

      [name]:
        name === "hours"
          ? value === ""
            ? 0
            : Number(value)
          : value,
    }));

    /*
     * เมื่อผู้ใช้กลับมาแก้ไข field
     * ให้ลบ Error ของ field นั้น
     */
    setErrors((prev: FormErrors) => ({
      ...prev,
      [name]: undefined,
    }));
  }

  /*
   * validate
   *
   * ฟังก์ชันตรวจสอบข้อมูลก่อนบันทึก
   *
   * โจทย์กำหนดว่า:
   * 1. ชื่อเกมต้องไม่ว่าง
   * 2. ต้องเลือกแพลตฟอร์ม
   * 3. จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก
   */
  function validate(
    value: GameDraft
  ): FormErrors {
    // สร้าง object สำหรับเก็บ Error
    const nextErrors: FormErrors = {};

    /*
     * ตรวจสอบชื่อเกม
     *
     * trim() ใช้ตัดช่องว่างด้านหน้าและด้านหลัง
     */
    if (value.name.trim() === "") {
      nextErrors.name =
        "กรุณาระบุชื่อเกม";
    }

    /*
     * ตรวจสอบ Platform
     *
     * ถ้าเป็น "" แสดงว่ายังไม่ได้เลือก
     */
    if (value.platform === "") {
      nextErrors.platform =
        "กรุณาเลือกแพลตฟอร์ม";
    }

    /*
     * ตรวจสอบจำนวนชั่วโมง
     *
     * Number.isInteger() ตรวจว่าเป็นจำนวนเต็ม
     * value.hours > 0 ตรวจว่าเป็นจำนวนบวก
     */
    if (
      !Number.isInteger(value.hours) ||
      value.hours <= 0
    ) {
      nextErrors.hours =
        "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }

    // ส่ง Error ทั้งหมดกลับไป
    return nextErrors;
  }

  /*
   * handleSubmit
   *
   * ทำงานเมื่อผู้ใช้กดปุ่มเพิ่มเกม / บันทึกการแก้ไข
   */
  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    // ป้องกันไม่ให้ browser refresh หน้า
    event.preventDefault();

    /*
     * เรียก validate เพื่อตรวจสอบข้อมูล
     */
    const nextErrors = validate(draft);

    /*
     * นำ Error ไปเก็บใน State
     */
    setErrors(nextErrors);

    /*
     * ถ้ามี Error อย่างน้อย 1 รายการ
     * ให้หยุดการทำงานและไม่บันทึกข้อมูล
     */
    if (
      Object.keys(nextErrors).length > 0
    ) {
      return;
    }

    /*
     * ตรวจสอบว่าเป็นการ "แก้ไข" หรือ "เพิ่ม"
     */
    if (editingId !== null) {
      /*
       * ==========================
       * กรณีแก้ไขเกม
       * ==========================
       *
       * map() ใช้สร้าง array ใหม่
       *
       * ถ้า id ตรงกับ editingId
       * ให้แทนที่ข้อมูลด้วยข้อมูลจาก draft
       */
      setGames((prev) =>
        prev.map((game) =>
          game.id === editingId
            ? {
                ...game,
                name: draft.name.trim(),
                platform: draft.platform,
                hours: Number(draft.hours),
                status: draft.status,
              }
            : game
        )
      );
    } else {
      /*
       * ==========================
       * กรณีเพิ่มเกมใหม่
       * ==========================
       */

      const newGame: Game = {
        /*
         * สร้าง id ใหม่
         *
         * Date.now() จะได้ตัวเลขตามเวลาปัจจุบัน
         */
        id: Date.now(),

        name: draft.name.trim(),

        platform: draft.platform,

        hours: Number(draft.hours),

        status: draft.status,
      };

      /*
       * เพิ่มเกมใหม่ต่อท้ายรายการเดิม
       *
       * ...prev = เกมเดิมทั้งหมด
       * newGame = เกมใหม่
       */
      setGames((prev) => [
        ...prev,
        newGame,
      ]);
    }

    /*
     * หลังจากบันทึกสำเร็จ
     * ให้ล้างข้อมูลในฟอร์ม
     */
    resetForm();
  }

  /*
   * handleEdit
   *
   * ทำงานเมื่อกดปุ่ม "แก้ไข"
   *
   * หน้าที่สำคัญคือ
   * นำข้อมูลเดิมของเกมกลับเข้าไปในฟอร์ม
   */
  function handleEdit(game: Game) {
    /*
     * บอกระบบว่ากำลังแก้ไขเกมนี้
     */
    setEditingId(game.id);

    /*
     * นำข้อมูลเดิมกลับเข้าฟอร์ม
     *
     * ทำให้ผู้ใช้เห็นข้อมูลเดิม
     * และสามารถแก้ไขได้
     */
    setDraft({
      name: game.name,
      platform: game.platform,
      hours: game.hours,
      status: game.status,
    });

    /*
     * ล้าง Error เก่า
     */
    setErrors({});

    /*
     * เลื่อนหน้าไปด้านบน
     * เพื่อให้ผู้ใช้เห็นฟอร์มแก้ไข
     */
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /*
   * handleDelete
   *
   * ทำงานเมื่อกดปุ่มลบ
   */
  function handleDelete(id: number) {
    /*
     * แสดงกล่องถามเพื่อป้องกันการลบโดยไม่ได้ตั้งใจ
     */
    const confirmed =
      window.confirm(
        "คุณต้องการลบเกมนี้หรือไม่?"
      );

    /*
     * ถ้าผู้ใช้กดยกเลิก
     * ไม่ต้องทำอะไร
     */
    if (!confirmed) {
      return;
    }

    /*
     * filter() จะสร้าง array ใหม่
     *
     * เก็บทุกเกมที่ id ไม่ตรงกับ id ที่ต้องการลบ
     */
    setGames((prev) =>
      prev.filter(
        (game) => game.id !== id
      )
    );

    /*
     * ถ้ากำลังแก้เกมที่ถูกลบอยู่
     * ให้ reset form ด้วย
     */
    if (editingId === id) {
      resetForm();
    }
  }

  /*
   * resetForm
   *
   * ใช้ล้างข้อมูลฟอร์ม
   * และกลับไปสู่โหมดเพิ่มเกม
   */
  function resetForm() {
    /*
     * ล้างข้อมูลทุก field
     */
    setDraft({
      ...emptyDraft,
    });

    /*
     * ล้าง Error
     */
    setErrors({});

    /*
     * null หมายถึงไม่ได้แก้ไขเกม
     * ดังนั้นฟอร์มจะกลับเป็นโหมดเพิ่มเกม
     */
    setEditingId(null);
  }

  /*
   * getStatusClass
   *
   * ใช้เลือก CSS class ตามสถานะของเกม
   *
   * เพื่อให้แต่ละสถานะมีสีแตกต่างกัน
   */
  function getStatusClass(
    status: GameStatus
  ) {
    switch (status) {
      case "กำลังเล่น":
        return "status status-playing";

      case "เล่นจบแล้ว":
        return "status status-finished";

      case "ยังไม่เริ่ม":
      default:
        return "status status-not-started";
    }
  }

  return (
    <main className="games-page">
      <div className="games-container">

        {/* =========================
            ส่วนหัวของหน้า
        ========================== */}
        <header className="games-header">
          <h1>
            🎮 Game Backlog
          </h1>

          <p>
            รายการเกมที่ตั้งใจจะเล่น
          </p>
        </header>

        {/* =========================
            Form เพิ่ม / แก้ไขเกม
        ========================== */}
        <form
          className="game-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2>
            {editingId !== null
              ? "✏️ แก้ไขเกม"
              : "➕ เพิ่มเกม"}
          </h2>

          <div className="form-grid">

            {/* =====================
                ชื่อเกม
            ====================== */}
            <div className="form-group full">
              <label htmlFor="name">
                ชื่อเกม
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="เช่น Minecraft"

                /*
                 * Controlled Input
                 *
                 * ค่าใน input มาจาก draft.name
                 */
                value={draft.name}

                /*
                 * เมื่อผู้ใช้พิมพ์
                 * จะเรียก handleChange
                 */
                onChange={handleChange}

                aria-invalid={
                  !!errors.name
                }

                aria-describedby={
                  errors.name
                    ? "name-error"
                    : undefined
                }
              />

              {/* แสดง Error ใต้ช่อง */}
              {errors.name && (
                <p
                  id="name-error"
                  className="form-error"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* =====================
                Platform
            ====================== */}
            <div className="form-group">
              <label htmlFor="platform">
                แพลตฟอร์ม
              </label>

              <select
                id="platform"
                name="platform"

                /*
                 * Controlled Select
                 */
                value={draft.platform}
                onChange={handleChange}

                aria-invalid={
                  !!errors.platform
                }

                aria-describedby={
                  errors.platform
                    ? "platform-error"
                    : undefined
                }
              >
                <option value="">
                  -- เลือกแพลตฟอร์ม --
                </option>

                <option value="PC">
                  PC
                </option>

                <option value="PlayStation 5">
                  PlayStation 5
                </option>

                <option value="Xbox Series X/S">
                  Xbox Series X/S
                </option>

                <option value="Nintendo Switch">
                  Nintendo Switch
                </option>
              </select>

              {/* แสดง Error ใต้ Platform */}
              {errors.platform && (
                <p
                  id="platform-error"
                  className="form-error"
                >
                  {errors.platform}
                </p>
              )}
            </div>

            {/* =====================
                จำนวนชั่วโมง
            ====================== */}
            <div className="form-group">
              <label htmlFor="hours">
                จำนวนชั่วโมง
              </label>

              <input
                id="hours"
                name="hours"
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                placeholder="เช่น 30"

                /*
                 * Controlled Input
                 */
                value={draft.hours}

                onChange={handleChange}

                aria-invalid={
                  !!errors.hours
                }

                aria-describedby={
                  errors.hours
                    ? "hours-error"
                    : undefined
                }
              />

              {/* แสดง Error ใต้ช่อง */}
              {errors.hours && (
                <p
                  id="hours-error"
                  className="form-error"
                >
                  {errors.hours}
                </p>
              )}
            </div>

            {/* =====================
                Status
            ====================== */}
            <div className="form-group">
              <label htmlFor="status">
                สถานะ
              </label>

              <select
                id="status"
                name="status"
                value={draft.status}
                onChange={handleChange}
              >
                <option value="ยังไม่เริ่ม">
                  ยังไม่เริ่ม
                </option>

                <option value="กำลังเล่น">
                  กำลังเล่น
                </option>

                <option value="เล่นจบแล้ว">
                  เล่นจบแล้ว
                </option>
              </select>
            </div>

          </div>

          {/* =========================
              ปุ่ม Form
          ========================== */}
          <div className="form-actions">

            <button
              type="submit"
              className="btn btn-primary"
            >
              {editingId !== null
                ? "บันทึกการแก้ไข"
                : "เพิ่มเกม"}
            </button>

            {/* แสดงปุ่มยกเลิกเฉพาะตอนแก้ไข */}
            {editingId !== null && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                ยกเลิก
              </button>
            )}

          </div>
        </form>

        {/* =========================
            รายการเกม
        ========================== */}
        <section>

          <div className="games-list-header">
            <h2>
              🎮 รายการเกม
            </h2>

            {/* แสดงจำนวนเกมทั้งหมด */}
            <span className="game-count">
              {games.length} เกม
            </span>
          </div>

          {/* ถ้าไม่มีเกม */}
          {games.length === 0 ? (
            <div className="empty-games">
              <p>
                ยังไม่มีเกมในรายการ
              </p>

              <p>
                ลองเพิ่มเกมที่อยากเล่นดูสิ!
              </p>
            </div>
          ) : (

            /*
             * map() ใช้แสดงเกมแต่ละรายการ
             */
            <ul className="games-list">

              {games.map((game) => (
                <li
                  className="game-card"
                  key={game.id}
                >

                  {/* ชื่อเกม */}
                  <h3>
                    {game.name}
                  </h3>

                  <div className="game-info">

                    <p>
                      <strong>
                        แพลตฟอร์ม:
                      </strong>{" "}
                      {game.platform}
                    </p>

                    <p>
                      <strong>
                        เวลาโดยประมาณ:
                      </strong>{" "}
                      {game.hours} ชั่วโมง
                    </p>

                    <p>
                      <strong>
                        สถานะ:
                      </strong>
                    </p>

                    {/* แสดงสถานะพร้อม CSS สีต่างกัน */}
                    <span
                      className={getStatusClass(
                        game.status
                      )}
                    >
                      {game.status}
                    </span>

                  </div>

                  {/* =====================
                      ปุ่มจัดการเกม
                  ====================== */}
                  <div className="game-actions">

                    {/* ไปหน้ารายละเอียด /games/[id] */}
                    <a
                      href={`/games/${game.id}`}
                      className="btn btn-link"
                    >
                      รายละเอียด
                    </a>

                    {/* แก้ไขเกม */}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        handleEdit(game)
                      }
                    >
                      แก้ไข
                    </button>

                    {/* ลบเกม */}
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>
                        handleDelete(game.id)
                      }
                    >
                      ลบ
                    </button>

                  </div>
                </li>
              ))}

            </ul>
          )}

        </section>

      </div>
    </main>
  );
}
