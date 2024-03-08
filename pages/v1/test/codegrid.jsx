/*
SELECT 
c.subgrupo_idsubgrupo,
c.idcodigo,
c.codigo ,   
replace( REGEXP_SUBSTR(c.codigo, 'ESF[\+\-\.0-9]+'), 'ESF', '') AS 'esf',  
REPLACE( REGEXP_SUBSTR(c.codigo, 'CIL[\+\-\.0-9]+'), 'CIL', '') AS 'cil'
FROM codigo c WHERE  c.subgrupo_idsubgrupo=1386;

*/

import Canvas from "@/components/etc/Canvas";

export default function CodeGridTest(){
    
    
    return <>
        <Canvas />
    </>
}