import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import type { IDrop } from "./types/types"

type Props = {
  drop: IDrop
}

export default function DropCard({drop}: Props) {
  console.log(drop)
  const stockPercentage = (drop.available_stock / drop.total_stock) * 100

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          {drop?.name}
        </h2>

        <p className="text-4xl font-bold text-gray-900">
          {drop?.price}
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

        <div className="flex justify-end gap-3 pt-2">
          <Button>
            Reserve
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}