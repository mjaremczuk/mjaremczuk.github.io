import gPlay from 'google-play-scraper';
import type { Project } from '../types/Project';

const TWO_SOULS_WEB_HREF = 'https://twosouls-3992f.web.app/';

/**
 * Zwraca listę wszystkich projektów dewelopera, łącząc dane 
 * z różnych źródeł (np. Google Play, GitHub).
 */
export async function getAllProjects(lang: 'en' | 'pl'): Promise<Project[]> {
	const googlePlayProjects = await fetchGooglePlayProjects(lang);
	const otherProjects = getStaticProjects();

	return [...googlePlayProjects, ...otherProjects];
}

/**
 * Oddzielna funkcja tylko dla aplikacji mobilnych (przydatne np. do emulatora).
 */
export async function getMobileApps(lang: 'en' | 'pl'): Promise<Project[]> {
    return await fetchGooglePlayProjects(lang);
}

/**
 * Logika pobierania i transformacji danych z Google Play.
 */
async function fetchGooglePlayProjects(lang: 'en' | 'pl'): Promise<Project[]> {
	try {
		const developerApps = await gPlay.developer({
			devId: "Michał Jaremczuk",
			country: "pl"
		});

		const appDetailPromises = developerApps.map(app => 
			gPlay.app({ appId: app.appId, country: "pl", lang: lang })
		);

		const fullAppDetails = await Promise.all(appDetailPromises);

		return fullAppDetails.map(app => {
			const project: Project = {
				title: app.title,
				description: app.summary,
				tags: app.categories.map(g => g.name),
				stars: app.ratings,
				forks: app.minInstalls,
				metric: "User Score",
				metricValue: Math.round((app.score / 5) * 100),
				href: app.url,
				status: "active",
				accent: "primary",
				icon: app.icon
			};

			// Add web version link for "Two Souls"
			if (app.title.toLowerCase().includes('twosouls')) {
				project.webHref = TWO_SOULS_WEB_HREF;
			}

			return project;
		});
	} catch (error) {
		console.error("Failed to fetch Google Play projects:", error);
		return []; // Zwróć pustą listę w przypadku błędu, aby nie blokować renderowania strony
	}
}

/**
 * Źródło danych statycznych (np. projekty open-source).
 */
function getStaticProjects(): Project[] {
	return [

	];
}