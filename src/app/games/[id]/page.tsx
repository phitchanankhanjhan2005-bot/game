import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { initialGames } from "../../data/games";

type GameDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getGame(id: string) {
  const gameId = Number(id);

  if (!Number.isInteger(gameId)) {
    return undefined;
  }

  return initialGames.find(
    (game) => game.id === gameId
  );
}

export async function generateMetadata({
  params,
}: GameDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const game = await getGame(id);

  if (!game) {
    return {
      title: "ไม่พบเกม",
    };
  }

  return {
    title: game.name,
  };
}

export default async function GameDetailPage({
  params,
}: GameDetailPageProps) {
  const { id } = await params;

  const game = await getGame(id);

  if (!game) {
    notFound();
  }

  return (
    <main>
      <h1>{game.name}</h1>

      <p>
        <strong>แพลตฟอร์ม:</strong>{" "}
        {game.platform}
      </p>

      <p>
        <strong>
          จำนวนชั่วโมงโดยประมาณ:
        </strong>{" "}
        {game.hours} ชั่วโมง
      </p>

      <p>
        <strong>สถานะ:</strong>{" "}
        {game.status}
      </p>

      <a href="/games">
        ← กลับไปหน้ารายการเกม
      </a>
    </main>
  );
}
