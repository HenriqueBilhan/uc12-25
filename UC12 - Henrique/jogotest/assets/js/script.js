class HorrorGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Jogador
        this.player = {
            x: 8, y: 8, 
            speed: 0.12,
            size: 15,
            running: false
        };
        
        // Stats
        this.health = 100;
        this.fear = 5;
        this.gems = 0;
        this.time = 0;
        
        // Controles
        this.keys = {};
        this.gameActive = true;
        
        // Mapa 20x20
        this.map = this.generateMap();
        this.tileSize = 40;
        
        this.init();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    generateMap() {
        const map = [];
        for(let y = 0; y < 20; y++) {
            map[y] = [];
            for(let x = 0; x < 20; x++) {
                if(x === 0 || x === 19 || y === 0 || y === 19 || 
                   (x % 3 === 0 && y % 3 === 0)) {
                    map[y][x] = 1; // Parede
                } else if(Math.random() < 0.03 && map[y][x] !== 1) {
                    map[y][x] = 2; // Gema
                } else {
                    map[y][x] = 0; // Chão
                }
            }
        }
        // Garantir 3 gemas
        map[3][5] = 2;
        map[12][15] = 2;
        map[7][3] = 2;
        return map;
    }
    
    init() {
        window.addEventListener('resize', () => this.resizeCanvas());
        document.addEventListener('keydown', (e) => this.handleKey(e, true));
        document.addEventListener('keyup', (e) => this.handleKey(e, false));
        
        this.gameLoop();
        this.showMessage('Bem-vindo à Mansão Assombrada! Encontre as 3 gemas!', 4000);
    }
    
    handleKey(e, pressed) {
        this.keys[e.code] = pressed;
        if(e.code === 'Space') e.preventDefault();
        if(e.code === 'KeyE') this.interact();
        if(e.code === 'KeyR') this.restart();
    }
    
    update() {
        if(!this.gameActive) return;
        
        this.time += 1/60;
        this.movePlayer();
        this.updateStats();
        this.checkWin();
    }
    
    movePlayer() {
        let dx = 0, dy = 0;
        const speed = this.player.running ? this.player.speed * 2.2 : this.player.speed;
        
        if(this.keys['KeyW'] || this.keys['ArrowUp']) dy -= speed;
        if(this.keys['KeyS'] || this.keys['ArrowDown']) dy += speed;
        if(this.keys['KeyA'] || this.keys['ArrowLeft']) dx -= speed;
        if(this.keys['KeyD'] || this.keys['ArrowRight']) dx += speed;
        
        const newX = Math.max(1, Math.min(18, this.player.x + dx));
        const newY = Math.max(1, Math.min(18, this.player.y + dy));
        
        if(this.map[Math.floor(newY)]?.[Math.floor(newX)] !== 1) {
            this.player.x = newX;
            this.player.y = newY;
        }
        
        this.player.running = this.keys['Shift'];
    }
    
    interact() {
        const x = Math.floor(this.player.x);
        const y = Math.floor(this.player.y);
        
        if(this.map[y][x] === 2) {
            this.gems++;
            this.map[y][x] = 0;
            this.health = Math.min(100, this.health + 15);
            this.fear = Math.max(0, this.fear - 20);
            this.showMessage(`💎 Gema ${this.gems}/3 coletada!`, 2000);
        } else {
            this.showMessage('Nada aqui... só escuridão.', 1000);
        }
    }
    
    updateStats() {
        // Medo bem lento
        this.fear += 0.015;
        if(this.player.running) this.fear -= 0.04;
        if(this.gems > 0) this.fear -= 0.01;
        this.fear = Math.max(0, Math.min(100, this.fear));
        
        // Jumpscare raro
        if(this.fear > 85 && Math.random() < 0.003) {
            this.jumpscare();
        }
    }
    
    checkWin() {
        if(this.gems >= 3) {
            this.showMessage('🎉 VITÓRIA! Você escapou da mansão!', 5000);
            setTimeout(() => this.restart(), 5000);
        }
        
        if(this.health <= 0) {
            this.gameOver();
        }
    }
    
    render() {
        // Limpar
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Câmera
        const camX = (this.player.x - this.canvas.width/(2*this.tileSize)) * this.tileSize;
        const camY = (this.player.y - this.canvas.height/(2*this.tileSize)) * this.tileSize;
        
        // Mapa
        for(let y = 0; y < this.map.length; y++) {
            for(let x = 0; x < this.map[y].length; x++) {
                const screenX = x * this.tileSize - camX;
                const screenY = y * this.tileSize - camY;
                
                if(screenX > -this.tileSize && screenX < this.canvas.width &&
                   screenY > -this.tileSize && screenY < this.canvas.height) {
                    
                    if(this.map[y][x] === 1) {
                        // Parede
                        const g = 20 + Math.sin(this.time * 2 + x + y) * 5;
                        this.ctx.fillStyle = `rgb(${g},${g/2},0)`;
                        this.ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);
                        this.ctx.strokeStyle = '#660000';
                        this.ctx.lineWidth = 2;
                        this.ctx.strokeRect(screenX, screenY, this.tileSize, this.tileSize);
                    } else {
                        // Chão
                        this.ctx.fillStyle = '#1a1a1a';
                        this.ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);
                    }
                    
                    if(this.map[y][x] === 2) {
                        // Gema
                        this.ctx.save();
                        this.ctx.translate(screenX + this.tileSize/2, screenY + this.tileSize/2);
                        this.ctx.shadowColor = '#ffff00';
                        this.ctx.shadowBlur = 20;
                        this.ctx.fillStyle = '#ffff44';
                        this.ctx.beginPath();
                        this.ctx.arc(0, 0, 12, 0, Math.PI * 2);
                        this.ctx.fill();
                        this.ctx.restore();
                    }
                }
            }
        }
        
        // Jogador
        this.ctx.save();
        this.ctx.translate(
            this.canvas.width/2, 
            this.canvas.height/2
        );
        this.ctx.shadowColor = '#00ff88';
        this.ctx.shadowBlur = 25;
        this.ctx.fillStyle = this.health > 50 ? '#00ff88' : '#ff4444';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.player.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
        
        // Efeito medo
        if(this.fear > 40) {
            this.ctx.fillStyle = `rgba(150,0,0,${(this.fear-40)/400})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    updateHUD() {
        document.getElementById('health').textContent = Math.floor(this.health);
        document.getElementById('fear').textContent = Math.floor(this.fear);
        document.getElementById('gems').textContent = this.gems;
    }
    
    showMessage(text, duration = 2500) {
        const msg = document.getElementById('message');
        msg.textContent = text;
        msg.style.display = 'block';
        setTimeout(() => {
            msg.style.display = 'none';
        }, duration);
    }
    
    jumpscare() {
        // Simples flash vermelho
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.health -= 12;
        this.fear += 15;
        this.showMessage('😱 ALGO TE VIU!', 1500);
    }
    
    gameOver() {
        this.gameActive = false;
        const minutes = Math.floor(this.time / 60);
        const seconds = Math.floor(this.time % 60);
        document.getElementById('finalStats').innerHTML = `
            Tempo: ${minutes}:${seconds.toString().padStart(2, '0')}<br>
            Gemas coletadas: ${this.gems}/3
        `;
        document.getElementById('gameOver').style.display = 'flex';
    }
    
    restart() {
        location.reload();
    }
    
    gameLoop() {
        this.update();
        this.render();
        this.updateHUD();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// INICIAR JOGO
const game = new HorrorGame();
window.game = game;