const codes = []

const check_node = (n, items) => {
	if(n.length<1)
	{
		for(let i=0;i<items.length;i++)
		{
			n.push(items[i])
		}
	}
	else
	{
		for(let i=0;i<n.length;n++){
			check_node(n[i])
		}
	}
}

const add_range = (params) => {

	var start = 0
	var step = .25
	var end = 6
	
	for(let j=start;j<=end;j+=step){
			
	}
	
}

const add_list = (params) => {
	//just split 
	const parts = params.split(';')
	const items= []
	for(let i=0;i<parts.length;i++){
			items.push(parts[i])
    }
	check_node(params,items)
}
