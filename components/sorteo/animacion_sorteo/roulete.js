const { public_urls, local_base_url } = require("@/src/urls")

class Roulette {
    constructor(){
        this.names = []
        this.sin_array = []
        this.cos_array = []
        this.distances = []
        this.offset_x = -3400
        this.offset_y = 400
        this.radius = 3600.0
        this.delay = 0
        this.ticks =this.delay
        this.count = 0
        this.winner_index = 125
        this.max_delay = 2
        this.done=false
        this.loading=true
        this.loops = 300
        this.slow_dist = 16
        this.onComplete = null
        this.bg=null
    }

    init = participants =>
        {
            this.bg=new Image()
            
            for(let i=0;i<participants.length;i++)
            {
                this.names.push(participants[i].cliente)
                this.distances.push(this.slow_dist)
            }
           
            const variation = 360 / this.names.length
            console.log(variation)
            let st = 0
            
            this.names.forEach(_=>{
                this.sin_array.push(Math.sin((Math.PI / 180) * st))
                this.cos_array.push(Math.cos((Math.PI / 180) * st))
                st+=variation
                
            })
        
            for(let i=0;i<this.slow_dist;i++)
            {
                let idx = this.winner_index - i 
                idx = idx<0 ? this.names.length + this.winner_index - i : idx
                this.distances[idx] = i
            }

            

            this.bg.onload  = ()=>{
                this.loading=false
            }
            this.bg.src = "http://localhost:3000/" + 'bg_sorteo.png';
            //this.loading=false

        }
        
    update = canvasRef => {
            if(this.done)
                {
                   // alert("done")
                    this.onComplete?.()
                    this.onComplete=null
                    return
                }

            const ctx = canvasRef.getContext("2d")

            

            if(this.loading)
            {//alert("done")
                //ctx.drawImage(this.bg, 0, 0);
                ctx.fillStyle="#003E8B"
                ctx.fillRect(0,0,1200,800)
                ctx.font = "50px Arial"
                ctx.fillStyle =  "white"
                ctx.fillText("Cargando Participantes...",300,300) 
                return
            }

            
            let _delay = this.delay

            if(this.loops<1 && this.distances[this.count%this.names.length]<this.slow_dist)
            {
                _delay += this.slow_dist* 1.1 - this.distances[this.count%this.names.length] * 1.1
            }
        
            if(this.ticks>_delay)
            {
                ctx.fillStyle ="white"
        
                ctx.drawImage(this.bg, 0, 0);

                if(this.loops<1)
                {
                    if(this.delay<this.max_delay)
                    {
                        this.delay+=.1  
                    } 
                }
                
                this.loops--
                
                this.ticks=0
        
                
                
                ctx.fillStyle ="white"

                let position0_name = ""
                let position0_x = ""
                let position0_y = ""
                let startIndex = 0
                for(let i=0;i<this.names.length;i++)
                {
                    const position_x = parseInt(this.radius * this.cos_array[i]) + this.offset_x
                    const position_y = parseInt(this.radius * this.sin_array[i]) + this.offset_y
            
                    if(position_x<60 || position_y<60 || position_x> 740 || position_y>740)
                        continue
            
                    ctx.font = i==0 ? "50px Arial": "30px Arial"
                    ctx.fillStyle = i!=0 ? "gray" : "white"
                    const current_name = this.names[(i + this.count) % this.names.length]
            
                    if(i==0)
                    {
                        position0_name = current_name
                        position0_x = position_x
                        position0_y = position_y
                    }
                    
                    ctx.fillText(current_name,position_x,position_y) 
                }
                ctx.font = "50px Arial"
                ctx.fillStyle =  "white"
                ctx.fillText(position0_name,position0_x,position0_y) 
        
                if(this.count%this.names.length== this.winner_index && this.delay >= this.max_delay)
                    {
                        this.done=true
                    }
                
                    this.count++
        
            }
            this.ticks++
        }
}

module.exports = {Roulette}