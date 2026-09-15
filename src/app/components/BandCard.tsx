"use client"

import Image from "next/image"
import type { Band } from "../types/band"

type BandCardProps = {
  // Props = ส่งข้อมูลจาก BandsPage ไป BandCard
  band: Band
  isFollowing: boolean
  likeCount: number
  onToggleFollow: (id: number) => void
  onToggleLike: (id: number) => void
}

export default function BandCard({
  band,
  isFollowing,
  likeCount,
  onToggleFollow,
  onToggleLike,
}: BandCardProps) {
  return (
    <div className="bandCard">
      <div className="bandImage">
        <Image
          src={band.image}
          alt={band.name}
          fill
          className="bandImageContent"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="bandInfo">
        <h2 className="bandName">
          {band.name}
        </h2>

        <p className="bandGenre">
          {band.genre}
        </p>

        <p className="bandDescription">
          {band.description}
        </p>

        <div className="bandActions">
          {/* onClick = ทำงานเมื่อกดปุ่ม */}
          <button
            type="button"
            className={`followButton ${
              isFollowing ? "following" : ""
            }`}
            onClick={() => onToggleFollow(band.id)}
          >
            {/* ? : = เช็กสถานะแล้วเปลี่ยนข้อความ */}
            {isFollowing ? "ยกเลิกติดตาม" : "ติดตาม"}
          </button>

          {/* ปุ่ม Like */}
          <button
            type="button"
            className="likeButton"
            onClick={() => onToggleLike(band.id)}
          >
            ♥ {likeCount}
          </button>
        </div>

        <h3 className="memberTitle">
          Members
        </h3>

        <div className="memberList">
          {/* map = วนข้อมูลสมาชิกทีละคน */}
          {band.members.map((member) => (
            <div
              key={member.id}
              className="memberCard"
            >
              <div className="memberImage">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="memberImageContent"
                  sizes="56px"
                />
              </div>

              <div className="memberInfo">
                <p className="memberName">
                  {member.name}
                </p>

                <p className="memberRole">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}