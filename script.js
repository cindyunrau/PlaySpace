import { MagneticObject } from "./scripts/magnet.js";

document.addEventListener("DOMContentLoaded", function() {
    
    const magnet = document.querySelector(".lil-guy");
    new MagneticObject(magnet);

});