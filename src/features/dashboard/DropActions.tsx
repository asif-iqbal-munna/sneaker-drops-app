import { Button } from '../../components/ui/button';
import type { IDrop } from '../../types/types';
import { useUserStore } from '../../store/userStore';
import { useDropStore } from '../../store/dropStore';
import DropPurchase from './DropPurchase';
import DropReserve from './DropReserve';

const DropActions = ({ drop }: { drop: IDrop}) => {
  const reservations = useDropStore(state => state.reservations)
  const user = useUserStore(state => state.user)


  if(drop.available_stock > 0) {
    if(reservations && user && reservations.includes(`${drop.id}-${user.id}`)) {
      return <DropPurchase drop={drop} />
    }
    return <DropReserve drop={drop} />
  }
  return (
    <div className="flex justify-end gap-3 pt-2">
      <Button variant={"outline"} disabled={true}>
        Out of stock
      </Button> 
    </div>
  );
};

export default DropActions;