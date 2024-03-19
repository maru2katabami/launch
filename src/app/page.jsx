"use client"

import React, { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Debug, Physics, useHingeConstraint, useSphere, useTrimesh } from "@react-three/cannon"
import * as THREE from "three"
import { useZustand } from "@/lib/zustand"
import Lights from "@/cmp/three/lights"
import Controls from "@/cmp/controls"

const Earth = () => {
  const { nodes } = useGLTF("/earth.glb")
  const [ ref, api ] = useSphere(() => ({ type: "Static", args: [ 5 ], position: [ 0, 0, 0 ]}), useRef())
  return(
    <mesh ref={ ref }>
      <primitive ref={ ref } object={ nodes.earth }/>
    </mesh>
  )
}

const Moon = () => {
  const { nodes } = useGLTF("/moon.glb")
  const [ ref, api ] = useSphere(() => ({ type: "Static", args: [ 1.36 ], position: [ 0, 300, 0 ]}), useRef())
  return(
    <mesh ref={ ref }>
      <primitive ref={ ref } object={ nodes.moon }/>
      <pointLight intensity={ 1000 }/>
    </mesh>
  )
}

const Rocket = () => {

  const { position, setPosition, velocity, setVelocity, rotation, setRotation, injection } = useZustand()
  const { nodes } = useGLTF("/rocket.glb")

  const opts = { mass: 1, position: [ 0, 6, 0 ]}
  const [ ref, _ref ] = useTrimesh(() => ({ args: [ nodes.rocket.geometry.attributes.position.array, nodes.rocket.geometry.index.array ], ...opts }), useRef())
  const [ tip, _tip ] = useSphere(() => ({ args: [ 0.08 ], ...opts }), useRef())
  const [ end, _end ] = useSphere(() => ({ args: [ 0.08 ], ...opts }), useRef())

  useHingeConstraint( ref, tip, { pivotA: [ 0, 0, 0 ], pivotB: [ 0, -0.4, 0 ], axisA: [ 0, 1, 0 ], axisB: [ 0, 1, 0 ]})
  useHingeConstraint( ref, end, { pivotA: [ 0, 0, 0 ], pivotB: [ 0, +0.4, 0 ], axisA: [ 0, 1, 0 ], axisB: [ 0, 1, 0 ]})

  useEffect(() => {
    _ref.position.subscribe( pos => setPosition( pos ))
    _ref.velocity.subscribe( vel => setVelocity( vel ))
    _ref.rotation.subscribe( rot => setRotation( rot ))
  }, [])

  useFrame(() => {
    const rocketPosition = new THREE.Vector3( ...position )
    const earthPosition = new THREE.Vector3( 0, 0, 0 )
    const moonPosition = new THREE.Vector3( 0, 300, 0 )
    const distanceToEarth = rocketPosition.distanceTo( earthPosition )
    const distanceToMoon = rocketPosition.distanceTo( moonPosition )
    const dir = new THREE.Vector3( 0, 1, 0 ).applyEuler( new THREE.Euler( ...rotation, "XYZ"))
    _tip.applyImpulse([ dir.x * ( 0.06 * injection.x ), dir.y * ( 0.06 * injection.y ), dir.z * ( 0.06 * injection.z ) ], [ 0, 0, 0 ])

    if( distanceToEarth <= 30 ) {
      const v = rocketPosition.normalize().multiplyScalar( -0.0024 * ( 30 - distanceToEarth ))
      _end.applyImpulse([ v.x, v.y, v.z ], [ 0, 0, 0 ])
    } else if( distanceToMoon <= 30 ) {
      const vectorToMoon = new THREE.Vector3().subVectors( rocketPosition, moonPosition )
      const v = vectorToMoon.normalize().multiplyScalar( -0.0004 * ( 30 - distanceToMoon ))
      _end.applyImpulse([ v.x, v.y, v.z ], [ 0, 0, 0 ])
    }
  })

  return(
    <mesh ref={ ref }>
      <primitive object={ nodes.rocket }/>
    </mesh>
  )
}

const Page = () => {
  const { position, launch } = useZustand()
  return (
    <Suspense fallback={ null }>
      <main>
        <Canvas style={{ background: "black"}} camera={{ position: [ 0, 6, 5 ]}}>
          <OrbitControls target={ position }/>
          <Lights/>
          <Physics gravity={[ 0, 0, 0 ]}>
{/* <Debug> */}
            <Earth/>
            <Moon/>
            <Rocket/>
{/* </Debug> */}
          </Physics>
        </Canvas>
        <Controls/>
      </main>
    </Suspense>
  )
}

export default Page