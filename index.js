const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
const gravity = 0.4

class Ronin {
    constructor(position) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1
        }
        this.height = 100
    }
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, 100, this.height)
    }

    // UPDATE
    refresh()  {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y < canvas.height)
            this.velocity.y += gravity
        else
            this.velocity.y = 0
    }
}

const ronin = new Ronin({
        x: 0,
        y: 0,
    }
)
const samurai = new Ronin({
        x: 300,
        y: 100,
    }
)

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    ronin.refresh() //update
    samurai.refresh()
}

animate()

window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'd':
                ronin.velocity.x = 1
                break
            case 'a':
                ronin.velocity.x = -1
                break
            case 'w':
                ronin.velocity.y = -15
                break
        }
    }
)