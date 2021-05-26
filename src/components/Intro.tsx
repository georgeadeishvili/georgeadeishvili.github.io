import { useEffect, useRef } from 'react'
import { Scene, TextureLoader, SphereBufferGeometry, MeshStandardMaterial, Color, Mesh, WebGLRenderer, PointLight, PerspectiveCamera, Clock } from 'three'
import TEXTURE from '../textures/NormalMap.png'
import { useTexture } from '@react-three/drei'

export default function Intro() {
	const canvasRef = useRef<HTMLDivElement>(null)
	const texture = useTexture(TEXTURE)
	useEffect(() => {
		const renderer = new WebGLRenderer({ alpha: false })
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		canvasRef.current!.appendChild(renderer.domElement)

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
		// const texture = loader.load(
		// 	TEXTURE,
		// 	function (texture) {
		// 		console.log(texture)
		// 	},
		// 	function (progress) {
		// 		console.log(progress)
		// 	},
		// 	function (error) {
		// 		console.log(error)
		// 	}
		// )
		console.log(texture)
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
		console.log('got here')
		const tick = () => {
			requestAnimationFrame(tick)
			const elapsedTime = clock.getElapsedTime()
			sphere.rotation.y = 0.5 * elapsedTime
			renderer.render(scene, camera)
		}
		tick()
	}, [])
	return <div ref={canvasRef} />
}
