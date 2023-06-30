const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1520
canvas.height = 690
const gravity = 0.15
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
            height: 4
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
        platformCollisionBlocks,
        imageSrc: './images/warrior/Idle.png',
        frameRate: 10,
        animations: {
            Idle: {
                imageSrc: './images/warrior/Idle.png',
                frameRate: 10,
                frameBuffer: 6,
            },
            Run: {
                imageSrc: './images/warrior/Run.png',
                frameRate: 8,
                frameBuffer: 5,
            },
            Jump: {
                imageSrc: './images/warrior/Jump.png',
                frameRate: 3,
                frameBuffer: 4,
            },
            JumpLeft: {
                imageSrc: './images/warrior/JumpLeft.png',
                frameRate: 3,
                frameBuffer: 4,
            },
            Fall: {
                imageSrc: './images/warrior/Fall.png',
                frameRate: 3,
                frameBuffer: 4,
            },
            FallLeft: {
                imageSrc: './images/warrior/FallLeft.png',
                frameRate: 3,
                frameBuffer: 4,
            },
            RunLeft: {
                imageSrc: './images/warrior/RunLeft.png',
                frameRate: 8,
                frameBuffer: 5,
            },
            IdleLeft: {
                imageSrc: './images/warrior/IdleLeft.png',
                frameRate: 10,
                frameBuffer: 6,
            },
            Attack1: {
                imageSrc: './images/warrior/Attack1.png',
                frameRate: 7,
                frameBuffer: 6,
            },
            Attack2: {
                imageSrc: './images/warrior/Attack2.png',
                frameRate: 7,
                frameBuffer: 8,
            },
            Attack3: {
                imageSrc: './images/warrior/Attack3.png',
                frameRate: 8,
                frameBuffer: 8,
            },
            Death: {
                imageSrc: './images/warrior/Take hit.png',
                frameRate: 3,
                frameBuffer: 5,
            },
        }
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
    j: {
        pressed: false,
    },
    k: {
        pressed: false,
    },
    l: {
        pressed: false,
    },
    m: {
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

const backgroundImageHeight = 432
const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaled.height
    },
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.scale(4,4)
    c.translate(camera.position.x, camera.position.y)
    background.update()

    // collisionBlocks.forEach(collisionBlocks => {
    //     collisionBlocks.update()
    // })

    // platformCollisionBlocks.forEach(block => {
    //     block.update()
    // })
    
    ronin.refresh() //update

    ronin.velocity.x = 0
    if(movement.d.pressed) {
        ronin.switchSprite('Run')
        ronin.velocity.x = 2.5
        ronin.lastDirection = 'right'
        ronin.shouldPanCameraLeft({canvas, camera})
    } else if (movement.a.pressed){
        ronin.switchSprite('RunLeft')
        ronin.velocity.x = -2.5
        ronin.lastDirection = 'left'
        ronin.shouldPanCameraRight({canvas, camera})
    }
    else if(ronin.velocity.y === 0){
        if(ronin.lastDirection === 'right')
            ronin.switchSprite('Idle')
        else
            ronin.switchSprite('IdleLeft')
    }

    if(ronin.velocity.y < 0) {
        ronin.shouldPanCameraDown({camera, canvas})
        if(ronin.lastDirection === 'right')
            ronin.switchSprite('Jump')
        else
            ronin.switchSprite('JumpLeft')
    } else if(ronin.velocity.y > 0){
        ronin.shouldPanCameraUp({camera, canvas})
        if(ronin.lastDirection === 'right')
            ronin.switchSprite('Fall')
        else
            ronin.switchSprite('FallLeft')
    }

    if(movement.j.pressed) {
        ronin.switchSprite('Attack1')
    }

    if(movement.k.pressed) {
        ronin.switchSprite('Attack2')
    }

    if(movement.l.pressed) {
        ronin.switchSprite('Attack3')
    }

    if(movement.m.pressed) {
        ronin.switchSprite('Death')
        c.fillStyle = 'rgba(220, 0, 0, 0.3)'
        c.fillRect(ronin.hitbox.position.x, ronin.hitbox.position.y, ronin.hitbox.width, ronin.hitbox.height)
        c.fillStyle = 'rgba(0, 255, 0, 0.2)'
        c.fillRect(ronin.position.x, ronin.position.y, ronin.width, ronin.height)
    }
    
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
                ronin.velocity.y = -4
                break
            case 'j':
                movement.j.pressed = true
                break
            case 'k':
                movement.k.pressed = true
                break
            case 'l':
                movement.l.pressed = true
                break
            case 'm':
                movement.m.pressed = true
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
        case 'j':
            movement.j.pressed = false
            break
        case 'k':
            movement.k.pressed = false
            break
        case 'l':
            movement.l.pressed = false
            break
        case 'm':
            movement.m.pressed = false
            break
    }
}
)