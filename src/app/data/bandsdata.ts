import { Band } from "../types/band"

export const bands: Band[] = [
  {
    id: 1,
    name: "TATTOO COLOUR",
    genre: "Pop / Alternative",
    description:
      "วงดนตรีไทยที่มีเอกลักษณ์ด้านดนตรีและเพลงที่มีความสนุกสนาน",
    image: "/images/tattoo-colour.jpg",

    members: [
      {
        id: 1,
        name: "หรินทร์ สุธรรมจรัส",
        role: "ร้องนำ /ร้องประสาน",
        image: "/images/tattoo-member1.jpg",
      },
      {
        id: 2,
        name: "รัฐ พิฆาตไพรี",
        role: "ร้องนำ / กีตาร์ /ร้องประสาน",
        image: "/images/tattoo-member2.jpg",
      },
      {
        id: 3,
        name: "ธนบดี ธีรพงศ์ภักดี",
        role: "เบส / ร้องประสาน",
        image: "/images/tattoo-member3.jpg",
      },
      {
        id: 4,
        name: "เอกชัย โชติรุ่งโรจน์",
        role: "กลอง / ร้องประสาน",
        image: "/images/tattoo-member4.jpg",
      },
    ],
  },

  {
    id: 2,
    name: "POLYCAT",
    genre: "Synth Pop",
    description:
      "วงดนตรีไทยแนว Synth Pop ที่มีเอกลักษณ์จากเสียงดนตรีแบบย้อนยุค",
    image: "/images/polycat.jpg",

    members: [
      {
        id: 1,
        name: "นะ รัตน จันทร์ประสิทธิ์",
        role: "ร้องนำ / กีตาร์ /ซินธิไซเซอร์",
        image: "/images/polycat-member1.jpg",
      },
      {
        id: 2,
        name: "เพียว วาตานาเบะ",
        role: "เบส / ซินธิไซเซอร์",
        image: "/images/polycat-member2.jpg",
      },
      {
        id: 3,
        name: "โต้ง พลากร",
        role: "คีย์บอร์ด / ทรัมเป็ต / ซินธิไซเซอร์",
        image: "/images/polycat-member3.jpg",
      },
    ],
  },

    {
    id: 3,
    name: "wave to earth",
    genre: "Indie Rock / Jazz",
    description:
        "วงดนตรีจากเกาหลีใต้ที่มีเอกลักษณ์จากเสียงดนตรีแนว Indie Rock ผสม Jazz และบรรยากาศที่ฟังสบาย",
    image: "/images/wave-to-earth.jpg",

    members: [
        {
        id: 1,
        name: "Daniel Kim",
        role: "ร้องนำ / กีตาร์",
        image: "/images/wave-member1.jpg",
        },
        {
        id: 2,
        name: "John Cha",
        role: "เบส",
        image: "/images/wave-member2.jpg",
        },
        {
        id: 3,
        name: "Donggyu Shin",
        role: "กลอง",
        image: "/images/wave-member3.jpg",
        },
    ],
    },
]
