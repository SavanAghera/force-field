const ctx = document.getElementById("canvas").getContext("2d");
const canvas = document.getElementById("lifeBoard");
const radius = 2;
const canvasSize = 600;
const distanceBtwnMegnets = 50;
let noOfParticles = 1;
let startTime = 0;
let animationFrame;
let magnets = [];
let partials = [];
function createMagnets() {
    magnets = []
    for (
        let i = distanceBtwnMegnets;
        i < canvasSize;
        i += distanceBtwnMegnets
    ) {
        for (
            let j = distanceBtwnMegnets;
            j < canvasSize;
            j += distanceBtwnMegnets
        ) {
            if (isRandom.checked) {
                if (Math.random() * 100 < parseInt(randomRangeInput.value)) {
                    magnets.push({ x: i, y: j });
                }
            } else {
                magnets.push({ x: i, y: j });
            }
        }
    }
}
function createParticles() {
    partials = [];
    for (let i = 0; i < noOfParticles; i++) {
        partials.push(getParticleWithPosition())
    }

}
function getParticleWithPosition() {
    return {
        x: getRandom(),
        y: getRandom(),
        vx: 0,
        vy: 0
    }

}

function getRandom() {
    return Math.round(Math.random() * canvasSize);
}

function getDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function update(time) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    const force = parseInt(forceValue.value) || 0;
    for (let j = 0; j < partials.length; j++) {
        ctx.fillStyle = "green";
        for (let i = 0; i < magnets.length; i++) {
            ctx.fillRect(magnets[i].x, magnets[i].y, radius, radius);
            const distance = getDistance(partials[j], magnets[i]);
            let v = force / distance ** 2;

            partials[j].vx += v * (magnets[i].x - partials[j].x);
            partials[j].vy += v * (magnets[i].y - partials[j].y);
        }

        partials[j].x += partials[j].vx * (((time - startTime) / 1000) || 1);
        partials[j].y += partials[j].vy * (((time - startTime) / 1000) || 1);

        ctx.fillStyle = "red";
        ctx.fillRect(partials[j].x, partials[j].y, radius, radius);
    }

    startTime = time;
    animationFrame = requestAnimationFrame(update);
} 

function start() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }

    noOfParticles = parseInt(particlesNo.value)
    createMagnets();
    createParticles();
    update();
}
start();