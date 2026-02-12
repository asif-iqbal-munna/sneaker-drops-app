import { use, useEffect } from "react";
import DropCard from "../../DropCard";
import type { IDrop } from "../../types/types";
import { Card, CardContent } from "../../components/ui/card";
import { useDropStore } from "../../store/dropStore";

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

  if(drops.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No drops available.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {drops.map((drop: IDrop) => (
        <DropCard
          key={drop.id}
          drop={drop}
        />
      ))}
    </div>
  );
};

export default DashboardDrops;