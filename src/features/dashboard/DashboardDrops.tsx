import { use, useEffect } from "react";
import DropCard from "../../DropCard";
import type { IDrop } from "../../types/types";
import { Card, CardContent } from "../../components/ui/card";
import { useDropStore } from "../../store/drop.store";

type Props = {
  getDropsData: Promise<{ data : IDrop[] }>;
};

const DashboardDrops = ({ getDropsData }: Props) => {
  const {data: dropsData} = use(getDropsData)

  const drops = useDropStore(state => state.drops) || []
  const setDrops = useDropStore(state => state.setDrops) || []

  console.log({dropsData})
  
  useEffect(() => {
    setDrops(dropsData)
  }, [dropsData])

  return (
    <main className="min-h-screen bg-background p-6">
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sneaker Drops</h1>
        <div className="text-sm text-muted-foreground">User: {"userId".substring(0, 12)}...</div>
      </div>
      {drops.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No merch drops available.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drops.map((drop: IDrop) => (
            <DropCard
              key={drop.id}
              drop={drop}
            />
          ))}
        </div>
      )}
    </div>
  </main>
  );
};

export default DashboardDrops;