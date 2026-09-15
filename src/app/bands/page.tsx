"use client"

import { useState } from "react"
import BandCard from "../components/BandCard"
import { bands } from "../data/bandsdata"

export default function BandsPage() {
  // useState = เก็บค่าที่มีการเปลี่ยนแปลง
  const [searchText, setSearchText] = useState("")

  // เก็บ ID ของวงที่ติดตาม
  const [followingBands, setFollowingBands] = useState<number[]>([])

  // เก็บจำนวน Like ของแต่ละวง
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(() => {
    const initialCounts: Record<number, number> = {}

    // forEach = วนดูข้อมูลทีละตัว
    bands.forEach((band) => {
      initialCounts[band.id] = 0
    })

    return initialCounts
  })

  // ฟังก์ชันติดตาม / ยกเลิกติดตาม
  const handleToggleFollow = (id: number) => {
    setFollowingBands((current) => {
      // includes = เช็กว่ามี ID อยู่ใน Array หรือไม่
      if (current.includes(id)) {
        // filter = เอา ID ออกจาก Array
        return current.filter((bandId) => bandId !== id)
      }

      // ...current = เอาข้อมูลเดิมมาทั้งหมดแล้วเพิ่มข้อมูลใหม่
      return [...current, id]
    })
  }

  // ฟังก์ชันเพิ่ม Like
  const handleToggleLike = (id: number) => {
    setLikeCounts((current) => ({
      ...current,
      [id]: (current[id] ?? 0) + 1,
    }))
  }

  // filter = กรองข้อมูลตามคำค้นหา
const filteredBands = bands.filter((band) => {
  const search = searchText.toLowerCase()

  // ค้นหาจากชื่อวงหรือรายละเอียดวง
  return (
    band.name.toLowerCase().includes(search) ||
    band.description.toLowerCase().includes(search)
  )
})

  // ล้างคำค้นหา
  const handleClearSearch = () => {
    setSearchText("")
  }

  return (
    <main className="bandPage">
      <div className="bandContainer">
        <div className="bandHeader">
          <h1>🎵 Favorite Bands</h1>
          <p>วงดนตรีที่ฉันชื่นชอบ</p>
        </div>

        {/* Controlled Input */}
        <div className="bandSearch">
          <input
            type="text"
            placeholder="ค้นหาชื่อวงดนตรีหรือรายละเอียด..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {searchText && (
            <button
              type="button"
              onClick={handleClearSearch}
            >
              ล้าง
            </button>
          )}
        </div>

        {/* length = นับจำนวน */}
        <div className="followCount">
          ติดตามอยู่ {followingBands.length} วง
        </div>

        {filteredBands.length > 0 ? (
          // map = วนข้อมูลเพื่อสร้าง Card
          <div className="bandGrid">
            {filteredBands.map((band) => (
              <BandCard
                key={band.id}
                band={band}
                isFollowing={followingBands.includes(band.id)}
                likeCount={likeCounts[band.id] ?? 0}
                onToggleFollow={handleToggleFollow}
                onToggleLike={handleToggleLike}
              />
            ))}
          </div>
        ) : (
          // Empty State = แสดงเมื่อไม่พบข้อมูล
          <div className="emptyState">
            <h2>ไม่พบวงดนตรี</h2>

            <p>
              ไม่พบวงดนตรีที่ตรงกับ "{searchText}"
            </p>

            <button
              type="button"
              onClick={handleClearSearch}
            >
              แสดงวงดนตรีทั้งหมด
            </button>
          </div>
        )}
      </div>
    </main>
  )
}