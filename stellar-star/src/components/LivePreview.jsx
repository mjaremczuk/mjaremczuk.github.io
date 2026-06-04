import React, { useState, useEffect } from 'react';

export default function LivePreview({ apps = [] }) {
	const [selectedApp, setSelectedApp] = useState(null);
	const [emulatorTime, setEmulatorTime] = useState(new Date());

	// Clock for the emulator
	useEffect(() => {
		const timer = setInterval(() => setEmulatorTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	const handleSelectApp = (app) => {
		setSelectedApp(app);
	};

	const handleGoHome = () => {
		setSelectedApp(null);
	};

	return (
		<div className="sandbox-card">
			<style dangerouslySetInnerHTML={{ __html: `
				.sandbox-card {
					display: flex;
					flex-direction: column;
					background: var(--color-bg-card);
					border: 1px solid var(--color-border-subtle);
					border-radius: 20px;
					overflow: hidden;
					box-shadow: var(--shadow-glass);
					backdrop-filter: blur(16px) saturate(180%);
					-webkit-backdrop-filter: blur(16px) saturate(180%);
					margin-top: 20px;
				}

				.sandbox-content {
					padding: 32px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					background: rgba(0, 0, 0, 0.2);
				}

				/* Emulator */
				.emulator-container {
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 20px 0;
					width: 100%;
				}
				
				.phone-frame {
					width: 320px;
					height: 640px;
					background: #111;
					border: 12px solid #000;
					border-radius: 40px;
					box-shadow: 0 20px 50px rgba(0,0,0,0.5);
					position: relative;
					display: flex;
					flex-direction: column;
				}
				
				.phone-screen {
					background: #03040c;
					flex-grow: 1;
					border-radius: 28px;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					position: relative;
					background-image: linear-gradient(to bottom, #03040c, #1a1a2e);
				}
				
				.phone-notch {
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 140px;
					height: 24px;
					background: #000;
					border-bottom-left-radius: 14px;
					border-bottom-right-radius: 14px;
					z-index: 10;
				}
				
				.phone-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10px 20px;
					font-family: var(--font-sans);
					font-size: 0.75rem;
					font-weight: 500;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					z-index: 12;
					transition: color 0.3s;
				}
				
				.app-grid {
					padding: 60px 16px 20px;
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					gap: 16px;
					overflow-y: auto;
				}
				
				.app-icon {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 6px;
					cursor: pointer;
					text-decoration: none;
				}
				
				.app-icon-bg {
					width: 56px;
					height: 56px;
					border-radius: 14px;
					box-shadow: 0 4px 10px rgba(0,0,0,0.3);
					transition: transform 0.2s;
					background: rgba(255, 255, 255, 0.1);
					display: flex;
					justify-content: center;
					align-items: center;
					overflow: hidden;
				}
				
				.app-icon:hover .app-icon-bg {
					transform: scale(1.05);
					background: rgba(255, 255, 255, 0.2);
				}
				
				.app-icon img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
				
				.app-icon span {
					color: #fff;
					font-size: 0.65rem;
					text-align: center;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					width: 100%;
				}
				
				.app-view {
					padding: 60px 20px 20px;
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					height: 100%;
					background: #fff;
					color: #000;
					animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
				}
				
				@keyframes slideUp {
					from { transform: translateY(100%); }
					to { transform: translateY(0); }
				}
				
				.app-view img {
					width: 100px;
					height: 100px;
					border-radius: 22px;
					margin-top: 40px;
					margin-bottom: 20px;
					box-shadow: 0 10px 20px rgba(0,0,0,0.1);
				}
				
				.app-view h3 {
					font-size: 1.4rem;
					font-weight: 700;
					margin-bottom: 8px;
					color: #111;
				}
				
				.app-view .company {
					font-size: 0.85rem;
					color: #2563eb;
					font-weight: 600;
					margin-bottom: 16px;
				}
				
				.app-view p {
					font-size: 0.9rem;
					color: #4b5563;
					margin-bottom: 30px;
					line-height: 1.5;
					display: -webkit-box;
					-webkit-line-clamp: 4;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.button-group {
					display: flex;
					flex-direction: column;
					gap: 12px;
					width: 80%;
				}
				
				.launch-btn {
					background: #22c55e;
					color: #fff;
					padding: 14px 24px;
					border-radius: 99px;
					text-decoration: none;
					font-weight: 600;
					font-size: 1rem;
					transition: transform 0.2s, background 0.2s;
					border: none;
					cursor: pointer;
					text-align: center;
				}
				
				.launch-btn:hover {
					transform: scale(1.02);
					background: #16a34a;
				}

				.web-btn {
					background: #3b82f6;
				}

				.web-btn:hover {
					background: #2563eb;
				}
				
				.home-bar {
					width: 120px;
					height: 5px;
					background: rgba(255, 255, 255, 0.8);
					border-radius: 99px;
					position: absolute;
					bottom: 10px;
					left: 50%;
					transform: translateX(-50%);
					cursor: pointer;
					z-index: 20;
					transition: background 0.2s, transform 0.2s;
				}
				
				.app-view ~ .home-bar {
					background: rgba(0, 0, 0, 0.3);
				}
				
				.home-bar:hover {
					transform: translateX(-50%) scaleY(1.5);
					background: rgba(255, 255, 255, 1);
				}
				
				.app-view ~ .home-bar:hover {
					background: rgba(0, 0, 0, 0.6);
				}

				@media (max-width: 768px) {
					.sandbox-content {
						padding: 20px;
					}
				}
			` }} />

			<div className="sandbox-content">
				<div className="emulator-container">
					<div className="phone-frame">
						<div className="phone-screen">
							<div className="phone-notch"></div>
							
							<div className="phone-header" style={{ color: selectedApp ? '#000' : '#fff' }}>
								<span>{emulatorTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
								<span>LTE</span>
							</div>

							{!selectedApp ? (
								<div className="app-grid">
									{apps.filter(app => app.icon).map((app, idx) => (
										<a key={idx} className="app-icon" onClick={() => handleSelectApp(app)}>
											<div className="app-icon-bg">
												<img src={app.icon} alt={app.title} referrerPolicy="no-referrer" />
											</div>
											<span>{app.title}</span>
										</a>
									))}
								</div>
							) : (
								<div className="app-view">
									<img src={selectedApp.icon} alt={`${selectedApp.title} icon`} referrerPolicy="no-referrer" />
									<h3>{selectedApp.title}</h3>
									<span className="company">Michał Jaremczuk</span>
									<p>{selectedApp.description}</p>
									<div className="button-group">
										<a href={selectedApp.href} target="_blank" rel="noopener noreferrer" className="launch-btn">
											Install from Google Play
										</a>
										{selectedApp.webHref && (
											<a href={selectedApp.webHref} target="_blank" rel="noopener noreferrer" className="launch-btn web-btn">
												View Web Version
											</a>
										)}
									</div>
								</div>
							)}
							
							<div className="home-bar" onClick={handleGoHome} title="Swipe up to go home"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}