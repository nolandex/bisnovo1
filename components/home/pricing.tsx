"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import { CheckCircle, ExternalLink, X } from "lucide-react"
import dynamic from "next/dynamic"

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), { ssr: false })
const SwiperSlide = dynamic(() => import("swiper/react").then((mod) => mod.SwiperSlide), { ssr: false })

import "swiper/css"

// ... (Komponen Modal, FeatureList, OrderingInstructions tetap sama persis)
interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	size?: "sm" | "md" | "lg" | "full"
}

function Modal({ isOpen, onClose, children, size = "full" }: ModalProps) {
	const { theme } = useTheme()
	if (!isOpen) return null

	const sizeClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-2xl",
		full: "max-w-full w-full h-[90vh]",
	}[size]

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<div
				className={`${sizeClasses} ${
					theme === "dark" ? "bg-gray-800" : "bg-white"
				} rounded-xl overflow-hidden shadow-2xl relative p-4`}
			>
				<button
					onClick={onClose}
					className={`absolute top-4 right-4 p-3 rounded-md transition-all duration-200 z-10 ${
						theme === "dark"
							? "hover:bg-gray-700 text-gray-400 hover:text-white"
							: "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
					}`}
				>
					<X className='h-5 w-5' />
				</button>
				{children}
			</div>
		</div>
	)
}

interface FeatureListProps {
	features: string[]
	textColor?: string
}

function FeatureList({ features, textColor }: FeatureListProps) {
	const { theme } = useTheme()
	return (
		<ul className='space-y-1'>
			{features.map((feature, i) => (
				<li key={i} className='flex items-center'>
					<CheckCircle
						className={`h-3 w-3 mr-2 flex-shrink-0 ${theme === "dark" ? "text-green-400" : "text-green-500"}`}
					/>
					<span className={`text-xs ${textColor || (theme === "dark" ? "text-gray-300" : "text-gray-600")}`}>
						{feature}
					</span>
				</li>
			))}
		</ul>
	)
}

function OrderingInstructions() {
	const { theme } = useTheme()
	return (
		<div className='space-y-4'>
			<h3 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
				Cara Pemesanan
			</h3>
			<div className='space-y-3'>
				<div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
					<h4 className={`font-semibold text-sm mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
						1. Pilih Paket
					</h4>
					<p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
						Pilih paket yang sesuai dengan kebutuhan bisnis Anda
					</p>
				</div>
				<div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
					<h4 className={`font-semibold text-sm mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
						2. Konsultasi
					</h4>
					<p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
						Diskusikan kebutuhan spesifik dan detail proyek dengan tim kami
					</p>
				</div>
				<div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
					<h4 className={`font-semibold text-sm mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
						3. Pembayaran
					</h4>
					<p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
						Lakukan pembayaran sesuai paket yang dipilih
					</p>
				</div>
				<div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
					<h4 className={`font-semibold text-sm mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
						4. Pengerjaan
					</h4>
					<p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
						Tim kami akan mulai mengerjakan proyek sesuai timeline yang disepakati
					</p>
				</div>
			</div>
		</div>
	)
}

interface Product {
	name: string
	price: string
	category: "landing_page" | "portfolio" | "profil_bisnis"
	features?: string[]
	exampleUrl?: string
	modalType?: "example" | "details"
}

const productData: Product[] = [
	{ name: "Landing Page", price: "Rp 20,000", category: "landing_page", features: ["Responsif", "Hosting Gratis"], exampleUrl: "https://unbounce.com", modalType: "example" },
	{ name: "Simple Store", price: "Rp 20,000", category: "landing_page", features: ["Responsif", "Hosting Gratis"], exampleUrl: "https://shopify.com", modalType: "example" },
	{ name: "Online Course", price: "Rp 20,000", category: "landing_page", features: ["Responsif", "Hosting Gratis"], exampleUrl: "https://course-demo.vercel.app", modalType: "example" },
	{ name: "Membership", price: "Rp 20,000", category: "landing_page", features: ["Responsif", "Hosting Gratis"], exampleUrl: "https://membership-demo.vercel.app", modalType: "example" },
	{ name: "Link in Bio", price: "Rp 20,000", category: "landing_page", features: ["Responsif", "Hosting Gratis"], exampleUrl: "https://linkinbio-demo.vercel.app", modalType: "example" },
	{ name: "Digital Invitation", price: "Rp 20,000", category: "landing_page", features: ["Responsif", "Hosting Gratis"], exampleUrl: "https://invitation-demo.vercel.app", modalType: "example" },
	{ name: "Birthday", price: "Rp 20,000", category: "landing_page", features: ["Responsif", "Hosting Gratis"], exampleUrl: "https://birthday-demo.vercel.app", modalType: "example" },
	{ name: "Event", price: "Rp 20,000", category: "landing_page", features: ["Responsif", "Hosting Gratis"], exampleUrl: "https://event-demo.vercel.app", modalType: "example" },
	{ name: "Portfolio", price: "Rp 20,000", category: "portfolio", features: ["Desain Modern", "Hosting Gratis", "Galeri Proyek"], exampleUrl: "https://portfolio-demo.vercel.app", modalType: "example" },
	{ name: "Profil Bisnis", price: "Rp 20,000", category: "profil_bisnis", features: ["Desain Profesional", "Hosting Gratis", "Info Kontak"], exampleUrl: "https://profil-bisnis-demo.vercel.app", modalType: "example" },
]


export default function ServicesPage() {
	const { theme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const [activeCategory, setActiveCategory] = useState<Product["category"]>("landing_page")
	const [activeModal, setActiveModal] = useState<Product["modalType"]>(null)
	const [modalProduct, setModalProduct] = useState<Product | null>(null)


	useEffect(() => {
		setMounted(true)
	}, [])


	const filteredProducts = productData.filter((product) => product.category === activeCategory)


	const openModal = useCallback(
		(type: Product["modalType"], product?: Product) => {
			setActiveModal(type)
			if (product) {
				setModalProduct(product)
			} else {
				setModalProduct(null)
			}
		},
		[],
	)

	const closeModal = useCallback(() => {
		setActiveModal(null)
		setModalProduct(null)
	}, [])

	const getButtonClasses = (isActive: boolean) => {
		const baseClasses = "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex-shrink-0"
		const activeClasses = theme === "dark" ? "bg-blue-600 text-white shadow-lg" : "bg-blue-500 text-white shadow-lg"
		const inactiveClasses =
			theme === "dark"
				? "bg-gray-700 text-gray-200 hover:bg-gray-600"
				: "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
		return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
	}

	if (!mounted) return null

	return (
		<div className='min-h-screen pt-20 pb-8'>
			<div className='container max-w-4xl mx-auto px-4 sm:px-6'>
				{/* --- PERUBAHAN 1: MEMBUAT KATEGORI BISA DIGESER --- */}
				<div className='flex overflow-x-auto space-x-4 pb-4 mb-6 scrollbar-hide'>
					<button onClick={() => setActiveCategory("landing_page")} className={getButtonClasses(activeCategory === "landing_page")}>
						Landing Page
					</button>
					<button onClick={() => setActiveCategory("portfolio")} className={getButtonClasses(activeCategory === "portfolio")}>
						Portfolio
					</button>
					<button onClick={() => setActiveCategory("profil_bisnis")} className={getButtonClasses(activeCategory === "profil_bisnis")}>
						Profil Bisnis
					</button>
				</div>


				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{filteredProducts.map((product) => (
						<div key={product.name} className={`flex flex-col rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg ${theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"} p-3`}>
							<div className='flex justify-between items-start mb-2'>
								<h3 className={`font-bold leading-tight text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
									{product.name}
								</h3>
								{/* --- PERUBAHAN 2: MENYAMAKAN GAYA HARGA DENGAN KATEGORI AKTIF --- */}
								<span className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap ml-2 shadow-lg ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}`}>
									{product.price}
								</span>
							</div>

							<div className='flex-grow'>
								{product.features && product.features.length > 0 && (
									<div className='mb-3'>
										<FeatureList features={product.features} />
									</div>
								)}
							</div>

							<div className='flex gap-2 mt-auto'>
								<button className={`flex-1 py-1.5 px-3 rounded-md font-medium text-xs transition-all duration-300 shadow-sm hover:shadow-md ${theme === "dark" ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"}`}>
									Bayar
								</button>
								{product.modalType && (
									<button onClick={() => openModal(product.modalType, product)} className={`px-2 py-1.5 rounded-md font-medium text-xs transition-all duration-300 border flex items-center gap-1 shadow-sm hover:shadow-md ${theme === "dark" ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500" : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"}`}>
										{product.modalType === "example" ? (
											<>
												<ExternalLink className='h-3 w-3' /> Contoh
											</>
										) : (
											"Rincian"
										)}
									</button>
								)}
							</div>
						</div>
					))}
				</div>

				<Modal isOpen={activeModal === "example" && modalProduct !== null} onClose={closeModal} size='full'>
					{modalProduct?.exampleUrl && (
						<iframe src={modalProduct.exampleUrl} title={`Contoh ${modalProduct.name}`} className='w-full h-full border-0' sandbox='allow-scripts allow-same-origin allow-forms allow-popups'/>
					)}
				</Modal>

				<Modal isOpen={activeModal === "details" && modalProduct !== null} onClose={closeModal} size='md'>
					<OrderingInstructions />
				</Modal>
			</div>
		</div>
	)
}
