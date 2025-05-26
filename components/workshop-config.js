/**
 * Workshop Configuration File
 * 
 * This file controls which content appears on the main page.
 * Update these settings when transitioning between workshop phases.
 */

const WORKSHOP_CONFIG = {
    // Current workshop year
    currentYear: 2025,
    
    // Workshop phase: 'call-for-talks', 'schedule', 'past'
    currentPhase: 'schedule',
    
    // Component paths
    components: {
        'call-for-talks': '2026/call-for-talks.html',
        'schedule': 'components/schedules/2025-schedule.html'
    },
    
    // Workshop details
    workshops: {
        2025: {
            date: 'Thursday, June 12th, 2025',
            location: 'Hebrew University of Jerusalem',
            registrationUrl: 'https://docs.google.com/forms/d/1HTOkuA5JB6wycBon2YZp5w2nuCLmZm8AmXu3AA4WDtk/viewform',
            scheduleDataPath: '2025/schedule.csv'
        },
        2026: {
            date: 'TBD 2026',
            location: 'TBD',
            registrationUrl: null,
            scheduleDataPath: null
        }
    }
};

// Function to load component content
async function loadComponent(componentType) {
    try {
        const componentPath = WORKSHOP_CONFIG.components[componentType];
        if (!componentPath) {
            throw new Error(`Unknown component type: ${componentType}`);
        }
        
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${response.status}`);
        }
        
        return await response.text();
    } catch (error) {
        console.error(`Error loading component ${componentType}:`, error);
        return `<p>Content currently unavailable. Please try again later.</p>`;
    }
}

// Function to get current workshop info
function getCurrentWorkshopInfo() {
    return WORKSHOP_CONFIG.workshops[WORKSHOP_CONFIG.currentYear];
}
