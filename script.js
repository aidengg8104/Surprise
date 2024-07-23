// Danh sách lời chúc
const messages = [
    "Chúc bạn có một ngày sinh nhật vui vãi loz",
    "Năm nay tớ hơi bận nên quà hơi sơ sài xíu, mới học lỏm nên còn lỏ lắm. Mong là bạn thích (hoặc không) ><",
    "Chúc bạn sớm được TOPIK 6",
    "Chúc bạn mau cưới được DK để tôi bú ké Jeonghan",
    "Chúc bạn tìm được job phù hợp với năng lực và sức khỏe tinh thần =))))",
    "Chúc bạn va phải Jack và nhận được 5 triệu đồng",
    "Chúc bạn gặp được hết hsv trong thời gian gần nhất",
    "Chúc bạn móc l điêu luyện hơn",
    "Chúc bạn không gặp những con người hỗn làm nữa",
    "Cảm ơn vì sự có mặt của bạn những lúc tôi cần <3",
    "Chúc bạn tuổi mới đẹp gái",
    "Chúc bạn sớm được cục vàng Yue",
    "Chúc bạn chơi Mina support không tranh phụ trợ với Annette đi top ạ",
    "Chúc bạn và tớ sớm được chuỗi 100",
    "Chúc Thanh Tùng hair salon làm ăn phát tài phát đạt",
    "Chúc cô Hằng chú Hiệu sớm có rể Hàn",
    "Chúc bạn ngủ ngon"
];

// Thay đổi lời chúc
function changeMessage() {
    document.getElementById('birthday-message').innerText = messages[Math.floor(Math.random() * messages.length)];
}

// Khởi tạo lời chúc
document.getElementById('birthday-message').innerText = messages[Math.floor(Math.random() * messages.length)];

// Hiệu ứng pháo hoa
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function Firework(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.angle = Math.atan2(targetY - y, targetX - x);
    this.speed = 2;
    this.acceleration = 1.05;
    this.brightness = random(50, 70);
    this.alpha = 1;
    this.coordinates = [];
    this.coordinateCount = 5;
    while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
    }
}

Firework.prototype.update = function(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    if (this.alpha <= 0.1) {
        fireworks.splice(index, 1);
    }
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.speed *= this.acceleration;
    this.alpha -= 0.02;
    if (this.alpha < 0) this.alpha = 0;
    if (this.x >= this.targetX && this.y >= this.targetY) {
        createParticles(this.targetX, this.targetY);
        fireworks.splice(index, 1);
    }
};

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(0, Math.PI * 2);
    this.speed = random(1, 10);
    this.friction = 0.95;
    this.gravity = 1;
    this.hue = random(0, 360);
    this.brightness = random(50, 80);
    this.alpha = 1;
    this.decay = random(0.01, 0.03);
}

Particle.prototype.update = function(index) {
    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= this.decay;
    if (this.alpha <= this.decay) {
        particles.splice(index, 1);
    }
};

function createParticles(x, y) {
    let particleCount = 30;
    while (particleCount--) {
        particles.push(new Particle(x, y));
    }
}

function drawFirework() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    fireworks.forEach((firework, index) => {
        firework.update(index);
        ctx.beginPath();
        ctx.moveTo(firework.coordinates[firework.coordinates.length - 1][0], firework.coordinates[firework.coordinates.length - 1][1]);
        ctx.lineTo(firework.x, firework.y);
        ctx.strokeStyle = `hsl(${random(0, 360)}, 100%, ${firework.brightness}%)`;
        ctx.stroke();
    });
    particles.forEach((particle, index) => {
        particle.update(index);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, ${particle.brightness}%, ${particle.alpha})`;
        ctx.fill();
    });
}

const fireworks = [];
const particles = [];

// Tăng số lượng pháo hoa
setInterval(() => {
    const numFireworks = 3; // Tăng số lượng pháo hoa xuất hiện mỗi khoảng thời gian
    for (let i = 0; i < numFireworks; i++) {
        fireworks.push(new Firework(canvas.width / 2, canvas.height, random(0, canvas.width), random(0, canvas.height / 2)));
    }
}, 800);

function animate() {
    requestAnimationFrame(animate);
    drawFirework();
}

animate();
