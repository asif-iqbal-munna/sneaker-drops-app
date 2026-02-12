
import { toast } from 'sonner';
import type { IDrop } from '../types/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useUserStore } from './userStore';

interface DropSlice {
  drops: IDrop[] | null;
  setDrops: (drop: IDrop[]) => void;
  clearDrops: () => void;
  addNewDrop: (drops: IDrop) => void
  updateStock: (dropId: number, userId: number, available_stock: number) => void,
  
  // reservations
  reservations: string[],
  setReservations: (drop: string[]) => void;
  addNewReservation: (dropId: number, userId: number) => void
  removeReservation: (dropId: number, userId: number) => void
}

export const useDropStore = create<DropSlice>()(
  immer((set) => ({
    drops: [],
    reservations: [],
    
    setReservations: (reservations) => set((state) => {
      state.reservations = reservations;
    }),

    addNewReservation: (dropId: number, userId: number) =>
      set((state) => {
        if (!state.reservations) {
          state.reservations = [`${dropId}-${userId}`];
        } else {
          state.reservations.push(`${dropId}-${userId}`);
        }
      }),

    removeReservation: (dropId: number, userId: number) =>
      set((state) => {
        if (!state.reservations) return;
        
        const reservationKey = `${dropId}-${userId}`;
        state.reservations = state.reservations.filter(item => item !== reservationKey);
      }),

    setDrops: (drops) => set((state) => {
      state.drops = drops;
    }),
    
    addNewDrop: (newDrop: IDrop) =>
      set((state) => {
        if (!state.drops) {
          state.drops = [newDrop];
        } else {
          state.drops.push(newDrop);
        }
        toast.info(`New drop of ${newDrop.name} available with ${newDrop.available_stock} items.`)
      }),
    
    updateStock: (dropId: number, userId: number, available_stock: number) => 
      set((state) => {
        const drop = state.drops?.find((item: IDrop) => item.id === dropId);
        if(drop && drop?.available_stock < available_stock){
          toast.info(`Stock updated for the drop ${drop.name}, current stock ${available_stock} items.`)
          const user = useUserStore.getState().user
          if(user && user.id === userId) {
            const reservationKey = `${dropId}-${userId}`;
            state.reservations = state.reservations.filter(item => item !== reservationKey)
          }

        }
        if (drop) {
          drop.available_stock = available_stock;
        }
      }),
    
    clearDrops: () => set((state) => {
      state.drops = null;
    }),
  }))
);
