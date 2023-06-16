import { prisma } from "@/lib/prisma";
import Drivers from "./Drivers/page";

export default async function Home() {
  const drivers = await prisma.driver.findMany();

  return (
    <main
      style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}
      className="h-screen"
    >
      <Drivers drivers={JSON.parse(JSON.stringify(drivers))} />
      {/* <div>
        <p>
          <Link href="/initial-data">Prefetching Using initial data</Link>
        </p>
        <p>
          <Link href="/hydration">Prefetching Using Hydration</Link>
        </p>
      </div> */}
    </main>
  );
}
