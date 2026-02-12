import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Spinner } from '../../components/ui/spinner';
import type { IDrop } from '../../types/types';
import { toast } from 'sonner';
import { useUserStore } from '../../store/userStore';
import { useDropStore } from '../../store/dropStore';

const DropPurchase = ({ drop }: { drop: IDrop}) => {
  const [isPending, setIsPending] = useState(false)
  const removeReservation = useDropStore(state => state.removeReservation)

  const handlePurchase = async () => {
    try {
      setIsPending(true)
      const user = useUserStore.getState().user
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/purchase/${user?.id}/${drop.id}`, {
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

      toast.success("Your purchase is completed.")
      if(user) {
        removeReservation(drop.id, user.id)
      }
      setIsPending(false)
    } catch (error) {
      console.log(error)
      toast.error("failed to purchase the drop.")
      setIsPending(false)
    }
  }

  return (
    <div className="flex justify-end gap-3 pt-2">
      <Button disabled={isPending} onClick={handlePurchase}>
        Purchase Now
        {isPending && <Spinner data-icon="inline-start" />}
      </Button>
    </div>
  );
};

export default DropPurchase;