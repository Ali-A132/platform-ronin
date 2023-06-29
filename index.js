const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
const gravity = 0.4
const scaled = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const FloorCollisions2D = []
for (let i = 0; i < FloorCollisions.length; i += 36) {
    FloorCollisions2D.push(FloorCollisions.slice(i, i + 36))
}

const collisionBlocks = []
FloorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol == 192) {
            console.log('draw a block here!')
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
            },
        })
        )
    }
})
}) 

const PlatformCollisions2D = []
for (let i = 0; i < PlatformCollisions.length; i += 36) {
    PlatformCollisions2D.push(PlatformCollisions.slice(i, i + 36))
}

const platformCollisionBlocks = []
PlatformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol == 192) {
            console.log('draw a block here!')
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
            },
        })
        )
    }
})
}) 

const ronin = new Ronin({
        position: {
            x: 100,
            y: 300,
        },
        collisionBlocks,
        imageSrc: './images/warrior/Idle.png',
        frameRate: 10,
    }
)


//keys
const movement = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
}

const background = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: './images/background-platform-dimension.png',
})
  

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.scale(4, 4)
    c.translate(0, -background.image.height + scaled.height)
    background.update()

    collisionBlocks.forEach(collisionBlocks => {
        collisionBlocks.update()
    })

    platformCollisionBlocks.forEach(block => {
        block.update()
    })

    ronin.refresh() //update

    ronin.velocity.x = 0
    if(movement.d.pressed)
        ronin.velocity.x = 5
    else if (movement.a.pressed)
        ronin.velocity.x = -5
    
    c.restore()

}

animate()

window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'd':
                movement.d.pressed = true
                break
            case 'a':
                movement.a.pressed = true
                break
            case 'w':
                ronin.velocity.y = -7
                break
        }
    }
)

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            movement.d.pressed = false
            break
        case 'a':
            movement.a.pressed = false
            break
    }
}
)