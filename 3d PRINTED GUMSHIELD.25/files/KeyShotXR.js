window.keyshotXR = function (
  containerId,
  folderName,
  viewportWidth,
  viewportHeight,
  backgroundColor,
  horizontalFrames,
  verticalFrames,
  wrapHorizontal,
  wrapVertical,
  mouseSensitivityX,
  mouseSensitivityY,
  startFrameX,
  startFrameY,
  minZoom,
  maxZoom,
  rotationDamping,
  downScaleToBrowser,
  addDownScaleGUIButton,
  downloadOnInteraction,
  imageExtension,
  showLoading,
  loadingIcon,
  allowFullscreen
) {
  const container = document.getElementById(containerId);
  
  // Viewer state
  let currentFrameX = startFrameX || 0;
  let currentFrameY = startFrameY || 0;

  // Initialize the viewer
  function initializeViewer() {
    container.style.width = `${viewportWidth}px`;
    container.style.height = `${viewportHeight}px`;
    container.style.backgroundColor = backgroundColor;
    container.style.position = "relative";
    container.style.overflow = "hidden";

    // Add an image element for displaying frames
    const imageElement = document.createElement("img");
    imageElement.style.width = "100%";
    imageElement.style.height = "100%";
    imageElement.style.position = "absolute";
    container.appendChild(imageElement);

    // Set the initial frame
    updateFrame(imageElement, currentFrameX, currentFrameY);

    // Add scroll event listener
    addScrollListener(imageElement);
  }

  // Update the displayed frame based on currentFrameX and currentFrameY
  function updateFrame(imageElement, frameX, frameY) {
    const framePath = `${folderName}/${frameY}_${frameX}.${imageExtension}`;
    imageElement.src = framePath;
  }

  // Handle scroll interaction
  function addScrollListener(imageElement) {
    container.addEventListener("wheel", (event) => {
      event.preventDefault();

      // Calculate new frame based on scroll delta
      const scrollDelta = event.deltaY; // Positive for down, negative for up
      const sensitivity = mouseSensitivityX || -0.05; // Adjust sensitivity as needed

      currentFrameX += Math.round(scrollDelta * sensitivity);

      // Wrap frames if enabled
      if (wrapHorizontal) {
        currentFrameX = (currentFrameX + horizontalFrames) % horizontalFrames;
      } else {
        currentFrameX = Math.max(0, Math.min(horizontalFrames - 1, currentFrameX));
      }

      // Update the displayed frame
      updateFrame(imageElement, currentFrameX, currentFrameY);
    });
  }

  // Initialize the viewer on load
  initializeViewer();
};
