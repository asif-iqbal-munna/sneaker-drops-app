import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Spinner } from '../../components/ui/spinner';
import type { IDrop } from '../../types/types';
import { toast } from 'sonner';
import { useUserStore } from '../../store/userStore';
import { useDropStore } from '../../store/dropStore';

const DropReserve = ({ drop }: { drop: IDrop}) => {
  const [isPending, setIsPending] = useState(false)
  const addNewReservation = useDropStore(state => state.addNewReservation)

  const user = useUserStore(state => state.user)

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

      if(data) {
        addNewReservation(data?.data?.drop_id, data?.data?.user_id)
      }

      toast.success("Please complete your purchase within 1 minutes")

      setIsPending(false)
    } catch (error) {
      console.log(error)
      toast.error("failed to reserve the drop.")
      setIsPending(false)
    }
  }


  return (
    <div className="flex justify-end gap-3 pt-2">
      <Button disabled={isPending} onClick={handleReservation}>
        Reserve
        {isPending && <Spinner data-icon="inline-start" />}
      </Button>
    </div>
  );
};

export default DropReserve;