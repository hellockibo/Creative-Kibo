import { create } from 'zustand';

export const useCursorStore = create((set) => ({
  cursorState: 'default', // 'default', 'hover', 'drag', 'explore'
  cursorText: '',
  setCursorState: (state) => set({ cursorState: state }),
  setCursorText: (text) => set({ cursorText: text }),
}));
