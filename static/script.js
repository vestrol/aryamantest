// Topics
const topics = [
    "Quantum Electrodynamics",
    "Calculus",
    "Quantum Mechanics",
    "Abstract Algebra",
    "Number Theory",
    "Differential Equations",
    "Complex Analysis",
    "Topology",
    "Combinatorics",
    "Graph Theory",
    "Stochastic Processes",
    "Group Theory",
    "Ring Theory",
    "Field Theory",
    "Mathematical Logic",
    "Cryptography",
    "Calculus of Variations",
    "Functional Analysis",
    "Measure Theory",
    "Real Analysis",
    "Complex Variables",
    "Partial Differential Equations",
    "Ordinary Differential Equations",
    "Non-Euclidean Geometry",
    "Differential Geometry",
    "Algebraic Geometry",
    "Homotopy Theory",
    "Homological Algebra",
    "Category Theory",
    "Knot Theory",
    "Mathematical Physics",
    "Operator Theory",
    "Riemannian Geometry",
    "Mathematical Modeling",
    "Numerical Analysis",
    "Dynamical Systems",
    "Set Theory",
    "Elliptic Curves",
    "Mathematical Statistics",
    "Information Theory",
    "Game Theory",
    "Mathematical Optimization",
    "Theory of Computation",
    "Automata Theory",
    "Linear Algebra",
    "Analytic Number Theory",
    "Probability Theory",
    "Algebraic Topology",
    "Fuzzy Logic",
    "Control Theory",
    "Computational Mathematics",
    "Applied Mathematics",
    "Mathematical Economics",
    "Mathematical Biology",
    "Mathematical Finance",
    "Financial Engineering",
    "Biostatistics",
    "Actuarial Science",
    "Medical Statistics",
    "Operations Research",
    "Epidemiological Modeling",
    "Behavioral Mathematics",
    "Quantum Computing",
    "Mathematical Neuroscience",
    "Robust Optimization",
    "Geometric Group Theory",
    "Algebraic Number Theory",
    "Elliptic Integrals",
    "Special Functions",
    "Fourier Analysis",
    "Wavelet Transform",
    "Tensor",
    "String Theory",
    "Quantum Field Theory",
    "Nonlinear Dynamics",
    "Foundations of Mathematics",
    "Mandelbrot Set",
    "Fractal",
    "Complex Dynamics",
    "Algebraic K-theory",
    "Sociological Statistics",
    "Ethnomathematics",
    "Philosophy of Mathematics",
    "History of Mathematics",
    "Theoretical Computer Science",
    "Computational Complexity Theory",
    "Algorithmic Information Theory",
    "Mathematical Cognition"
];

// Shuffle the topics array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffle(topics);  // Shuffle topics on page load

const topicElement = document.getElementById("topic1");
const topicElement2 = document.getElementById("topic2");
let topicIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;            // Typing speed
const deletingSpeed = 30;          // Deleting speed
const delayBetweenTopics = 5000;  // 15-second delay after each topic
const shortDelay = 300;            // Short delay before typing the next topic

// Typing Effect with Wikipedia Links
function type() {
    const currentTopic = topics[topicIndex];
    const encodedTopic = encodeURIComponent(currentTopic); // Encode topic for URL
    const wikiLink = `https://en.wikipedia.org/wiki/${encodedTopic}`;

    if (isDeleting) {
        topicElement.innerHTML = `<a href="${wikiLink}" target="_blank" style="color: inherit; text-decoration: none;">${currentTopic.substring(0, charIndex--)}</a>`;
        if (charIndex < 0) {
            isDeleting = false;
            topicIndex = (topicIndex + 2) % topics.length;
            setTimeout(type, shortDelay); // Short delay before typing the next topic
        } else {
            // topicIndex = (topicIndex + 2) % topics.length;
            setTimeout(type, deletingSpeed);
        }
    } else {
        topicElement.innerHTML = `<a href="${wikiLink}" target="_blank" style="color: inherit; text-decoration: none;">${currentTopic.substring(0, charIndex++)}</a>`;
        if (charIndex > currentTopic.length) {
            setTimeout(() => {
                isDeleting = true;
                type(); // Start deleting after 15-second delay
            }, delayBetweenTopics);
        } else {
            setTimeout(type, typingSpeed);
        }
    }
}

type();

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const submitButton = document.getElementById('submit-button');
const loader = document.getElementById('loader');
const content = document.getElementById('content');
const cancelButton = document.getElementById('cancel-button');
const form = document.getElementById('uploadForm');

// Initialize an AbortController
let abortController = new AbortController();

submitButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    // Show loader and hide the content
    loader.style.display = 'flex';
    content.classList.add('hidden');
    cancelButton.classList.add('show'); // Show cancel button

    // Initialize a new AbortController for each request
    abortController = new AbortController();

    // Submit form asynchronously (AJAX)
    const formData = new FormData(form);
    fetch('/upload_image', {
        method: 'POST',
        body: formData,
        signal: abortController.signal // Attach the signal to the fetch request
    })
    .then(response => response.json())
    .then(data => {
        loader.style.display = "none"; // Hide the loader
        content.classList.remove('hidden'); // Show the content again
        cancelButton.classList.remove('show'); // Hide the cancel button
        // Optionally, handle the response here (e.g., show prediction)
    })
    .catch(error => {
        if (error.name === 'AbortError') {
            console.log('Request aborted');
        } else {
            console.error('Error:', error);
        }
        loader.style.display = "none";
        content.classList.remove('hidden');
        cancelButton.classList.remove('show'); // Hide the cancel button
    });
});

// Cancel button functionality
cancelButton.addEventListener('click', function () {
    // Abort the fetch request
    abortController.abort();
    loader.style.display = 'none'; // Hide the loader
    content.classList.remove('hidden'); // Show the content again
    cancelButton.classList.remove('show'); // Hide the cancel button
});

// Inside the <script> tag of ai.html
// Enable buttons after processing
playVoiceButton.disabled = false;
stopVoiceButton.disabled = false;

// Play voice
playVoiceButton.addEventListener('click', function () {
  const audioPlayer = document.getElementById('voice-player');
  audioPlayer.play();
});

// Stop voice
stopVoiceButton.addEventListener('click', function () {
  const audioPlayer = document.getElementById('voice-player');
  audioPlayer.pause();
  audioPlayer.currentTime = 0; // Reset to start
});

// JavaScript for interactivity
document.getElementById('explainButton').addEventListener('click', () => {
    // Example Feynman-style explanation
    const examples = [
      "An eigenvector is like your dog's favorite path to the food bowl - it's the natural direction things want to go!",
      "Imagine you're stretching pizza dough. The eigenvector is the direction that stretches the most (but keeps its cheese-to-crust ratio intact!)."
    ];
    
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    alert(`🧠 Here's the scoop:\n\n${randomExample}`);
  });
  
  // Add playful hover effects to highlights
  document.querySelectorAll('.highlight').forEach(element => {
    element.addEventListener('mouseover', () => {
      element.style.transform = 'rotate(2deg) scale(1.05)';
    });
    
    element.addEventListener('mouseout', () => {
      element.style.transform = 'none';
    });
  });

  document.querySelector('.brand-orb').addEventListener('mouseenter', function() {
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    
    angles.forEach(angle => {
        const p = document.createElement('div');
        p.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${angle % 90 === 0 ? 'var(--passion-red)' : 'var(--quantum-teal)'};
            border-radius: 50%;
            animation: 
                particle-emit 0.6s ease-out forwards,
                particle-fade 0.6s ease-out;
            transform-origin: center;
        `;
        
        // Calculate position using trigonometry
        const radians = angle * (Math.PI/180);
        const distance = 40;
        const x = Math.cos(radians) * distance;
        const y = Math.sin(radians) * distance;
        
        p.style.transform = `translate(${x}px, ${y}px)`;
        this.appendChild(p);
        
        setTimeout(() => p.remove(), 600);
    });
});

document.querySelector('.brand-orb').addEventListener('click', function() {
    const particles = 12;
    const container = this.parentElement;
    
    for(let i = 0; i < particles; i++) {
      const p = document.createElement('div');
      p.className = 'quantum-burst';
      p.style.cssText = `
        --angle: ${(i * 30)}deg;
        --color: ${i % 2 ? 'var(--passion-red)' : 'var(--quantum-teal)'};
      `;
      container.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  });