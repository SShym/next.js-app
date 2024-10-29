import { create } from 'zustand';

interface State {
  position: any,
  setScrollPosition: (scrollPosition: any) => void;
}

export const useScrollStore = create<State>()((set) => ({
  position: { 
    x: 0, 
    y: 0 
  },
  
  setScrollPosition: (position) => {
    console.log(position);
    set({ position });
  },
}));

