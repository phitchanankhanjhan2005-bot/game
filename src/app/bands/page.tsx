import BandCard from "../components/BandCard"
import { bands } from "../data/bandsdata"

export default function BandsPage() {
  return (
    <main className="bandPage">

      <div className="bandContainer">

        {/* Header */}
        <div className="bandHeader">
          <h1>🎵 Favorite Bands</h1>

          <p>
            วงดนตรีที่ฉันชื่นชอบ
          </p>
        </div>

        {/* Bands */}
        <div className="bandGrid">
          {bands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
            />
          ))}
        </div>

      </div>

    </main>
  )
}