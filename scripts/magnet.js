import { lerp } from './utility.js';

export class MagneticObject {
    constructor(domElement) {
        this.domElement = domElement;
        this.boundingClientRect = this.domElement.getBoundingClientRect();
        this.interpolationFactor = 0.2;
        this.mousePosition = { x: ((this.boundingClientRect.left + this.boundingClientRect.right)/2), y: ((this.boundingClientRect.top + this.boundingClientRect.bottom)/4) };

        this.lerpingData = {
            x: { current: 0, target: 0 },
            y: { current: 0, target: 0 },
        };

        this.render();
        this.resize();
    }

    resize() {
        window.addEventListener("resize", () => {
            this.boundingClientRect = this.domElement.getBoundingClientRect();
        });
    }

    render() {
        window.addEventListener("mousemove", (e) => {
            this.mousePosition.x = e.pageX;
            this.mousePosition.y = e.pageY;
        });

        let targetHolder = { x: 0, y: 0 };

            this.domElement.classList.add("magnet");
            targetHolder.x =
                (this.mousePosition.x -
                    (this.boundingClientRect.left +
                        this.boundingClientRect.width / 2)) *
                1;
            targetHolder.y =
                (this.mousePosition.y -
                    (this.boundingClientRect.top +
                        this.boundingClientRect.height / 2)) *
                1;
            console.log(targetHolder);

        this.lerpingData["x"].target = targetHolder.x;
        this.lerpingData["y"].target = targetHolder.y;

        for (const item in this.lerpingData) {
            this.lerpingData[item].current = lerp(
                this.lerpingData[item].current,
                this.lerpingData[item].target,
                this.interpolationFactor
            );
        }

        this.domElement.style.transform = `translate(${this.lerpingData["x"].current}px, ${this.lerpingData["y"].current}px)`;

        window.requestAnimationFrame(() => this.render());
    }
}