// Chat functionality
class NASAAssistant {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.quickBtns = document.querySelectorAll('.quick-btn');
        
        this.initializeEventListeners();
        this.setupQuickQuestions();
    }

    initializeEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Search functionality
        const searchBtn = document.querySelector('.search-btn');
        const searchInput = document.querySelector('.search-input');
        
        searchBtn.addEventListener('click', () => this.handleSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Search suggestions
        const suggestionTags = document.querySelectorAll('.suggestion-tag');
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', () => {
                searchInput.value = tag.textContent;
                this.handleSearch();
            });
        });
    }

    setupQuickQuestions() {
        this.quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.chatInput.value = btn.textContent;
                this.sendMessage();
            });
        });
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${content}</p>`;

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // NASA-related responses
        if (message.includes('black hole')) {
            return "Black holes are regions in space where gravity is so strong that nothing, not even light, can escape. They form when massive stars collapse at the end of their lives. The boundary around a black hole is called the event horizon. NASA's Chandra X-ray Observatory and other telescopes help us study these fascinating objects!";
        }
        
        if (message.includes('rocket') || message.includes('how do rockets work')) {
            return "Rockets work on Newton's Third Law of Motion - for every action, there's an equal and opposite reaction. They burn fuel and expel hot gases downward, which pushes the rocket upward. NASA uses different types of rockets for different missions, from the powerful SLS (Space Launch System) for deep space missions to smaller rockets for satellite launches.";
        }
        
        if (message.includes('mars') || message.includes('perseverance')) {
            return "Mars is the fourth planet from the Sun and a major focus of NASA exploration! Our Perseverance rover is currently exploring Jezero Crater, searching for signs of ancient life and collecting samples. NASA also has plans to send humans to Mars in the future through the Artemis program.";
        }
        
        if (message.includes('space station') || message.includes('iss')) {
            return "The International Space Station (ISS) is a collaboration between NASA, ESA, JAXA, Roscosmos, and CSA. It orbits Earth at about 250 miles above the surface and serves as a laboratory for scientific research in microgravity. Astronauts live and work there for months at a time.";
        }
        
        if (message.includes('moon') || message.includes('artemis')) {
            return "NASA's Artemis program aims to return humans to the Moon by 2025, including the first woman and first person of color. Artemis will establish a sustainable presence on the Moon and serve as a stepping stone for future Mars missions. The program includes the Space Launch System rocket and Orion spacecraft.";
        }
        
        if (message.includes('james webb') || message.includes('webb telescope')) {
            return "The James Webb Space Telescope is NASA's most powerful space telescope ever built! It observes the universe in infrared light, allowing us to see the first galaxies that formed after the Big Bang. Webb has already captured stunning images and made groundbreaking discoveries about exoplanets and star formation.";
        }
        
        if (message.includes('hubble')) {
            return "The Hubble Space Telescope has been orbiting Earth since 1990 and has revolutionized our understanding of the universe. It observes in visible, ultraviolet, and near-infrared light. Hubble has captured iconic images like the Pillars of Creation and helped determine the age of the universe.";
        }
        
        if (message.includes('climate') || message.includes('earth')) {
            return "NASA studies Earth from space to understand climate change and environmental processes. Our fleet of Earth-observing satellites monitors weather patterns, sea levels, ice sheets, and atmospheric composition. This data helps scientists track climate change and its impacts on our planet.";
        }
        
        if (message.includes('exoplanet') || message.includes('alien')) {
            return "NASA has discovered thousands of exoplanets (planets outside our solar system) using telescopes like Kepler, TESS, and James Webb. While we haven't found definitive signs of alien life yet, we're constantly searching for habitable worlds and biosignatures that might indicate life beyond Earth.";
        }
        
        if (message.includes('asteroid') || message.includes('comet')) {
            return "NASA studies asteroids and comets to understand the formation of our solar system and protect Earth from potential impacts. The DART mission successfully tested asteroid deflection technology, and the OSIRIS-REx mission collected samples from asteroid Bennu, which will help us learn about the early solar system.";
        }
        
        // General space questions
        if (message.includes('space') || message.includes('universe')) {
            return "Space is incredibly vast and mysterious! NASA explores everything from our solar system to the farthest reaches of the observable universe. We use telescopes, rovers, spacecraft, and astronauts to study planets, stars, galaxies, and the fundamental forces that shape our cosmos.";
        }
        
        if (message.includes('astronaut') || message.includes('spacewalk')) {
            return "Astronauts are incredibly brave individuals who travel to space to conduct research and exploration. They undergo years of training and must be in excellent physical and mental condition. Spacewalks (extravehicular activities) are among the most challenging tasks, requiring careful preparation and teamwork.";
        }
        
        // Default response
        const defaultResponses = [
            "That's a great question about space exploration! NASA is constantly making new discoveries and pushing the boundaries of human knowledge. Is there a specific aspect of space science you'd like to know more about?",
            "Space is full of fascinating mysteries! NASA missions help us understand everything from black holes to exoplanets. What interests you most about space exploration?",
            "I'd love to help you learn more about space! NASA explores everything from our solar system to distant galaxies. Feel free to ask about specific missions, planets, or space phenomena.",
            "There's so much to discover about our universe! NASA uses cutting-edge technology to explore space and answer fundamental questions about our place in the cosmos. What would you like to explore?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    handleSearch() {
        const searchTerm = document.querySelector('.search-input').value.trim();
        if (!searchTerm) return;

        // Simulate search functionality
        const searchMessage = `Searching NASA resources for: "${searchTerm}"`;
        this.addMessage(searchMessage, 'bot');
        
        // Add some search suggestions
        setTimeout(() => {
            this.addMessage(`Here are some NASA resources related to "${searchTerm}":\n\n• Check the official NASA website for latest updates\n• Visit NASA's image gallery for photos\n• Explore NASA's educational resources\n• Look at recent mission updates\n\nWould you like me to help you find more specific information about ${searchTerm}?`, 'bot');
        }, 1500);
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// News interaction functionality
class NewsInteractions {
    constructor() {
        this.newsItems = document.querySelectorAll('.news-item');
        this.setupNewsInteractions();
    }

    // setupNewsInteractions() {
    //     this.newsItems.forEach(item => {
    //         item.addEventListener('click', (e) => {
    //             const title = item.querySelector('.news-title').textContent;
    //             const description = item.querySelector('.news-description').textContent;
                
    //             // Create a modal or expand the news item
    //             this.showNewsDetails(title, description);
    //         });

    //         // Add hover effects
    //         item.addEventListener('mouseenter', () => {
    //             item.style.cursor = 'pointer';
    //         });
    //     });
    // }

    showNewsDetails(title, description) {
        // For now, we'll just log to console
        // In a real application, you might show a modal or navigate to a full article
        console.log('News Article:', title);
        console.log('Description:', description);
        
        // You could also add this to the chat interface
        const assistant = window.nasaAssistant;
        if (assistant) {
            assistant.addMessage(`You clicked on: "${title}". This article discusses ${description.substring(0, 100)}...`, 'bot');
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize NASA Assistant
    window.nasaAssistant = new NASAAssistant();
    
    // Initialize News Interactions
    new NewsInteractions();
    
    // Add some dynamic content loading
    loadDynamicContent();
});

// Load dynamic content (simulate API calls)
function loadDynamicContent() {
    // Simulate loading news updates
    setTimeout(() => {
        console.log('Loading latest NASA news...');
    }, 2000);

    // Simulate loading NASA data
    setTimeout(() => {
        console.log('Syncing with NASA databases...');
    }, 3000);
}

// Add some visual enhancements
function addVisualEnhancements() {
    // Add loading animation for search
    const searchBtn = document.querySelector('.search-btn');
    const originalText = searchBtn.textContent;
    
    searchBtn.addEventListener('click', () => {
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        setTimeout(() => {
            searchBtn.textContent = originalText;
        }, 2000);
    });
}

// Initialize visual enhancements
document.addEventListener('DOMContentLoaded', addVisualEnhancements);
