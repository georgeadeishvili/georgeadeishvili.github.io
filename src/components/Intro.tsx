import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'
import { Scene, TextureLoader, SphereBufferGeometry, MeshStandardMaterial, Color, Mesh, WebGLRenderer, PointLight, PerspectiveCamera, Clock } from 'three'
import TEXTURE from '../textures/NormalMap.png'
import { useTexture } from '@react-three/drei'

const StyledContainer = styled.div`
	height: 100vh;
	display: grid;
	place-items: center;

	h1 {
		font-size: 8rem;
		text-transform: uppercase;
		color: ${({ theme }) => theme.colors.secondary};
	}
`

const StyledWebGL = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	outline: none;
	mix-blend-mode: exclusion;
`

const StyledSection = styled.section`
	height: 100vh;
`

let mouseCords = {
	x: 0,
	y: 0
}

export default function Intro() {
	const canvasRef = useRef<HTMLDivElement>(null)
	const texture = useTexture(TEXTURE)
	useEffect(() => {
		const renderer = new WebGLRenderer({ alpha: true })
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		canvasRef.current!.appendChild(renderer.domElement)

		canvasRef.current!.addEventListener('mousemove', event => {
			mouseCords = {
				x: event.clientX - window.innerWidth / 2,
				y: event.clientY - window.innerHeight / 2
			}
		})

		const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
		camera.position.x = 0
		camera.position.y = 0
		camera.position.z = 2

		const scene = new Scene()

		scene.add(camera)

		const loader = new TextureLoader()

		const geometry = new SphereBufferGeometry(0.5, 64, 64)
		const material = new MeshStandardMaterial()
		material.metalness = 0.7
		material.roughness = 0.2

		material.normalMap = texture
		material.color = new Color(0x292929)

		const sphere = new Mesh(geometry, material)

		scene.add(sphere)

		const pointLight = new PointLight(0xffffff, 0.1)
		pointLight.position.x = 2
		pointLight.position.y = 3
		pointLight.position.z = 4
		scene.add(pointLight)

		const pointLight2 = new PointLight(0xff0000, 2)
		pointLight2.position.set(-1.86, 1, -1.65)
		pointLight2.intensity = 10
		scene.add(pointLight2)

		const pointLight3 = new PointLight(0xe1ff, 2)
		pointLight3.position.set(0.69, -3, -1.98)
		pointLight3.intensity = 6.8
		scene.add(pointLight3)

		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()

			renderer.setSize(window.innerWidth, window.innerHeight)
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		})

		const clock = new Clock()

		const tick = () => {
			requestAnimationFrame(tick)
			const elapsedTime = clock.getElapsedTime()
			sphere.rotation.y = 0.5 * elapsedTime
			sphere.rotation.y += 0.5 * (mouseCords.x * 0.001 - sphere.rotation.y)
			sphere.rotation.x += 0.05 * (mouseCords.y * 0.001 - sphere.rotation.x)
			sphere.rotation.y += -0.05 * (mouseCords.y * 0.001 - sphere.rotation.x)
			renderer.render(scene, camera)
		}
		tick()
	}, [])
	return (
		<>
			<StyledContainer>
				<h1>Giorgi Adeishvili</h1>
			</StyledContainer>
			<StyledWebGL ref={canvasRef} />
			{/* <StyledSection /> */}
		</>
	)
}
