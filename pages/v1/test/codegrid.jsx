/*
SELECT * 
FROM 
(
	SELECT 
	c.subgrupo_idsubgrupo,
	c.idcodigo,
	c.codigo ,   
	CAST(REPLACE(  REGEXP_SUBSTR(c.codigo, 'ESF[\+\-\.0-9]+'), 'ESF', '') AS DECIMAL(10,6)) AS 'esf_dec' ,
	CAST(REPLACE(  REGEXP_SUBSTR(c.codigo, 'CIL[\+\-\.0-9]+'), 'CIL', '') AS DECIMAL(10,6)) AS 'cil_dec' ,
	REPLACE(  REGEXP_SUBSTR(c.codigo, 'ESF[\+\-\.0-9]+'), 'ESF', '')  AS 'esf',  
	REPLACE(  REGEXP_SUBSTR(c.codigo, 'CIL[\+\-\.0-9]+'), 'CIL', '')  AS 'cil'
	FROM codigo c WHERE  c.subgrupo_idsubgrupo=1386

) AS c
ORDER BY
c.esf, c.cil;

*/

import Canvas from "@/components/etc/Canvas";

export default function CodeGridTest(){
    
    
    return <>
        <Canvas />
    </>
}