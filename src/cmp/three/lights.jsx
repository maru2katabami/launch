import React, { useMemo } from "react"
import { useSpring, a } from "@react-spring/three"
import { useZustand } from "@/lib/zustand"

const Lights = () => {
  
  const { position } = useZustand()

  const random = useMemo(() => {
    const points = []
    for (let i = 0; i < 10; i++ ) {
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos( 2 * Math.random() - 1 )
      const x = 15 * Math.sin( phi ) * Math.cos( theta )
      const y = 15 * Math.sin( phi ) * Math.sin( theta )
      const z = 15 * Math.cos( phi )
      points.push({ id: i, position: [ x, y, z ]})
    }
    return points
  }, [])

  return ( 
    <a.group position={ position }>
      { random.map(( p ) => (
        <pointLight key={ p.id } position={ p.position } intensity={ 200 }/>
      ))}
    </a.group>
  )
}

export default Lights