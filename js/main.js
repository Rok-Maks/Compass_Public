const images = [];
const totalFrames = 28;
var latMe = -49.0 // координати цілі (мене)
var lonMe = -50.6
var latUs = 50.448280 //координати користувача (user) за замовчуванням
var lonus = 30.530093
var angleRadians = Math.atan2(latMe - latUs, lonMe - lonus);
var angleDegrees = angleRadians * (180 / Math.PI);

function preloadImages() {
  for (let i = 0; i < totalFrames; i++) {
    const img = new Image();
    img.src = `../CompassImages/${i}.png`;
    images.push(img);
  }
}

preloadImages();

window.addEventListener("deviceorientationabsolute", (event) => {
  const x = event.alpha;
  var angleRadians = Math.atan2(latMe - latUs, lonMe - lonus);
  var angleDegrees = angleRadians * (180 / Math.PI);
  var compassHeading = (event.alpha+angleDegrees)%360;
  if (event.absolute === true) {
    document.getElementById('rotation-output').textContent = "Compass Heading (absolute):"  + (compassHeading) + "\nNorth:"+ event.alpha + "\nTarget: angleDegrees";
  } else {
    document.getElementById('rotation-output').innerText =
    "Compass Heading: " + compassHeading +
    "\nNorth: " + x +
    "\nTarget: " + angleDegrees;  
  }

  let frameIndex = Math.round(compassHeading / (360 / totalFrames)) % totalFrames;
  frameIndex = (frameIndex + 14) % totalFrames;

  document.querySelector(".CompassImage").style.backgroundImage = `url('../CompassImages/${frameIndex}.png')`;

document.querySelector(".enchant-effect").style.webkitMaskImage = `url('../CompassImages/${frameIndex}.png')`;

document.querySelector(".enchant-effect").style.maskImage = `url('../CompassImages/${frameIndex}.png')`;

});

document.getElementById('get-location-btn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latMe = position.coords.latitude.toFixed(6);
        lonMe = position.coords.longitude.toFixed(6);
        angleRadians = Math.atan2(latMe - latUs, lonMe - lonus);
        angleDegrees = angleRadians * (180 / Math.PI);
        document.getElementById('location-output').textContent =
          `Моя позиція: ${latMe}, ${lonMe} \n ${angleDegrees}`;
      },
      (error) => {
        alert('Користувач не дозволив геолокацію');
      }
    );
  } else {
    document.getElementById('location-output').textContent =
      'Геолокація не підтримується в цьому браузері';
  }
});

function updateVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Виклик при завантаженні
updateVh();

// Оновлювати при зміні розміру
window.addEventListener('resize', updateVh);

