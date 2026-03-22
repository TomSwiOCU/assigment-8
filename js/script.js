// script.js
console.log("script.js connected!");

// Track selected answer for each question (using question id as key)
const selections = {};

// Add selected class styling (you can add this in style.css too)
const style = document.createElement('style');
style.textContent = `
  .answer-btn.selected {
    background-color: #0d6efd;
    color: white;
    border-color: #0d6efd;
  }
`;
document.head.appendChild(style);

// Handle answer selection
document.querySelectorAll('.question-block').forEach(block => {
  const buttons = block.querySelectorAll('.answer-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove selected from all buttons in this question
      buttons.forEach(b => b.classList.remove('selected'));
      // Add to clicked one
      btn.classList.add('selected');
      
      // Store the answer (A/B/C/D)
      const questionId = block.parentElement.id; // question-1, question-2...
      selections[questionId] = btn.dataset.answer;
      
      console.log(selections); // helpful for debugging
    });
  });
});

// Result logic
const resultMapping = {
  A: "Adventure Seeker",
  B: "Culture Explorer",
  C: "Chill Wanderer",
  D: "Social Jetsetter"
};

const resultDescriptions = {
  "Adventure Seeker": "You live for adrenaline! In 2026 you’ll be chasing epic hikes, extreme sports, and once-in-a-lifetime thrills.",
  "Culture Explorer": "You travel to understand the world. Expect deep dives into history, art, local traditions, and meaningful conversations.",
  "Chill Wanderer": "Your vibe is relaxation and good vibes only. Beautiful sunsets, great food, and zero schedule stress await.",
  "Social Jetsetter": "You go where the people are! New friends, parties, stories, and Instagram-worthy moments are your fuel."
};

function displayResult() {
  // Check if all questions answered
  if (Object.keys(selections).length < 4) {
    alert("Please answer all questions first!");
    return;
  }

  // Count how many of each letter
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  Object.values(selections).forEach(letter => {
    counts[letter]++;
  });

  // Find the letter with highest count
  let maxCount = 0;
  let winner = "A"; // default

  for (let letter in counts) {
    if (counts[letter] > maxCount) {
      maxCount = counts[letter];
      winner = letter;
    }
  }

  // In case of tie → pick first one (you can make tie-breaker logic later)

  const resultType = resultMapping[winner];
  const description = resultDescriptions[resultType];

  // Show result
  document.getElementById('result-text').innerHTML = `
    <strong>${resultType}</strong><br><br>
    ${description}
  `;
  document.getElementById('result-container').style.display = 'block';

  // Optional: scroll to result
  document.getElementById('result-container').scrollIntoView({ behavior: 'smooth' });
}

// Connect button
document.getElementById('show-result').addEventListener('click', displayResult);