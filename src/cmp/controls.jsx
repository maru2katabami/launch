import React, { useEffect, useState } from "react"
import { Joystick } from "react-joystick-component"
import { useZustand } from "@/lib/zustand"

const Controls = () => {

  const { position, velocity, rotation, setInjection } = useZustand()

  const handleMove = e => setInjection({ x: e.x, y: e.y })
  const handleStop = () => setInjection({ x: 0, y: 0 })

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
      <div className="absolute bottom-0 p-5 w-full flex pointer-events-auto overflow-visible">
        <Joystick size={ 150 } baseColor="#FFFFFFAA" stickColor="#FFF" move={ handleMove } stop={ handleStop }/>
        <div className="ml-5 flex-1 h-full rounded-lg bg-white/50 flex flex-wrap items-center">
          <div className="w-full text-xs text-center">position</div>
          <div className="p-2 w-full flex justify-between">
            <div className="p-2 rounded-lg bg-white/50 text-xs text-center">{ Math.floor( position[0] * 1000 )}</div>
            <div className="p-2 rounded-lg bg-white/50 text-xs text-center">{ Math.floor( position[1] * 1000 )}</div>
            <div className="p-2 rounded-lg bg-white/50 text-xs text-center">{ Math.floor( position[2] * 1000 )}</div>
          </div>
          <div className="w-full text-xs text-center">axis</div>
          <div className="p-2 w-full flex justify-between">
            <div className="p-2 rounded-lg bg-white/50 text-xs text-center">{ Math.floor( rotation[0])}</div>
            <div className="p-2 rounded-lg bg-white/50 text-xs text-center">{ Math.floor( rotation[1])}</div>
            <div className="p-2 rounded-lg bg-white/50 text-xs text-center">{ Math.floor( rotation[2])}</div>
          </div>
          <div className="p-2 w-full text-xs text-center">{`${ Math.floor( Math.max( ...velocity ) * 1000 )} km/h`}</div>
        </div>
      </div>
    </div>
  )
}

export default Controls