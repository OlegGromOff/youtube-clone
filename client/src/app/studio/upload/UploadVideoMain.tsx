'use client'

import * as m from 'framer-motion/m'
import { useRouter } from 'next/navigation'
// Added Next.js router
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Heading } from '@/ui/Heading'

import { CreateVideoForm } from './CreateVideoForm'
import { DragNDropVideo } from './DragNDropVideo'
import { ProgressVideoProcessing } from './ProgressVideoProcessing'
import type { IVideoFormData } from '@/types/studio-video.types'

export function UploadVideoMain() {
	// Initialize the router for navigation
	const router = useRouter()

	const form = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const [isReadyToPublish, setIsReadyToPublish] = useState(false)

	const fileName = form.watch('videoFileName')

	// Handler to close the modal by navigating back to the previous page
	const handleClose = () => {
		router.back() // Goes back to the previous URL (e.g., studio dashboard)
	}

	return (
		// Added onClick to the background overlay to trigger navigation
		<div
			className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
			onClick={handleClose}
		>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				style={{
					position: 'relative',
					width: '85%',
					maxWidth: 960
				}}
				// Prevent click events inside the modal from triggering the overlay's close handler
				onClick={e => e.stopPropagation()}
			>
				<div className='bg-gray-800 rounded-lg p-6 relative'>
					{/* Close button in the top right corner */}
					<button
						onClick={handleClose}
						className='absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10'
						aria-label='Close upload modal'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line
								x1='18'
								y1='6'
								x2='6'
								y2='18'
							></line>
							<line
								x1='6'
								y1='6'
								x2='18'
								y2='18'
							></line>
						</svg>
					</button>

					<Heading
						classNameHeading='text-xl'
						className='border-b border-border pb-5 pr-10' // Padding to avoid overlapping with the close button
					>
						Upload a video
					</Heading>

					{!fileName && <DragNDropVideo reset={form.reset} />}

					<ProgressVideoProcessing
						isReadyToPublish={isReadyToPublish}
						setIsReadyToPublish={setIsReadyToPublish}
						fileName={fileName}
					/>

					{!!fileName && (
						<CreateVideoForm
							form={form}
							isReadyToPublish={isReadyToPublish}
						/>
					)}
				</div>
			</m.div>
		</div>
	)
}
