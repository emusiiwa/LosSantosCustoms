
// Get all elements with the 'zoom-paragraph' class
var paragraphs = document.querySelectorAll('.team_member');
// Add event listeners to each paragraph
paragraphs.forEach(function (paragraph) {
  // Add a mouseover event listener
  paragraph.addEventListener('mouseover', function () {
    // Add the 'zoomed' class to apply the zoom effect
    this.classList.add('zoomed');
  });

  // Add a mouseout event listener
  paragraph.addEventListener('mouseout', function () {
    // Remove the 'zoomed' class to revert to the original size
    this.classList.remove('zoomed');
  });
});
