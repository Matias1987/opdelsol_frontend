const names = []
/*
    
    ]; */

const sin_array = []
const cos_array = []
const distances = []

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

const offset_x = -3400
const offset_y = 400

const radius = 3600.0

let delay = 0

let ticks =delay

let count = 0

const winner_index = 500

const max_delay = 5

let done=false

let loops = 800

const slow_dist = 64

const init =  ()=>
{
    for(let i=0;i<600;i++)
    {
        names.push("Participant Nro." + i )
        distances.push(slow_dist)
    }
    ctx.font = "30px Arial";

    const variation = 360 / names.length
    console.log(variation)
    let st = 0
    
    names.forEach(_=>{
        //const grad = st > 180 ? 180-st : st
        //console.log(grad)
        sin_array.push(Math.sin((Math.PI / 180) * st))
        cos_array.push(Math.cos((Math.PI / 180) * st))
        st+=variation
        //console.log("st: " + st)
        
    })

    for(let i=0;i<slow_dist;i++)
    {
        let idx = winner_index - i 
        idx = idx<0 ? names.length + winner_index - i : idx
        distances[idx] = i
    }
    console.log("winner: " + winner_index)
    console.log(JSON.stringify(distances))
    //console.log(JSON.stringify(cos_array))
}

const update = _ => {
    

    if(done)
        return
    let _delay = delay
    if(loops<1 && distances[count%names.length]<slow_dist)
    {
        _delay += slow_dist* 1.2 - distances[count%names.length] * 1.2
    }

    if(ticks>_delay)
    {
        if(loops<1)
        {
            if(delay<max_delay)
            {

                delay+=.1  
            } 

        }
        
        loops--
        
        ticks=0

        ctx.fillStyle ="white"

        ctx.fillRect(0,0,1200,1200)
        
        ctx.fillStyle ="black"
        //console.log("sfasfasdf")
        let position0_name = ""
        let position0_x = ""
        let position0_y = ""
        let startIndex = 0
        for(let i=0;i<names.length;i++)
        {
            
            
            
            const position_x = parseInt(radius * cos_array[i]) + offset_x
            const position_y = parseInt(radius * sin_array[i]) + offset_y
    
            if(position_x<20 || position_y<20 || position_x> 1000 || position_y>1000)
                continue
    
            ctx.font = i==0 ? "50px Arial": "30px Arial"
            ctx.fillStyle = i!=0 ? "gray" : "black"
            const current_name = names[(i + count) % names.length]
    
            if(i==0)
            {
                position0_name = current_name
                position0_x = position_x
                position0_y = position_y
            }
            //console.log(JSON.stringify({x:position_x, y:position_y}))
            ctx.fillText(current_name,position_x,position_y) 
        }
        ctx.font = "50px Arial"
        ctx.fillStyle =  "black"
        ctx.fillText(position0_name,position0_x,position0_y) 

        //console.log(count)
        if(count%names.length== winner_index && delay >= max_delay)
            {
                done=true
            }
        
            count++

    }

    
    
    
    ticks++

    //console.log(delay)

   
}

init()
update()
setInterval(_=>{
    update()
},0)


