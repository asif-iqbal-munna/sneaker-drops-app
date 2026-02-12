
import type { IDrop } from '../types/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface DropSlice {
  drops: IDrop[] | null;
  setDrops: (drop: IDrop[]) => void;
  clearDrops: () => void;
  addNewDrop: (drops: IDrop) => void
  updateStock: (dropId: number, available_stock: number) => void
}

export const useDropStore = create<DropSlice>()(
  immer((set) => ({
    drops: null,
    
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
      }),
    
    updateStock: (dropId: number, available_stock: number) => 
      set((state) => {
        const drop = state.drops?.find((item: IDrop) => item.id === dropId);
        if (drop) {
          drop.available_stock = available_stock;
        }
      }),
    
    clearDrops: () => set((state) => {
      state.drops = null;
    }),
  }))
);
