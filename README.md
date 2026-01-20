# PuzzleForge

PuzzleForge is an interactive web-based puzzle game that challenges players to reassemble randomly shuffled image pieces. Built with Canvas HTML tag, vanilla JavaScript, and styled with Tailwind CSS, it offers an engaging puzzle-solving experience with multiple difficulty levels suitable for all players. 

[Live Demo](https://dublino8576.github.io/PuzzleForge/) 

To view the Kanban board, follow the link below:

[PuzzleForge Project](https://github.com/users/dublino8576/projects/11) 

---

## Table of Contents

- [Screenshots](#screenshots)
- [User Value](#user-value)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation & Deployment](#installation--deployment)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [AI Tool Usage & Reflection](#ai-tool-usage--reflection)
- [Future Enhancements](#future-enhancements)
- [Credits](#credits)

---

## Screenshots

### @ 1440px

<img width="2850" height="2158" alt="PuzzleForge_screenshot1440px" src="https://github.com/user-attachments/assets/4f572f82-e578-44c6-bd2d-ddf95814856e" />

### @ 1024px

<img width="2018" height="1976" alt="PuzzleForge_screenshot1024px" src="https://github.com/user-attachments/assets/2d346095-b422-4a36-97f1-c619f3296e57" />

### @ 768px

<img width="1506" height="1682" alt="PuzzleForge_screenshot768px" src="https://github.com/user-attachments/assets/c775e366-cd15-49c9-a3d7-9008a0867d4d" />

### @ 320px

<img width="610" height="1770" alt="PuzzleForge_screenshot320px" src="https://github.com/user-attachments/assets/ed561159-f4a6-4639-9002-64eee1643b97" />

### @ 320px landscape mode

<img width="1078" height="1348" alt="PuzzleForge_screenshot320px_landscapeMode" src="https://github.com/user-attachments/assets/06d888c9-b52b-44a5-a03b-86dcea60775c" />


## User Value

PuzzleForge provides:

- **Mental Stimulation**: Exercises spatial reasoning, pattern recognition, and problem-solving skills. The game provides hints to avoid user frustration by showing a faded background image of the puzzle
- **Accessibility**: Playable on desktop, tablet, and mobile devices with touch and mouse support, implementation of aria labels, and use of the sr-only taiwind class for screen readers
- **Progressive Difficulty**: Three difficulty levels (Easy: 3×3, Normal: 6×6, Hard: 15×15) cater to different skill levels
- **Relaxing Entertainment**: Enjoy beautiful images while engaging in a calming puzzle-solving activity. The animated linear gradient of the title and general styling of the app aim to give a sense of relaxation to the user, increasing focus and time spent gaming
- **Theme Customization**: Light and dark mode support for comfortable viewing in any environment depending on user's preference

---

## Features

### Core Functionality

- **Drag-and-Drop Interface**: Precise and smooth drag and drop feature using mouse and touch events
- **Smart Snapping**: Pieces automatically snap into place when positioned correctly (within 33% threshold)
- **Visual Hints**: Semi-transparent background image guides puzzle assembly. Drawing of a grid to show the number of pieces needed to complete the puzzle
- **Responsive Design**: All sections of Web App are responsive to all device sizes with Tailwind classes and using Window resize event listener for the canvas
- **Random Image Selection**: Five curated puzzle images rotate on each new game. The next one can never be the same as the previous one
- **Difficulty Levels**: Choose between Easy (3×3), Normal (6×6), and Hard (15×15) grids. The game loads on easy. When a different difficulty is selected, the puzzle pieces update randomly scattered inside the canvas using the current image as a reference

### User Experience

- **Theme Toggle**: Switch between light and dark modes with persistent preference storage
- **New Game Button**: Start fresh puzzles with a single click
- **Grid Overlay**: Visual grid lines help identify piece positions
- **Z-Index Management**: Selected pieces render on top for clear visual hierarchy
- **Resize Handling**: Puzzle scales proportionally when the window size changes. Resizing is triggered after 300ms, and the user has stopped resizing the viewport to avoid unnecessary re-rendering

---

## Technologies Used

### Core Technologies

- **HTML5**: Semantic markup with Canvas API for puzzle rendering
- **CSS3**: Custom properties and animations
- **JavaScript (ES6+)**: Modular architecture with native DOM manipulation
- **Canvas API**: Image rendering and piece manipulation

### Frameworks & Libraries

- **[Tailwind CSS v4.1.18](https://tailwindcss.com/)**: CSS framework
- **[Flowbite v4.0.1](https://flowbite.com/)**: UI component library
- **[Uiverse](https://uiverse.io/)**: UI component library
- **[PostCSS v8.5.6](https://postcss.org/)**: CSS transformation tool
- **[Autoprefixer v10.4.23](https://github.com/postcss/autoprefixer)**: Vendor prefix automation

### Development Tools

- **npm**: Package management
- **Git**: Version control

---

## Installation & Deployment

### Local Development Setup

This project runs Tailwind using npm with Postcss. The initial installation process was lenghty as there was no Javascript framework handling the configuration files.
I was able to find tutorials and add scripts to package.JSON to be able to build styles.css in the dist folder and implement a --watch command that acts as a Live Previewer. If you make changes to the code you have to run the "npm run watch" command to open the connection and see the changes reflected in real time. Selecting Live Previewer from VS Code will not be enough otherwise.

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/puzzleforge_project.git
   cd puzzleforge_project
   ```

2. **Install dependencies**: this step is enough if you want to view the project from your local IDE

   ```bash
   npm install
   ```

3. **Build CSS**: only needed to make modifications to the project

   ```bash
   npm run build
   ```

4. **Watch for CSS changes (optional)**

   ```bash
   npm run watch
   ```

5. **Open in browser**
   - Use Live Server extension in VS Code

### Deployment Instructions

#### GitHub Pages

1. Navigate to repository Settings → Pages
2. Select branch `main` and folder `/root`
3. Click Save
4. Access at: `https://yourusername.github.io/puzzleforge_project/`

---

## Usage

### Starting a Game

1. Open PuzzleForge in your browser
2. The game loads with an Easy (3×3) puzzle by default
3. Click **"New Game"** to shuffle the current puzzle or load a new image

### Playing the Puzzle

1. **Select a piece**: Click/tap on any puzzle piece
2. **Drag the piece**: Move your mouse/finger while holding
3. **Position the piece**: Release near its correct location
4. **Auto-snap**: If close enough (within 33% threshold), the piece snaps into place
5. **Repeat**: Continue until all pieces are correctly positioned

### Changing Difficulty

- Click **Easy** for a 3×3 grid (9 pieces)
- Click **Normal** for a 6×6 grid (36 pieces)
- Click **Hard** for a 15×15 grid (225 pieces)

**Note**: Changing difficulty starts a new game with the current image.

### Theme Toggle

Click the sun/moon icon in the header to switch between light and dark modes. Your preference is saved in browser storage.

---

## Project Structure

```
puzzleforge_project/
├── assets/
│   ├── css/
│   │   └── styles.css           # Tailwind input file
│   ├── images/                  # Puzzle image assets
│   │   ├── afternoon_tea_puzzle.webp
│   │   ├── city_mirror_puzzle.webp
│   │   ├── concert_puzzle.webp
│   │   ├── forest_puzzle.webp
│   │   └── rugby_match_puzzle.webp
│   └── js/
│       ├── difficultyLvl.js     # Difficulty level management
│       └── game.js              # Main game logic
├── dist/
│   └── assets/
│       └── css/
│           └── styles.css       # Compiled Tailwind output
├── node_modules/                # Dependencies (gitignored)
├── .gitignore
├── eslint.config.js             # ESLint configuration
├── index.html                   # Main HTML file
├── package.json                 # Project dependencies
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Project documentation
├── site.webmanifest             # PWA manifest
└── tailwind.config.js           # Tailwind configuration
```

### Key Files

- **[index.html](index.html)**: Main application entry point with semantic HTML structure
- **[assets/js/game.js](assets/js/game.js)**: Core game logic including canvas rendering, drag-and-drop, and piece management
- **[assets/js/difficultyLvl.js](assets/js/difficultyLvl.js)**: Exports [`difficultyLvl`](assets/js/difficultyLvl.js) and [`getRowsCols`](assets/js/difficultyLvl.js) functions
- **[assets/css/styles.css](assets/css/styles.css)**: Custom styles and Tailwind directives
- **[tailwind.config.js](tailwind.config.js)**: Tailwind configuration with custom theme colors

---

## AI Tool Usage & Reflection

### AI Tools Used

GitHub Copilot (Claude Sonnet 4.5) was utilized throughout development for:

### Code Generation

- **Canvas rendering logic**: Initial implementation of [`drawPuzzle`](assets/js/game.js) and [`drawGrid`](assets/js/game.js) functions
- **Piece initialization**: Structure for [`initializePuzzlePieces`](assets/js/game.js) with source/destination coordinates
- **Touch event handling**: Unified pointer event system in [`getPointerPos`](assets/js/game.js)
- **Resize calculations**: Proportional scaling logic in [`resizePuzzle`](assets/js/game.js)

**Impact**: Accelerated development by 40-50%, particularly for mathematical calculations and coordinate transformations.

### Debugging Assistance

- **Piece release bug**: AI identified missing `selectedPiece = null` in [`handleDrop`](assets/js/game.js)
- **Grid alignment issues**: Suggested using `originX` and `originY` parameters in [`drawGrid`](assets/js/game.js)
- **Z-index management**: Recommended array splice/push pattern for piece ordering

**Impact**: Reduced debugging time significantly by providing targeted solutions to specific issues.

### Performance/UX Optimization

- **Resize debouncing**: Implemented 300ms debounce to prevent excessive re-renders
- **Snap threshold calculation**: Dynamic threshold based on piece dimensions (33% of average)
- **Image caching**: Suggested `image.complete` checks before rendering

**Impact**: Improved game smoothness and prevented visual glitches during window resizing.

### Reflection on AI's Impact

**Positive Aspects:**

- Rapid prototyping of complex canvas manipulation
- Clear explanations of mathematical transformations
- Consistent code style and documentation

**Challenges:**

- Occasional suggestions required context-specific adjustments
- Initial touch event handling needed refinement for mobile devices
- Some generated code patterns required optimization for performance

**Learning Outcomes:**

- Deeper understanding of Canvas API coordinate systems
- Improved knowledge of event handling across input types
- Better grasp of modular JavaScript architecture

**Conclusion**: AI significantly enhanced productivity while maintaining code quality. Manual review and testing remained essential for ensuring game logic correctness and user experience polish.

---

## Future Enhancements

- [ ] **Image Upload**: Allow users to create puzzles from their own images
- [ ] **Timer & Score**: Track completion time and moves
- [ ] **Achievements System**: Unlock badges for milestones
- [ ] **Difficulty Presets**: Add more grid size options (4×4, 8×8)
- [ ] **Puzzle Preview**: Toggle hint image visibility
- [ ] **Save Progress**: Store current puzzle state in localStorage
- [ ] **Sound Effects**: Audio feedback for piece placement
- [ ] **Animations**: Smooth transitions for piece snapping

---

## Credits

### External Resources

- **Images**:
  - Afternoon Tea: [Unsplash](https://unsplash.com/)
  - Concert: [Unsplash](https://unsplash.com/)
  - Forest: [Unsplash](https://unsplash.com/)
  - City Mirror: [Unsplash](https://unsplash.com/)
  - Rugby Match: [Unsplash](https://unsplash.com/)

- **Fonts**: [Google Fonts](https://fonts.google.com/)
  - Luckiest Guy (headers)
  - Nunito (body text)

- **Icons**: [Heroicons](https://heroicons.com/)

### Code Attributions

- Theme toggle functionality: Adapted from [Flowbite Documentation](https://flowbite.com/docs/customize/dark-mode/)
- Canvas drag-and-drop pattern: Inspired by [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

### Development Tools

- **AI Assistant**: GitHub Copilot (Claude Sonnet 4.5) for code generation and debugging
- **UI Framework**: Tailwind CSS and Flowbite components
- **Linting**: ESLint with recommended JavaScript rules

---

## License

This project is for educational purposes as part of Code Institute coursework.

---

## Contact

**Developer**: [Your Name]  
**GitHub**: [Your GitHub Profile](https://github.com/yourusername)  
**Email**: your.email@example.com

---

**PuzzleForge** - Crafted Challenges. Sharpened Minds.


