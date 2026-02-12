import { Card, CardContent } from "../../components/ui/card"
import type { IDrop } from "../../types/types"
import { currencyFormatter } from "../../utils/currencyFormatter"
import DropActions from "./DropActions"

type Props = {
  drop: IDrop
}

export default function DropCard({drop}: Props) {
  const stockPercentage = (drop.available_stock / drop.total_stock) * 100

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          {drop?.name}
        </h2>

        <p className="text-4xl font-bold text-gray-900">
          {currencyFormatter(drop?.price)}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 font-medium">Available Stock</span>
            <span className="text-gray-900 font-semibold">
              {drop.available_stock} / {drop.total_stock}
            </span>
          </div>
          
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${stockPercentage}%` }}
            />
          </div>
        </div>

        <DropActions drop={drop} />
        {drop?.Purchases && drop.Purchases?.length > 0 &&
          <div className="border-t pt-4">
            <h4 className="mb-3 text-center text-sm font-medium text-muted-foreground">
              Recently purchased by
            </h4>
            <div className="space-y-2.5">
              {drop.Purchases.map((purchase) => (
                <div key={purchase?.id} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                  <span className="text-muted-foreground">{purchase?.User?.name || "Na"}</span>
                </div>
              ))}
            </div>
          </div>
        }
      </CardContent>
    </Card>
  )
}