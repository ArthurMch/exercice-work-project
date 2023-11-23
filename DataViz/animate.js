// animation.
// 1 pluie.
/* goutte.onclick = function () {
	let start = Date.now(); // mémoriser l'heure de début

	let timer = setInterval(function () {
		// combien de temps s'est écoulé depuis le début ?
		let timePassed = Date.now() - start;

		goutte.style.left = timePassed / 5 + 'px';

		if (timePassed >= 2000) clearInterval(timer);

	}, 20);
}


let requestId = requestAnimationFrame(callback); */

function animate({timing, draw, duration}) {

	let start = performance.now();
  
	requestAnimationFrame(function animate(time) {
	  // timeFraction passe de 0 à 1
	  let timeFraction = (time - start) / duration;
	  if (timeFraction > 1) timeFraction = 1;
  
	  // calculer l'état courant de l'animation
	  let progress = timing(timeFraction)
  
	  draw(progress); // dessinez-le
  
	  if (timeFraction < 1) {
		requestAnimationFrame(animate);
	  }
  
	});
  }