const track = document.getElementById("imgtrack");
window.onmousedown = (e) => {
  track.dataset.md = e.clientX;
};
window.onmouseup = (e) => {
  track.dataset.md = "0";
  track.dataset.prev = track.dataset.percentage;
};
window.onmousemove = (e) => {
  if (track.dataset.md === "0") return;
  const mouseDelta = parseFloat(track.dataset.md) - e.clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prev) + percentage;
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    -100
  );
  track.dataset.percentage = nextPercentage;
  track.animate(
    { transform: `translate(${nextPercentage}%, -50%)` },
    { duration: 1200, fill: "forwards" }
  );
  track.style.transform = console.log(nextPercentage);
  for (const image of track.getElementsByClassName("img")) {
    image.animate(
      { objectPosition: `${nextPercentage + 100}% 50%` },
      { duration: 1200, fill: "forwards" }
    );
  }
};
