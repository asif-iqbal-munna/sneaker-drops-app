import { useState } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import type { IDrop } from "./types/types"
import { toast } from "sonner"
import { useUserStore } from "./store/userStore"
import { Spinner } from "./components/ui/spinner"
import { currencyFormatter } from "./utils/currencyFormatter"

type Props = {
  drop: IDrop
}

export default function DropCard({drop}: Props) {
  const [isPending, setIsPending] = useState(false)
  const user = useUserStore(state => state.user)
  const stockPercentage = (drop.available_stock / drop.total_stock) * 100

  const handleReservation = async () =>{
    try {
      setIsPending(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/reservations/${user?.id}/${drop.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const data = await response.json();
      console.log(data);
      toast.success("Please complete your purchase within 1 minutes")
      setIsPending(false)
    } catch (error) {
      console.log(error)
      toast.error("failed to reserve the drop.")
      setIsPending(false)
    }
  }

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

        <div className="flex justify-end gap-3 pt-2">
          {drop.available_stock > 0 ?
            <Button disabled={isPending} onClick={handleReservation}>
              Reserve
              {isPending && <Spinner data-icon="inline-start" />}
            </Button>
          : 
            <Button variant={"outline"} disabled={true}>
              Out of stock
            </Button>
          }
          
        </div>
      </CardContent>
    </Card>
  )
}