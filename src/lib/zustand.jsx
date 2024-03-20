import { create } from "zustand"

export const useZustand = create(( set, get ) => ({
  position: [ 0, 0, 0 ], setPosition: state => set({ position: state }),
  velocity: [ 0, 0, 0 ], setVelocity: state => set({ velocity: state }),
  rotation: [ 0, 0, 0 ], setRotation: state => set({ rotation: state }),
  injection: { x: 0, y: 0 }, setInjection: state => set({ injection: state })
}))