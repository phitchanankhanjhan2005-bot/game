import Image from "next/image"
import { Band } from "../types/band"

type BandCardProps = {
  band: Band
}

export default function BandCard({ band }: BandCardProps) {
  return (
    <div className="bandCard">

      {/* รูปวง */}
      <div className="bandImage">
        <Image
          src={band.image}
          alt={band.name}
          fill
          className="bandImageContent"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* ข้อมูลวง */}
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

        {/* สมาชิก */}
        <h3 className="memberTitle">
          Members
        </h3>

        <div className="memberList">
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