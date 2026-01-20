/* import difficulty level helpers */
import { difficultyLvl, getRowsCols } from "./difficultyLvl.js";

/* load script when page is fully loaded */
window.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("puzzle-canvas");
  const context = canvas.getContext("2d");
  /*canvas max width and height for responsive devices */
  const maxImageWidth = window.innerWidth * 0.65; // 65% of viewport width
  const maxImageHeight = window.innerHeight * 0.65; // 65% of viewport height
  /*set canvas dimensions with image uploaded */
  const image = new Image();
  image.src = getImageURL();
  /*set image height and width to fit within max dimensions while maintaining aspect ratio */
  /* array to store puzzle pieces */
  let puzzlePieces = [];
  let selectedPiece = null;
  /* current difficulty level */
  let currentDifficulty = "easy"; // default
  let { rows, cols } = getRowsCols(currentDifficulty);

  const rebuildPuzzle = function () {
    if (!image.complete || !image.naturalWidth)
      return; /* guard until image is ready */

    /* set canvas to match parent section size */
    const puzzleSection = document.getElementById("puzzle-section");
    canvas.width = puzzleSection.clientWidth;
    canvas.height = puzzleSection.clientHeight;

    /* compute scaled image size within 65% viewport, preserve aspect */
    const scale = Math.min(
      maxImageWidth / image.naturalWidth,
      maxImageHeight / image.naturalHeight,
      1,
    );
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    /* center the image inside the larger canvas */
    const originX = (canvas.width - drawWidth) / 2;
    const originY = (canvas.height - drawHeight) / 2;
    ({ rows, cols } = getRowsCols(currentDifficulty));
    /* initialize puzzle pieces as rectangles tied to the scaled image */

    puzzlePieces = initializePuzzlePieces(
      canvas,
      rows,
      cols,
      originX,
      originY,
      drawWidth,
      drawHeight,
      image.naturalWidth,
      image.naturalHeight,
    );
    /* shuffle pieces to random positions within the canvas area */
    shufflePuzzlePieces(puzzlePieces, canvas);
    /* redraw with shuffled pieces */
    drawPuzzle(context, canvas, image, puzzlePieces, rows, cols);
  };

  image.onload = function () {
    rebuildPuzzle();
  };

  //////////

  /*EVENT LISTENERS*/

  /////////

  /* event listener for new game button */
  const newGameButton = document.getElementById("new-game-button");
  newGameButton.addEventListener("click", function () {
    //change image source to start a new game
    image.src = getImageURL();
  });

  // initial grid draw (will redraw on image load above)
  if (canvas.width && canvas.height) {
    const puzzleSection = document.getElementById("puzzle-section");
    const scale = 1;
    const drawWidth = Math.min(canvas.width, maxImageWidth);
    const drawHeight = Math.min(canvas.height, maxImageHeight);
    const originX = (puzzleSection.clientWidth - drawWidth) / 2;
    const originY = (puzzleSection.clientHeight - drawHeight) / 2;
    ({ rows, cols } = getRowsCols(currentDifficulty));
    puzzlePieces = initializePuzzlePieces(
      canvas,
      rows,
      cols,
      originX,
      originY,
      drawWidth,
      drawHeight,
      drawWidth,
      drawHeight,
    );
    drawGrid(
      context,
      canvas,
      rows,
      cols,
      originX,
      originY,
      drawWidth,
      drawHeight,
    );
  }
  // When you press the mouse button, we find exactly where you clicked on the canvas
  // We check if that position is inside any puzzle piece
  // Offset = the distance from the piece's corner to where your mouse is. If you click in the middle of a piece, the offset remembers "you grabbed it 25px from the left and 15px from the top"

  canvas.addEventListener("mousedown", function (e) {
    const { x, y } = getMousePos(canvas, e); // Get where you clicked (relative to canvas)
    selectedPiece = pressedPiece(x, y, puzzlePieces); // Check if you clicked a piece
    /* Offset needed to drag piece from cursor position smoothly, registers mouse movement to the selected piece */
    if (selectedPiece !== null) {
      const index = puzzlePieces.indexOf(selectedPiece);
      if (index > -1) {
        puzzlePieces.splice(index, 1); // Remove the selected piece from its current position
        puzzlePieces.push(selectedPiece); // Add it to the end of the array (top of draw order)
      }
      selectedPiece.offset = {
        x: x - selectedPiece.currentX, // Distance from piece's left edge to your click
        y: y - selectedPiece.currentY, // Distance from piece's top edge to your click
      };
    }
  });

  /* mousemove event to drag selected piece */
  canvas.addEventListener("mousemove", function (e) {
    if (selectedPiece) {
      const { x, y } = getMousePos(canvas, e); // Get current mouse position
      /* update piece position based on mouse movement and offset */
      selectedPiece.currentX = x - selectedPiece.offset.x; //mouse position minus offset
      selectedPiece.currentY = y - selectedPiece.offset.y; //mouse position minus offset
      drawPuzzle(context, canvas, image, puzzlePieces, rows, cols); // Redraw the puzzle with the piece in its new position
    }
  });

  /* release piece on mouseup */
  canvas.addEventListener("mouseup", function () {
    if (!selectedPiece) return;
    if (selectedPiece.isClose()) {
      selectedPiece.snap();
    }
    selectedPiece = null; // always release the piece
    drawPuzzle(context, canvas, image, puzzlePieces, rows, cols); // redraw after release
  });

  /* listen for difficulty changes and rebuild puzzle accordingly */
  difficultyLvl(function (value) {
    currentDifficulty = value;
    rebuildPuzzle();
  });
});
///////////////////////////////////////

/* functions used for event listeners */

///////////////////////////////////////

function getImageURL() {
  const imagesURLs = [
    "assets/images/afternoon_tea_puzzle.webp",
    "assets/images/concert_puzzle.webp",
    "assets/images/forest_puzzle.webp",
    "assets/images/city_mirror_puzzle.webp",
    "assets/images/rugby_match_puzzle.webp",
  ];
  const randomIndex = Math.floor(Math.random() * imagesURLs.length);

  /* if current index is the same as the previous randomise again, callback function */
  if (getImageURL.previousIndex === randomIndex) {
    return getImageURL();
  }
  /* save previous index after first run */
  getImageURL.previousIndex = randomIndex;

  return imagesURLs[randomIndex];
}
/////////////
/* initialize puzzle pieces as rectangles on the canvas */
/////////////

function initializePuzzlePieces(
  canvasEl,
  rows,
  cols,
  originX = 0,
  originY = 0,
  drawWidth,
  drawHeight,
  imageNaturalWidth,
  imageNaturalHeight,
) {
  /* create array of puzzle piece objects, each representing a rectangular section */
  const pieces = [];
  const pieceWidth = drawWidth / cols;
  const pieceHeight = drawHeight / rows;
  const srcPieceWidth = imageNaturalWidth / cols;
  const srcPieceHeight = imageNaturalHeight / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      pieces.push({
        /* position in grid */
        row,
        col,
        /* source rectangle inside the original image */
        srcX: col * srcPieceWidth,
        srcY: row * srcPieceHeight,
        srcW: srcPieceWidth,
        srcH: srcPieceHeight,
        /* destination size on canvas (scaled) */
        width: pieceWidth,
        height: pieceHeight,
        /* current position (initially placed in grid, offset to center) */
        currentX: originX + col * pieceWidth,
        currentY: originY + row * pieceHeight,
        /* correct position for win condition check */
        correctX: originX + col * pieceWidth,
        correctY: originY + row * pieceHeight,
        /* method to check if piece is close to correct location */
        isClose: function () {
          return isClose(this);
        },
        /* method to snap piece to correct location */
        snap: function () {
          snap(this);
        },
      });
    }
  }

  return pieces;
}

/////////////
/* draw grid lines on canvas to visualize puzzle pieces */
/////////////

function drawGrid(
  ctx,
  canvasEl,
  rows,
  cols,
  originX = 0,
  originY = 0,
  drawWidth = canvasEl.width,
  drawHeight = canvasEl.height,
) {
  if (!canvasEl?.width || !canvasEl?.height)
    return; /* guard clause, stops the function if canvas has no width or height */
  const cellWidth = drawWidth / cols;
  const cellHeight = drawHeight / rows;

  ctx.save(); /* save current canvas state */
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 2; /* set line width for grid lines */

  /* draw rectangle border for each puzzle piece within the image area */
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = originX + col * cellWidth;
      const y = originY + row * cellHeight;
      /* strokeRect draws the outline of a rectangle without filling it */
      ctx.strokeRect(x, y, cellWidth, cellHeight);
    }
  }

  /* restore canvas to original state, so further drawing is not affected */
  ctx.restore();
}

/////////////
/* Draw puzzle pieces at their current positions */
/////////////

function drawPuzzle(ctx, canvasEl, img, pieces, rows, cols) {
  /* clear canvas */
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  /* compute correct image position and dimensions from pieces */
  const originX = Math.min(...pieces.map((p) => p.correctX));
  const originY = Math.min(...pieces.map((p) => p.correctY));
  const drawWidth =
    Math.max(...pieces.map((p) => p.correctX + p.width)) - originX;
  const drawHeight =
    Math.max(...pieces.map((p) => p.correctY + p.height)) - originY;

  /* draw opaque hint image in background */
  ctx.save(); /* save current canvas state */
  ctx.globalAlpha = 0.5; /* subtle opacity for hint */
  ctx.drawImage(img, originX, originY, drawWidth, drawHeight);
  ctx.restore();

  /* draw each piece of the image at its current position */
  pieces.forEach((piece) => {
    ctx.drawImage(
      img,
      piece.srcX,
      piece.srcY,
      piece.srcW,
      piece.srcH,
      piece.currentX,
      piece.currentY,
      piece.width,
      piece.height,
    );
  });

  /* draw grid overlay */
  drawGrid(ctx, canvasEl, rows, cols, originX, originY, drawWidth, drawHeight);
}

/////////////
/* Randomise puzzle pieces initial location on the canvas */
/////////////

function shufflePuzzlePieces(pieces, canvasEl) {
  const sectionWidth = canvasEl.width;
  const sectionHeight = canvasEl.height;
  for (let i = 0; i < pieces.length; i++) {
    let location = {
      x: Math.random() * (sectionWidth - pieces[i].width),
      y: Math.random() * (sectionHeight - pieces[i].height),
    };
    pieces[i].currentX = location.x;
    pieces[i].currentY = location.y;
  }
}

/////////////
/* Determine which puzzle piece is being pressed based on mouse coordinates */
/////////////

function pressedPiece(x, y, pieces) {
  for (let i = pieces.length - 1; i >= 0; i--) {
    const piece = pieces[i];
    if (
      x >= piece.currentX &&
      x < piece.currentX + piece.width &&
      y >= piece.currentY &&
      y < piece.currentY + piece.height
    ) {
      return piece;
    }
  }
  return null;
}

/* convert mouse coordinates to canvas space
since coordinates from mouse event are relative to the viewport and canvas is not positioned at the top-left corner (0,0) of the viewport */
function getMousePos(canvasEl, e) {
  const rect = canvasEl.getBoundingClientRect(); //Gets the exact position and size of the canvas element on the screen
  /* account for devicePixelRatio or CSS scaling so hit-testing stays accurate */
  const scaleX = canvasEl.width / rect.width;
  const scaleY = canvasEl.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX, //left edge of canvas scaled to drawing buffer
    y: (e.clientY - rect.top) * scaleY, //top edge of canvas scaled to drawing buffer
    //clientX and clientY are mouse coordinates relative to the viewport
  };
}

/////////
/* Methods added to puzzle piece for snapping and proximity check */
/////////

function isClose(piece) {
  /* Calculate distance between current and correct position */
  const dx = piece.currentX - piece.correctX;
  const dy = piece.currentY - piece.correctY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  /* Set threshold to 33% of average piece dimension */
  const threshold = ((piece.width + piece.height) / 2) * 0.33;

  /* Check if distance is within threshold */
  const isCorrectLocation = distance <= threshold;
  return isCorrectLocation;
}

/////////
/* Snap piece to its correct position */
/////////

function snap(piece) {
  /* Move piece to correct location */
  piece.currentX = piece.correctX;
  piece.currentY = piece.correctY;
}

/* required difficultyLvl function from difficultyLvl.js */

export { drawGrid };
