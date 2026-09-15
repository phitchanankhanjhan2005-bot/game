/*
 * Type ของสถานะเกม
 *
 * กำหนดให้สถานะสามารถมีได้แค่ 3 ค่า
 */
export type GameStatus =
  | "ยังไม่เริ่ม"
  | "กำลังเล่น"
  | "เล่นจบแล้ว";

/*
 * Type ของข้อมูลเกม
 *
 * ใช้สำหรับข้อมูลเกมที่บันทึกอยู่ในรายการ
 */
export type Game = {
  id: number;
  name: string;
  platform: string;
  hours: number;
  status: GameStatus;
};

/*
 * Type สำหรับข้อมูลที่กรอกใน Form
 *
 * ยังไม่มี id เพราะ id จะถูกสร้างตอนเพิ่มเกม
 */
export type GameDraft = {
  name: string;
  platform: string;
  hours: number;
  status: GameStatus;
};

/*
 * ข้อมูลเกมตั้งต้น
 *
 * โจทย์กำหนดให้มีอย่างน้อย 5 รายการ
 */
export const initialGames: Game[] = [
  {
    id: 1,
    name: "Hogwarts Legacy",
    platform: "PC",
    hours: 35,
    status: "ยังไม่เริ่ม",
  },

  {
    id: 2,
    name: "Minecraft",
    platform: "PC",
    hours: 50,
    status: "กำลังเล่น",
  },

  {
    id: 3,
    name: "Red Dead Redemption 2",
    platform: "PlayStation 5",
    hours: 50,
    status: "ยังไม่เริ่ม",
  },

  {
    id: 4,
    name: "Elden Ring",
    platform: "PC",
    hours: 80,
    status: "กำลังเล่น",
  },

  {
    id: 5,
    name: "Grand Theft Auto V",
    platform: "PC",
    hours: 35,
    status: "เล่นจบแล้ว",
  },
];
