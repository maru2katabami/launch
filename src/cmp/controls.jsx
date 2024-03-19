import React from "react"
import { useZustand } from "@/lib/zustand"

const Controls = () => {
  const { position, velocity, rotation, setInjection } = useZustand()
  return (
    <div className="absolute top-0 w-full h-full flex justify-center items-center pointer-events-none">
      <div className="absolute top-0 w-full flex flex-wrap justify-center">
        <div className="pt-2 w-full text-sm text-orange-200 text-center">Rocket Launched...</div>
        <div className="mx-2 w-1/4 flex flex-col">
          <div className="p-2 w-full flex-grow text-4xl text-white flex justify-center items-center">01</div>
          <div className="w-full px-2 text-xs text-orange-200 text-center">Hours</div>
        </div>
        <div className="mx-2 w-1/4 flex flex-col">
          <div className="p-2 w-full flex-grow text-4xl text-white flex justify-center items-center">01</div>
          <div className="w-full px-2 text-xs text-orange-200 text-center">Minits</div>
        </div>
        <div className="mx-2 w-1/4 flex flex-col">
          <div className="p-2 w-full flex-grow text-4xl text-white flex justify-center items-center">01</div>
          <div className="w-full px-2 text-xs text-orange-200 text-center">Seconds</div>
        </div>
      </div>
      <div className="absolute bottom-0 p-5 w-full">
        <div className="w-full h-60 rounded-lg bg-white/50 pointer-events-auto" onClick={ e => console.log( e )}></div>
      </div>
    </div>
  )
}

export default Controls