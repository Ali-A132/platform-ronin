class Ronin {
    constructor({position, collisionBlocks, imageSrc, frameRate = 1, scale = 0.6}) {
        this.position = position
        this.scale = scale
        this.image = new Image()
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
        }
        this.image.src = imageSrc
        this.frameRate = frameRate
        this.currentFrame = 0
        this.frameBuffer = 5
        this.elapsedFrames = 0
        this.velocity = {
            x: 0,
            y: 1
        }
        this.collisionBlocks = collisionBlocks
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 40,
                y: this.position.y + 33,
            },
            width: 17,
            height: 28,
        }
    }


    draw() {
        if(!this.image) return

        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }

        c.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y, this.width, this.height)
    }

    // UPDATE
    refresh()  {
        this.updateFrames()
        this.updateHitbox()


        c.fillStyle = 'rgba(0, 255, 0, 0.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        c.fillStyle = 'rgba(255, 0, 0, 0.2)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        
        
        
        this.draw()
        this.position.x += this.velocity.x
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.updateHitbox()
        this.checkForVerticalCollisions()

    }

    updateFrames() {
        this.elapsedFrames++
        if(this.elapsedFrames % this.frameBuffer === 0) {
        if(this.currentFrame < this.frameRate - 1)
            this.currentFrame++
        else
            this.currentFrame = 0
        }
    }

    checkForHorizontalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            if(this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y && this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height && this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x){
                if(this.velocity.x > 0) {
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width


                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }

                if(this.velocity.x < 0) {
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x


                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.position.y += this.velocity.y
        
        this.velocity.y += gravity
    }


    checkForVerticalCollisions() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            if(this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y && this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height && this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x){
                if(this.velocity.y > 0) {
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }

                if(this.velocity.y < 0) {
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }
            }
        }
    }

}