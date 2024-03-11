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

	const test_data = {
		"table": "c",
		"data":
		[
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3370,
				"codigo": "ESF-0.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": -0.250000,
				"cil_dec": -0.250000,
				"esf": "-0.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3369,
				"codigo": "ESF-0.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": -0.250000,
				"cil_dec": -0.500000,
				"esf": "-0.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3368,
				"codigo": "ESF-0.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": -0.250000,
				"cil_dec": -0.750000,
				"esf": "-0.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3367,
				"codigo": "ESF-0.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": -0.250000,
				"cil_dec": -1.000000,
				"esf": "-0.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3366,
				"codigo": "ESF-0.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": -0.250000,
				"cil_dec": -1.250000,
				"esf": "-0.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3365,
				"codigo": "ESF-0.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": -0.250000,
				"cil_dec": -1.500000,
				"esf": "-0.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3364,
				"codigo": "ESF-0.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": -0.250000,
				"cil_dec": -1.750000,
				"esf": "-0.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3363,
				"codigo": "ESF-0.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": -0.250000,
				"cil_dec": -2.000000,
				"esf": "-0.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3371,
				"codigo": "ESF-0.25CIL0.00ORGBCO_STOCK",
				"esf_dec": -0.250000,
				"cil_dec": 0.000000,
				"esf": "-0.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3361,
				"codigo": "ESF-0.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": -0.500000,
				"cil_dec": -0.250000,
				"esf": "-0.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3360,
				"codigo": "ESF-0.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": -0.500000,
				"cil_dec": -0.500000,
				"esf": "-0.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3359,
				"codigo": "ESF-0.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": -0.500000,
				"cil_dec": -0.750000,
				"esf": "-0.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3358,
				"codigo": "ESF-0.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": -0.500000,
				"cil_dec": -1.000000,
				"esf": "-0.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3357,
				"codigo": "ESF-0.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": -0.500000,
				"cil_dec": -1.250000,
				"esf": "-0.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3356,
				"codigo": "ESF-0.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": -0.500000,
				"cil_dec": -1.500000,
				"esf": "-0.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3355,
				"codigo": "ESF-0.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": -0.500000,
				"cil_dec": -1.750000,
				"esf": "-0.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3354,
				"codigo": "ESF-0.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": -0.500000,
				"cil_dec": -2.000000,
				"esf": "-0.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3362,
				"codigo": "ESF-0.50CIL0.00ORGBCO_STOCK",
				"esf_dec": -0.500000,
				"cil_dec": 0.000000,
				"esf": "-0.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3352,
				"codigo": "ESF-0.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": -0.750000,
				"cil_dec": -0.250000,
				"esf": "-0.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3351,
				"codigo": "ESF-0.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": -0.750000,
				"cil_dec": -0.500000,
				"esf": "-0.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3350,
				"codigo": "ESF-0.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": -0.750000,
				"cil_dec": -0.750000,
				"esf": "-0.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3349,
				"codigo": "ESF-0.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": -0.750000,
				"cil_dec": -1.000000,
				"esf": "-0.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3348,
				"codigo": "ESF-0.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": -0.750000,
				"cil_dec": -1.250000,
				"esf": "-0.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3347,
				"codigo": "ESF-0.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": -0.750000,
				"cil_dec": -1.500000,
				"esf": "-0.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3346,
				"codigo": "ESF-0.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": -0.750000,
				"cil_dec": -1.750000,
				"esf": "-0.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3345,
				"codigo": "ESF-0.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": -0.750000,
				"cil_dec": -2.000000,
				"esf": "-0.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3353,
				"codigo": "ESF-0.75CIL0.00ORGBCO_STOCK",
				"esf_dec": -0.750000,
				"cil_dec": 0.000000,
				"esf": "-0.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3343,
				"codigo": "ESF-1.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": -1.000000,
				"cil_dec": -0.250000,
				"esf": "-1.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3342,
				"codigo": "ESF-1.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": -1.000000,
				"cil_dec": -0.500000,
				"esf": "-1.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3341,
				"codigo": "ESF-1.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": -1.000000,
				"cil_dec": -0.750000,
				"esf": "-1.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3340,
				"codigo": "ESF-1.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": -1.000000,
				"cil_dec": -1.000000,
				"esf": "-1.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3339,
				"codigo": "ESF-1.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": -1.000000,
				"cil_dec": -1.250000,
				"esf": "-1.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3338,
				"codigo": "ESF-1.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": -1.000000,
				"cil_dec": -1.500000,
				"esf": "-1.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3337,
				"codigo": "ESF-1.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": -1.000000,
				"cil_dec": -1.750000,
				"esf": "-1.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3336,
				"codigo": "ESF-1.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": -1.000000,
				"cil_dec": -2.000000,
				"esf": "-1.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3344,
				"codigo": "ESF-1.00CIL0.00ORGBCO_STOCK",
				"esf_dec": -1.000000,
				"cil_dec": 0.000000,
				"esf": "-1.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3334,
				"codigo": "ESF-1.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": -1.250000,
				"cil_dec": -0.250000,
				"esf": "-1.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3333,
				"codigo": "ESF-1.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": -1.250000,
				"cil_dec": -0.500000,
				"esf": "-1.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3332,
				"codigo": "ESF-1.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": -1.250000,
				"cil_dec": -0.750000,
				"esf": "-1.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3331,
				"codigo": "ESF-1.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": -1.250000,
				"cil_dec": -1.000000,
				"esf": "-1.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3330,
				"codigo": "ESF-1.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": -1.250000,
				"cil_dec": -1.250000,
				"esf": "-1.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3329,
				"codigo": "ESF-1.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": -1.250000,
				"cil_dec": -1.500000,
				"esf": "-1.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3328,
				"codigo": "ESF-1.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": -1.250000,
				"cil_dec": -1.750000,
				"esf": "-1.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3327,
				"codigo": "ESF-1.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": -1.250000,
				"cil_dec": -2.000000,
				"esf": "-1.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3335,
				"codigo": "ESF-1.25CIL0.00ORGBCO_STOCK",
				"esf_dec": -1.250000,
				"cil_dec": 0.000000,
				"esf": "-1.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3325,
				"codigo": "ESF-1.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": -1.500000,
				"cil_dec": -0.250000,
				"esf": "-1.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3324,
				"codigo": "ESF-1.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": -1.500000,
				"cil_dec": -0.500000,
				"esf": "-1.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3323,
				"codigo": "ESF-1.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": -1.500000,
				"cil_dec": -0.750000,
				"esf": "-1.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3322,
				"codigo": "ESF-1.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": -1.500000,
				"cil_dec": -1.000000,
				"esf": "-1.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3321,
				"codigo": "ESF-1.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": -1.500000,
				"cil_dec": -1.250000,
				"esf": "-1.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3320,
				"codigo": "ESF-1.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": -1.500000,
				"cil_dec": -1.500000,
				"esf": "-1.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3319,
				"codigo": "ESF-1.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": -1.500000,
				"cil_dec": -1.750000,
				"esf": "-1.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3318,
				"codigo": "ESF-1.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": -1.500000,
				"cil_dec": -2.000000,
				"esf": "-1.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3326,
				"codigo": "ESF-1.50CIL0.00ORGBCO_STOCK",
				"esf_dec": -1.500000,
				"cil_dec": 0.000000,
				"esf": "-1.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3316,
				"codigo": "ESF-1.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": -1.750000,
				"cil_dec": -0.250000,
				"esf": "-1.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3315,
				"codigo": "ESF-1.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": -1.750000,
				"cil_dec": -0.500000,
				"esf": "-1.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3314,
				"codigo": "ESF-1.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": -1.750000,
				"cil_dec": -0.750000,
				"esf": "-1.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3313,
				"codigo": "ESF-1.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": -1.750000,
				"cil_dec": -1.000000,
				"esf": "-1.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3312,
				"codigo": "ESF-1.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": -1.750000,
				"cil_dec": -1.250000,
				"esf": "-1.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3311,
				"codigo": "ESF-1.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": -1.750000,
				"cil_dec": -1.500000,
				"esf": "-1.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3310,
				"codigo": "ESF-1.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": -1.750000,
				"cil_dec": -1.750000,
				"esf": "-1.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3309,
				"codigo": "ESF-1.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": -1.750000,
				"cil_dec": -2.000000,
				"esf": "-1.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3317,
				"codigo": "ESF-1.75CIL0.00ORGBCO_STOCK",
				"esf_dec": -1.750000,
				"cil_dec": 0.000000,
				"esf": "-1.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3307,
				"codigo": "ESF-2.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": -2.000000,
				"cil_dec": -0.250000,
				"esf": "-2.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3306,
				"codigo": "ESF-2.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": -2.000000,
				"cil_dec": -0.500000,
				"esf": "-2.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3305,
				"codigo": "ESF-2.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": -2.000000,
				"cil_dec": -0.750000,
				"esf": "-2.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3304,
				"codigo": "ESF-2.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": -2.000000,
				"cil_dec": -1.000000,
				"esf": "-2.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3303,
				"codigo": "ESF-2.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": -2.000000,
				"cil_dec": -1.250000,
				"esf": "-2.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3302,
				"codigo": "ESF-2.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": -2.000000,
				"cil_dec": -1.500000,
				"esf": "-2.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3301,
				"codigo": "ESF-2.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": -2.000000,
				"cil_dec": -1.750000,
				"esf": "-2.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3300,
				"codigo": "ESF-2.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": -2.000000,
				"cil_dec": -2.000000,
				"esf": "-2.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3308,
				"codigo": "ESF-2.00CIL0.00ORGBCO_STOCK",
				"esf_dec": -2.000000,
				"cil_dec": 0.000000,
				"esf": "-2.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3298,
				"codigo": "ESF-2.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": -2.250000,
				"cil_dec": -0.250000,
				"esf": "-2.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3297,
				"codigo": "ESF-2.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": -2.250000,
				"cil_dec": -0.500000,
				"esf": "-2.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3296,
				"codigo": "ESF-2.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": -2.250000,
				"cil_dec": -0.750000,
				"esf": "-2.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3295,
				"codigo": "ESF-2.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": -2.250000,
				"cil_dec": -1.000000,
				"esf": "-2.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3294,
				"codigo": "ESF-2.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": -2.250000,
				"cil_dec": -1.250000,
				"esf": "-2.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3293,
				"codigo": "ESF-2.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": -2.250000,
				"cil_dec": -1.500000,
				"esf": "-2.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3292,
				"codigo": "ESF-2.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": -2.250000,
				"cil_dec": -1.750000,
				"esf": "-2.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3291,
				"codigo": "ESF-2.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": -2.250000,
				"cil_dec": -2.000000,
				"esf": "-2.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3299,
				"codigo": "ESF-2.25CIL0.00ORGBCO_STOCK",
				"esf_dec": -2.250000,
				"cil_dec": 0.000000,
				"esf": "-2.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3289,
				"codigo": "ESF-2.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": -2.500000,
				"cil_dec": -0.250000,
				"esf": "-2.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3288,
				"codigo": "ESF-2.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": -2.500000,
				"cil_dec": -0.500000,
				"esf": "-2.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3287,
				"codigo": "ESF-2.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": -2.500000,
				"cil_dec": -0.750000,
				"esf": "-2.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3286,
				"codigo": "ESF-2.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": -2.500000,
				"cil_dec": -1.000000,
				"esf": "-2.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3285,
				"codigo": "ESF-2.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": -2.500000,
				"cil_dec": -1.250000,
				"esf": "-2.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3284,
				"codigo": "ESF-2.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": -2.500000,
				"cil_dec": -1.500000,
				"esf": "-2.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3283,
				"codigo": "ESF-2.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": -2.500000,
				"cil_dec": -1.750000,
				"esf": "-2.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3282,
				"codigo": "ESF-2.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": -2.500000,
				"cil_dec": -2.000000,
				"esf": "-2.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3290,
				"codigo": "ESF-2.50CIL0.00ORGBCO_STOCK",
				"esf_dec": -2.500000,
				"cil_dec": 0.000000,
				"esf": "-2.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3280,
				"codigo": "ESF-2.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": -2.750000,
				"cil_dec": -0.250000,
				"esf": "-2.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3279,
				"codigo": "ESF-2.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": -2.750000,
				"cil_dec": -0.500000,
				"esf": "-2.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3278,
				"codigo": "ESF-2.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": -2.750000,
				"cil_dec": -0.750000,
				"esf": "-2.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3277,
				"codigo": "ESF-2.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": -2.750000,
				"cil_dec": -1.000000,
				"esf": "-2.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3276,
				"codigo": "ESF-2.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": -2.750000,
				"cil_dec": -1.250000,
				"esf": "-2.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3275,
				"codigo": "ESF-2.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": -2.750000,
				"cil_dec": -1.500000,
				"esf": "-2.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3274,
				"codigo": "ESF-2.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": -2.750000,
				"cil_dec": -1.750000,
				"esf": "-2.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3273,
				"codigo": "ESF-2.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": -2.750000,
				"cil_dec": -2.000000,
				"esf": "-2.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3281,
				"codigo": "ESF-2.75CIL0.00ORGBCO_STOCK",
				"esf_dec": -2.750000,
				"cil_dec": 0.000000,
				"esf": "-2.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3271,
				"codigo": "ESF-3.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": -3.000000,
				"cil_dec": -0.250000,
				"esf": "-3.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3270,
				"codigo": "ESF-3.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": -3.000000,
				"cil_dec": -0.500000,
				"esf": "-3.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3269,
				"codigo": "ESF-3.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": -3.000000,
				"cil_dec": -0.750000,
				"esf": "-3.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3268,
				"codigo": "ESF-3.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": -3.000000,
				"cil_dec": -1.000000,
				"esf": "-3.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3267,
				"codigo": "ESF-3.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": -3.000000,
				"cil_dec": -1.250000,
				"esf": "-3.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3266,
				"codigo": "ESF-3.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": -3.000000,
				"cil_dec": -1.500000,
				"esf": "-3.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3265,
				"codigo": "ESF-3.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": -3.000000,
				"cil_dec": -1.750000,
				"esf": "-3.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3264,
				"codigo": "ESF-3.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": -3.000000,
				"cil_dec": -2.000000,
				"esf": "-3.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3272,
				"codigo": "ESF-3.00CIL0.00ORGBCO_STOCK",
				"esf_dec": -3.000000,
				"cil_dec": 0.000000,
				"esf": "-3.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3262,
				"codigo": "ESF-3.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": -3.250000,
				"cil_dec": -0.250000,
				"esf": "-3.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3261,
				"codigo": "ESF-3.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": -3.250000,
				"cil_dec": -0.500000,
				"esf": "-3.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3260,
				"codigo": "ESF-3.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": -3.250000,
				"cil_dec": -0.750000,
				"esf": "-3.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3259,
				"codigo": "ESF-3.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": -3.250000,
				"cil_dec": -1.000000,
				"esf": "-3.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3258,
				"codigo": "ESF-3.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": -3.250000,
				"cil_dec": -1.250000,
				"esf": "-3.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3257,
				"codigo": "ESF-3.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": -3.250000,
				"cil_dec": -1.500000,
				"esf": "-3.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3256,
				"codigo": "ESF-3.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": -3.250000,
				"cil_dec": -1.750000,
				"esf": "-3.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3255,
				"codigo": "ESF-3.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": -3.250000,
				"cil_dec": -2.000000,
				"esf": "-3.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3263,
				"codigo": "ESF-3.25CIL0.00ORGBCO_STOCK",
				"esf_dec": -3.250000,
				"cil_dec": 0.000000,
				"esf": "-3.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3253,
				"codigo": "ESF-3.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": -3.500000,
				"cil_dec": -0.250000,
				"esf": "-3.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3252,
				"codigo": "ESF-3.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": -3.500000,
				"cil_dec": -0.500000,
				"esf": "-3.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3251,
				"codigo": "ESF-3.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": -3.500000,
				"cil_dec": -0.750000,
				"esf": "-3.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3250,
				"codigo": "ESF-3.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": -3.500000,
				"cil_dec": -1.000000,
				"esf": "-3.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3249,
				"codigo": "ESF-3.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": -3.500000,
				"cil_dec": -1.250000,
				"esf": "-3.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3248,
				"codigo": "ESF-3.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": -3.500000,
				"cil_dec": -1.500000,
				"esf": "-3.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3247,
				"codigo": "ESF-3.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": -3.500000,
				"cil_dec": -1.750000,
				"esf": "-3.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3246,
				"codigo": "ESF-3.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": -3.500000,
				"cil_dec": -2.000000,
				"esf": "-3.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3254,
				"codigo": "ESF-3.50CIL0.00ORGBCO_STOCK",
				"esf_dec": -3.500000,
				"cil_dec": 0.000000,
				"esf": "-3.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3244,
				"codigo": "ESF-3.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": -3.750000,
				"cil_dec": -0.250000,
				"esf": "-3.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3243,
				"codigo": "ESF-3.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": -3.750000,
				"cil_dec": -0.500000,
				"esf": "-3.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3242,
				"codigo": "ESF-3.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": -3.750000,
				"cil_dec": -0.750000,
				"esf": "-3.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3241,
				"codigo": "ESF-3.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": -3.750000,
				"cil_dec": -1.000000,
				"esf": "-3.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3240,
				"codigo": "ESF-3.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": -3.750000,
				"cil_dec": -1.250000,
				"esf": "-3.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3239,
				"codigo": "ESF-3.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": -3.750000,
				"cil_dec": -1.500000,
				"esf": "-3.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3238,
				"codigo": "ESF-3.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": -3.750000,
				"cil_dec": -1.750000,
				"esf": "-3.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3237,
				"codigo": "ESF-3.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": -3.750000,
				"cil_dec": -2.000000,
				"esf": "-3.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3245,
				"codigo": "ESF-3.75CIL0.00ORGBCO_STOCK",
				"esf_dec": -3.750000,
				"cil_dec": 0.000000,
				"esf": "-3.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3235,
				"codigo": "ESF-4.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": -4.000000,
				"cil_dec": -0.250000,
				"esf": "-4.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3234,
				"codigo": "ESF-4.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": -4.000000,
				"cil_dec": -0.500000,
				"esf": "-4.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3233,
				"codigo": "ESF-4.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": -4.000000,
				"cil_dec": -0.750000,
				"esf": "-4.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3232,
				"codigo": "ESF-4.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": -4.000000,
				"cil_dec": -1.000000,
				"esf": "-4.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3231,
				"codigo": "ESF-4.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": -4.000000,
				"cil_dec": -1.250000,
				"esf": "-4.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3230,
				"codigo": "ESF-4.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": -4.000000,
				"cil_dec": -1.500000,
				"esf": "-4.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3229,
				"codigo": "ESF-4.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": -4.000000,
				"cil_dec": -1.750000,
				"esf": "-4.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3228,
				"codigo": "ESF-4.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": -4.000000,
				"cil_dec": -2.000000,
				"esf": "-4.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3236,
				"codigo": "ESF-4.00CIL0.00ORGBCO_STOCK",
				"esf_dec": -4.000000,
				"cil_dec": 0.000000,
				"esf": "-4.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3226,
				"codigo": "ESF-4.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": -4.250000,
				"cil_dec": -0.250000,
				"esf": "-4.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3225,
				"codigo": "ESF-4.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": -4.250000,
				"cil_dec": -0.500000,
				"esf": "-4.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3224,
				"codigo": "ESF-4.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": -4.250000,
				"cil_dec": -0.750000,
				"esf": "-4.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3223,
				"codigo": "ESF-4.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": -4.250000,
				"cil_dec": -1.000000,
				"esf": "-4.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3222,
				"codigo": "ESF-4.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": -4.250000,
				"cil_dec": -1.250000,
				"esf": "-4.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3221,
				"codigo": "ESF-4.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": -4.250000,
				"cil_dec": -1.500000,
				"esf": "-4.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3220,
				"codigo": "ESF-4.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": -4.250000,
				"cil_dec": -1.750000,
				"esf": "-4.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3219,
				"codigo": "ESF-4.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": -4.250000,
				"cil_dec": -2.000000,
				"esf": "-4.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3227,
				"codigo": "ESF-4.25CIL0.00ORGBCO_STOCK",
				"esf_dec": -4.250000,
				"cil_dec": 0.000000,
				"esf": "-4.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3217,
				"codigo": "ESF-4.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": -4.500000,
				"cil_dec": -0.250000,
				"esf": "-4.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3216,
				"codigo": "ESF-4.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": -4.500000,
				"cil_dec": -0.500000,
				"esf": "-4.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3215,
				"codigo": "ESF-4.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": -4.500000,
				"cil_dec": -0.750000,
				"esf": "-4.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3214,
				"codigo": "ESF-4.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": -4.500000,
				"cil_dec": -1.000000,
				"esf": "-4.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3213,
				"codigo": "ESF-4.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": -4.500000,
				"cil_dec": -1.250000,
				"esf": "-4.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3212,
				"codigo": "ESF-4.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": -4.500000,
				"cil_dec": -1.500000,
				"esf": "-4.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3211,
				"codigo": "ESF-4.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": -4.500000,
				"cil_dec": -1.750000,
				"esf": "-4.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3210,
				"codigo": "ESF-4.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": -4.500000,
				"cil_dec": -2.000000,
				"esf": "-4.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3218,
				"codigo": "ESF-4.50CIL0.00ORGBCO_STOCK",
				"esf_dec": -4.500000,
				"cil_dec": 0.000000,
				"esf": "-4.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3208,
				"codigo": "ESF-4.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": -4.750000,
				"cil_dec": -0.250000,
				"esf": "-4.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3207,
				"codigo": "ESF-4.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": -4.750000,
				"cil_dec": -0.500000,
				"esf": "-4.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3206,
				"codigo": "ESF-4.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": -4.750000,
				"cil_dec": -0.750000,
				"esf": "-4.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3205,
				"codigo": "ESF-4.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": -4.750000,
				"cil_dec": -1.000000,
				"esf": "-4.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3204,
				"codigo": "ESF-4.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": -4.750000,
				"cil_dec": -1.250000,
				"esf": "-4.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3203,
				"codigo": "ESF-4.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": -4.750000,
				"cil_dec": -1.500000,
				"esf": "-4.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3202,
				"codigo": "ESF-4.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": -4.750000,
				"cil_dec": -1.750000,
				"esf": "-4.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3201,
				"codigo": "ESF-4.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": -4.750000,
				"cil_dec": -2.000000,
				"esf": "-4.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3209,
				"codigo": "ESF-4.75CIL0.00ORGBCO_STOCK",
				"esf_dec": -4.750000,
				"cil_dec": 0.000000,
				"esf": "-4.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3199,
				"codigo": "ESF-5.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": -5.000000,
				"cil_dec": -0.250000,
				"esf": "-5.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3198,
				"codigo": "ESF-5.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": -5.000000,
				"cil_dec": -0.500000,
				"esf": "-5.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3197,
				"codigo": "ESF-5.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": -5.000000,
				"cil_dec": -0.750000,
				"esf": "-5.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3196,
				"codigo": "ESF-5.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": -5.000000,
				"cil_dec": -1.000000,
				"esf": "-5.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3195,
				"codigo": "ESF-5.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": -5.000000,
				"cil_dec": -1.250000,
				"esf": "-5.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3194,
				"codigo": "ESF-5.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": -5.000000,
				"cil_dec": -1.500000,
				"esf": "-5.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3193,
				"codigo": "ESF-5.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": -5.000000,
				"cil_dec": -1.750000,
				"esf": "-5.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3192,
				"codigo": "ESF-5.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": -5.000000,
				"cil_dec": -2.000000,
				"esf": "-5.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3200,
				"codigo": "ESF-5.00CIL0.00ORGBCO_STOCK",
				"esf_dec": -5.000000,
				"cil_dec": 0.000000,
				"esf": "-5.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3190,
				"codigo": "ESF-5.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": -5.250000,
				"cil_dec": -0.250000,
				"esf": "-5.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3189,
				"codigo": "ESF-5.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": -5.250000,
				"cil_dec": -0.500000,
				"esf": "-5.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3188,
				"codigo": "ESF-5.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": -5.250000,
				"cil_dec": -0.750000,
				"esf": "-5.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3187,
				"codigo": "ESF-5.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": -5.250000,
				"cil_dec": -1.000000,
				"esf": "-5.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3186,
				"codigo": "ESF-5.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": -5.250000,
				"cil_dec": -1.250000,
				"esf": "-5.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3185,
				"codigo": "ESF-5.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": -5.250000,
				"cil_dec": -1.500000,
				"esf": "-5.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3184,
				"codigo": "ESF-5.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": -5.250000,
				"cil_dec": -1.750000,
				"esf": "-5.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3183,
				"codigo": "ESF-5.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": -5.250000,
				"cil_dec": -2.000000,
				"esf": "-5.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3191,
				"codigo": "ESF-5.25CIL0.00ORGBCO_STOCK",
				"esf_dec": -5.250000,
				"cil_dec": 0.000000,
				"esf": "-5.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3181,
				"codigo": "ESF-5.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": -5.500000,
				"cil_dec": -0.250000,
				"esf": "-5.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3180,
				"codigo": "ESF-5.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": -5.500000,
				"cil_dec": -0.500000,
				"esf": "-5.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3179,
				"codigo": "ESF-5.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": -5.500000,
				"cil_dec": -0.750000,
				"esf": "-5.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3178,
				"codigo": "ESF-5.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": -5.500000,
				"cil_dec": -1.000000,
				"esf": "-5.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3177,
				"codigo": "ESF-5.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": -5.500000,
				"cil_dec": -1.250000,
				"esf": "-5.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3176,
				"codigo": "ESF-5.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": -5.500000,
				"cil_dec": -1.500000,
				"esf": "-5.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3175,
				"codigo": "ESF-5.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": -5.500000,
				"cil_dec": -1.750000,
				"esf": "-5.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3174,
				"codigo": "ESF-5.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": -5.500000,
				"cil_dec": -2.000000,
				"esf": "-5.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3182,
				"codigo": "ESF-5.50CIL0.00ORGBCO_STOCK",
				"esf_dec": -5.500000,
				"cil_dec": 0.000000,
				"esf": "-5.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3172,
				"codigo": "ESF-5.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": -5.750000,
				"cil_dec": -0.250000,
				"esf": "-5.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3171,
				"codigo": "ESF-5.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": -5.750000,
				"cil_dec": -0.500000,
				"esf": "-5.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3170,
				"codigo": "ESF-5.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": -5.750000,
				"cil_dec": -0.750000,
				"esf": "-5.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3169,
				"codigo": "ESF-5.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": -5.750000,
				"cil_dec": -1.000000,
				"esf": "-5.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3168,
				"codigo": "ESF-5.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": -5.750000,
				"cil_dec": -1.250000,
				"esf": "-5.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3167,
				"codigo": "ESF-5.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": -5.750000,
				"cil_dec": -1.500000,
				"esf": "-5.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3166,
				"codigo": "ESF-5.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": -5.750000,
				"cil_dec": -1.750000,
				"esf": "-5.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3165,
				"codigo": "ESF-5.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": -5.750000,
				"cil_dec": -2.000000,
				"esf": "-5.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3173,
				"codigo": "ESF-5.75CIL0.00ORGBCO_STOCK",
				"esf_dec": -5.750000,
				"cil_dec": 0.000000,
				"esf": "-5.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3163,
				"codigo": "ESF-6.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": -6.000000,
				"cil_dec": -0.250000,
				"esf": "-6.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3162,
				"codigo": "ESF-6.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": -6.000000,
				"cil_dec": -0.500000,
				"esf": "-6.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3161,
				"codigo": "ESF-6.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": -6.000000,
				"cil_dec": -0.750000,
				"esf": "-6.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3160,
				"codigo": "ESF-6.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": -6.000000,
				"cil_dec": -1.000000,
				"esf": "-6.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3159,
				"codigo": "ESF-6.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": -6.000000,
				"cil_dec": -1.250000,
				"esf": "-6.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3158,
				"codigo": "ESF-6.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": -6.000000,
				"cil_dec": -1.500000,
				"esf": "-6.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3157,
				"codigo": "ESF-6.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": -6.000000,
				"cil_dec": -1.750000,
				"esf": "-6.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3156,
				"codigo": "ESF-6.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": -6.000000,
				"cil_dec": -2.000000,
				"esf": "-6.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3164,
				"codigo": "ESF-6.00CIL0.00ORGBCO_STOCK",
				"esf_dec": -6.000000,
				"cil_dec": 0.000000,
				"esf": "-6.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3388,
				"codigo": "ESF+0.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": 0.250000,
				"cil_dec": -0.250000,
				"esf": "+0.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3387,
				"codigo": "ESF+0.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": 0.250000,
				"cil_dec": -0.500000,
				"esf": "+0.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3386,
				"codigo": "ESF+0.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": 0.250000,
				"cil_dec": -0.750000,
				"esf": "+0.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3385,
				"codigo": "ESF+0.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": 0.250000,
				"cil_dec": -1.000000,
				"esf": "+0.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3384,
				"codigo": "ESF+0.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": 0.250000,
				"cil_dec": -1.250000,
				"esf": "+0.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3383,
				"codigo": "ESF+0.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": 0.250000,
				"cil_dec": -1.500000,
				"esf": "+0.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3382,
				"codigo": "ESF+0.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": 0.250000,
				"cil_dec": -1.750000,
				"esf": "+0.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3381,
				"codigo": "ESF+0.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": 0.250000,
				"cil_dec": -2.000000,
				"esf": "+0.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3389,
				"codigo": "ESF+0.25CIL0.00ORGBCO_STOCK",
				"esf_dec": 0.250000,
				"cil_dec": 0.000000,
				"esf": "+0.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3397,
				"codigo": "ESF+0.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": 0.500000,
				"cil_dec": -0.250000,
				"esf": "+0.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3396,
				"codigo": "ESF+0.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": 0.500000,
				"cil_dec": -0.500000,
				"esf": "+0.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3395,
				"codigo": "ESF+0.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": 0.500000,
				"cil_dec": -0.750000,
				"esf": "+0.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3394,
				"codigo": "ESF+0.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": 0.500000,
				"cil_dec": -1.000000,
				"esf": "+0.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3393,
				"codigo": "ESF+0.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": 0.500000,
				"cil_dec": -1.250000,
				"esf": "+0.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3392,
				"codigo": "ESF+0.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": 0.500000,
				"cil_dec": -1.500000,
				"esf": "+0.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3391,
				"codigo": "ESF+0.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": 0.500000,
				"cil_dec": -1.750000,
				"esf": "+0.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3390,
				"codigo": "ESF+0.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": 0.500000,
				"cil_dec": -2.000000,
				"esf": "+0.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3398,
				"codigo": "ESF+0.50CIL0.00ORGBCO_STOCK",
				"esf_dec": 0.500000,
				"cil_dec": 0.000000,
				"esf": "+0.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3406,
				"codigo": "ESF+0.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": 0.750000,
				"cil_dec": -0.250000,
				"esf": "+0.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3405,
				"codigo": "ESF+0.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": 0.750000,
				"cil_dec": -0.500000,
				"esf": "+0.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3404,
				"codigo": "ESF+0.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": 0.750000,
				"cil_dec": -0.750000,
				"esf": "+0.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3403,
				"codigo": "ESF+0.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": 0.750000,
				"cil_dec": -1.000000,
				"esf": "+0.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3402,
				"codigo": "ESF+0.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": 0.750000,
				"cil_dec": -1.250000,
				"esf": "+0.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3401,
				"codigo": "ESF+0.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": 0.750000,
				"cil_dec": -1.500000,
				"esf": "+0.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3400,
				"codigo": "ESF+0.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": 0.750000,
				"cil_dec": -1.750000,
				"esf": "+0.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3399,
				"codigo": "ESF+0.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": 0.750000,
				"cil_dec": -2.000000,
				"esf": "+0.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3407,
				"codigo": "ESF+0.75CIL0.00ORGBCO_STOCK",
				"esf_dec": 0.750000,
				"cil_dec": 0.000000,
				"esf": "+0.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3415,
				"codigo": "ESF+1.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": 1.000000,
				"cil_dec": -0.250000,
				"esf": "+1.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3414,
				"codigo": "ESF+1.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": 1.000000,
				"cil_dec": -0.500000,
				"esf": "+1.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3413,
				"codigo": "ESF+1.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": 1.000000,
				"cil_dec": -0.750000,
				"esf": "+1.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3412,
				"codigo": "ESF+1.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": 1.000000,
				"cil_dec": -1.000000,
				"esf": "+1.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3411,
				"codigo": "ESF+1.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": 1.000000,
				"cil_dec": -1.250000,
				"esf": "+1.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3410,
				"codigo": "ESF+1.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": 1.000000,
				"cil_dec": -1.500000,
				"esf": "+1.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3409,
				"codigo": "ESF+1.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": 1.000000,
				"cil_dec": -1.750000,
				"esf": "+1.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3408,
				"codigo": "ESF+1.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": 1.000000,
				"cil_dec": -2.000000,
				"esf": "+1.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3416,
				"codigo": "ESF+1.00CIL0.00ORGBCO_STOCK",
				"esf_dec": 1.000000,
				"cil_dec": 0.000000,
				"esf": "+1.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3424,
				"codigo": "ESF+1.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": 1.250000,
				"cil_dec": -0.250000,
				"esf": "+1.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3423,
				"codigo": "ESF+1.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": 1.250000,
				"cil_dec": -0.500000,
				"esf": "+1.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3422,
				"codigo": "ESF+1.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": 1.250000,
				"cil_dec": -0.750000,
				"esf": "+1.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3421,
				"codigo": "ESF+1.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": 1.250000,
				"cil_dec": -1.000000,
				"esf": "+1.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3420,
				"codigo": "ESF+1.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": 1.250000,
				"cil_dec": -1.250000,
				"esf": "+1.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3419,
				"codigo": "ESF+1.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": 1.250000,
				"cil_dec": -1.500000,
				"esf": "+1.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3418,
				"codigo": "ESF+1.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": 1.250000,
				"cil_dec": -1.750000,
				"esf": "+1.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3417,
				"codigo": "ESF+1.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": 1.250000,
				"cil_dec": -2.000000,
				"esf": "+1.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3425,
				"codigo": "ESF+1.25CIL0.00ORGBCO_STOCK",
				"esf_dec": 1.250000,
				"cil_dec": 0.000000,
				"esf": "+1.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3433,
				"codigo": "ESF+1.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": 1.500000,
				"cil_dec": -0.250000,
				"esf": "+1.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3432,
				"codigo": "ESF+1.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": 1.500000,
				"cil_dec": -0.500000,
				"esf": "+1.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3431,
				"codigo": "ESF+1.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": 1.500000,
				"cil_dec": -0.750000,
				"esf": "+1.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3430,
				"codigo": "ESF+1.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": 1.500000,
				"cil_dec": -1.000000,
				"esf": "+1.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3429,
				"codigo": "ESF+1.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": 1.500000,
				"cil_dec": -1.250000,
				"esf": "+1.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3428,
				"codigo": "ESF+1.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": 1.500000,
				"cil_dec": -1.500000,
				"esf": "+1.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3427,
				"codigo": "ESF+1.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": 1.500000,
				"cil_dec": -1.750000,
				"esf": "+1.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3426,
				"codigo": "ESF+1.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": 1.500000,
				"cil_dec": -2.000000,
				"esf": "+1.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3434,
				"codigo": "ESF+1.50CIL0.00ORGBCO_STOCK",
				"esf_dec": 1.500000,
				"cil_dec": 0.000000,
				"esf": "+1.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3442,
				"codigo": "ESF+1.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": 1.750000,
				"cil_dec": -0.250000,
				"esf": "+1.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3441,
				"codigo": "ESF+1.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": 1.750000,
				"cil_dec": -0.500000,
				"esf": "+1.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3440,
				"codigo": "ESF+1.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": 1.750000,
				"cil_dec": -0.750000,
				"esf": "+1.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3439,
				"codigo": "ESF+1.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": 1.750000,
				"cil_dec": -1.000000,
				"esf": "+1.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3438,
				"codigo": "ESF+1.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": 1.750000,
				"cil_dec": -1.250000,
				"esf": "+1.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3437,
				"codigo": "ESF+1.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": 1.750000,
				"cil_dec": -1.500000,
				"esf": "+1.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3436,
				"codigo": "ESF+1.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": 1.750000,
				"cil_dec": -1.750000,
				"esf": "+1.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3435,
				"codigo": "ESF+1.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": 1.750000,
				"cil_dec": -2.000000,
				"esf": "+1.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3443,
				"codigo": "ESF+1.75CIL0.00ORGBCO_STOCK",
				"esf_dec": 1.750000,
				"cil_dec": 0.000000,
				"esf": "+1.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3451,
				"codigo": "ESF+2.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": 2.000000,
				"cil_dec": -0.250000,
				"esf": "+2.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3450,
				"codigo": "ESF+2.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": 2.000000,
				"cil_dec": -0.500000,
				"esf": "+2.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3449,
				"codigo": "ESF+2.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": 2.000000,
				"cil_dec": -0.750000,
				"esf": "+2.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3448,
				"codigo": "ESF+2.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": 2.000000,
				"cil_dec": -1.000000,
				"esf": "+2.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3447,
				"codigo": "ESF+2.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": 2.000000,
				"cil_dec": -1.250000,
				"esf": "+2.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3446,
				"codigo": "ESF+2.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": 2.000000,
				"cil_dec": -1.500000,
				"esf": "+2.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3445,
				"codigo": "ESF+2.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": 2.000000,
				"cil_dec": -1.750000,
				"esf": "+2.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3444,
				"codigo": "ESF+2.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": 2.000000,
				"cil_dec": -2.000000,
				"esf": "+2.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3452,
				"codigo": "ESF+2.00CIL0.00ORGBCO_STOCK",
				"esf_dec": 2.000000,
				"cil_dec": 0.000000,
				"esf": "+2.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3460,
				"codigo": "ESF+2.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": 2.250000,
				"cil_dec": -0.250000,
				"esf": "+2.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3459,
				"codigo": "ESF+2.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": 2.250000,
				"cil_dec": -0.500000,
				"esf": "+2.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3458,
				"codigo": "ESF+2.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": 2.250000,
				"cil_dec": -0.750000,
				"esf": "+2.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3457,
				"codigo": "ESF+2.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": 2.250000,
				"cil_dec": -1.000000,
				"esf": "+2.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3456,
				"codigo": "ESF+2.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": 2.250000,
				"cil_dec": -1.250000,
				"esf": "+2.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3455,
				"codigo": "ESF+2.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": 2.250000,
				"cil_dec": -1.500000,
				"esf": "+2.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3454,
				"codigo": "ESF+2.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": 2.250000,
				"cil_dec": -1.750000,
				"esf": "+2.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3453,
				"codigo": "ESF+2.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": 2.250000,
				"cil_dec": -2.000000,
				"esf": "+2.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3461,
				"codigo": "ESF+2.25CIL0.00ORGBCO_STOCK",
				"esf_dec": 2.250000,
				"cil_dec": 0.000000,
				"esf": "+2.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3469,
				"codigo": "ESF+2.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": 2.500000,
				"cil_dec": -0.250000,
				"esf": "+2.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3468,
				"codigo": "ESF+2.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": 2.500000,
				"cil_dec": -0.500000,
				"esf": "+2.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3467,
				"codigo": "ESF+2.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": 2.500000,
				"cil_dec": -0.750000,
				"esf": "+2.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3466,
				"codigo": "ESF+2.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": 2.500000,
				"cil_dec": -1.000000,
				"esf": "+2.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3465,
				"codigo": "ESF+2.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": 2.500000,
				"cil_dec": -1.250000,
				"esf": "+2.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3464,
				"codigo": "ESF+2.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": 2.500000,
				"cil_dec": -1.500000,
				"esf": "+2.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3463,
				"codigo": "ESF+2.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": 2.500000,
				"cil_dec": -1.750000,
				"esf": "+2.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3462,
				"codigo": "ESF+2.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": 2.500000,
				"cil_dec": -2.000000,
				"esf": "+2.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3470,
				"codigo": "ESF+2.50CIL0.00ORGBCO_STOCK",
				"esf_dec": 2.500000,
				"cil_dec": 0.000000,
				"esf": "+2.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3478,
				"codigo": "ESF+2.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": 2.750000,
				"cil_dec": -0.250000,
				"esf": "+2.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3477,
				"codigo": "ESF+2.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": 2.750000,
				"cil_dec": -0.500000,
				"esf": "+2.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3476,
				"codigo": "ESF+2.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": 2.750000,
				"cil_dec": -0.750000,
				"esf": "+2.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3475,
				"codigo": "ESF+2.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": 2.750000,
				"cil_dec": -1.000000,
				"esf": "+2.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3474,
				"codigo": "ESF+2.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": 2.750000,
				"cil_dec": -1.250000,
				"esf": "+2.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3473,
				"codigo": "ESF+2.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": 2.750000,
				"cil_dec": -1.500000,
				"esf": "+2.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3472,
				"codigo": "ESF+2.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": 2.750000,
				"cil_dec": -1.750000,
				"esf": "+2.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3471,
				"codigo": "ESF+2.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": 2.750000,
				"cil_dec": -2.000000,
				"esf": "+2.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3479,
				"codigo": "ESF+2.75CIL0.00ORGBCO_STOCK",
				"esf_dec": 2.750000,
				"cil_dec": 0.000000,
				"esf": "+2.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3487,
				"codigo": "ESF+3.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": 3.000000,
				"cil_dec": -0.250000,
				"esf": "+3.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3486,
				"codigo": "ESF+3.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": 3.000000,
				"cil_dec": -0.500000,
				"esf": "+3.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3485,
				"codigo": "ESF+3.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": 3.000000,
				"cil_dec": -0.750000,
				"esf": "+3.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3484,
				"codigo": "ESF+3.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": 3.000000,
				"cil_dec": -1.000000,
				"esf": "+3.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3483,
				"codigo": "ESF+3.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": 3.000000,
				"cil_dec": -1.250000,
				"esf": "+3.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3482,
				"codigo": "ESF+3.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": 3.000000,
				"cil_dec": -1.500000,
				"esf": "+3.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3481,
				"codigo": "ESF+3.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": 3.000000,
				"cil_dec": -1.750000,
				"esf": "+3.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3480,
				"codigo": "ESF+3.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": 3.000000,
				"cil_dec": -2.000000,
				"esf": "+3.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3488,
				"codigo": "ESF+3.00CIL0.00ORGBCO_STOCK",
				"esf_dec": 3.000000,
				"cil_dec": 0.000000,
				"esf": "+3.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3496,
				"codigo": "ESF+3.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": 3.250000,
				"cil_dec": -0.250000,
				"esf": "+3.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3495,
				"codigo": "ESF+3.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": 3.250000,
				"cil_dec": -0.500000,
				"esf": "+3.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3494,
				"codigo": "ESF+3.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": 3.250000,
				"cil_dec": -0.750000,
				"esf": "+3.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3493,
				"codigo": "ESF+3.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": 3.250000,
				"cil_dec": -1.000000,
				"esf": "+3.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3492,
				"codigo": "ESF+3.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": 3.250000,
				"cil_dec": -1.250000,
				"esf": "+3.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3491,
				"codigo": "ESF+3.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": 3.250000,
				"cil_dec": -1.500000,
				"esf": "+3.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3490,
				"codigo": "ESF+3.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": 3.250000,
				"cil_dec": -1.750000,
				"esf": "+3.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3489,
				"codigo": "ESF+3.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": 3.250000,
				"cil_dec": -2.000000,
				"esf": "+3.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3497,
				"codigo": "ESF+3.25CIL0.00ORGBCO_STOCK",
				"esf_dec": 3.250000,
				"cil_dec": 0.000000,
				"esf": "+3.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3505,
				"codigo": "ESF+3.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": 3.500000,
				"cil_dec": -0.250000,
				"esf": "+3.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3504,
				"codigo": "ESF+3.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": 3.500000,
				"cil_dec": -0.500000,
				"esf": "+3.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3503,
				"codigo": "ESF+3.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": 3.500000,
				"cil_dec": -0.750000,
				"esf": "+3.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3502,
				"codigo": "ESF+3.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": 3.500000,
				"cil_dec": -1.000000,
				"esf": "+3.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3501,
				"codigo": "ESF+3.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": 3.500000,
				"cil_dec": -1.250000,
				"esf": "+3.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3500,
				"codigo": "ESF+3.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": 3.500000,
				"cil_dec": -1.500000,
				"esf": "+3.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3499,
				"codigo": "ESF+3.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": 3.500000,
				"cil_dec": -1.750000,
				"esf": "+3.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3498,
				"codigo": "ESF+3.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": 3.500000,
				"cil_dec": -2.000000,
				"esf": "+3.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3506,
				"codigo": "ESF+3.50CIL0.00ORGBCO_STOCK",
				"esf_dec": 3.500000,
				"cil_dec": 0.000000,
				"esf": "+3.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3514,
				"codigo": "ESF+3.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": 3.750000,
				"cil_dec": -0.250000,
				"esf": "+3.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3513,
				"codigo": "ESF+3.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": 3.750000,
				"cil_dec": -0.500000,
				"esf": "+3.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3512,
				"codigo": "ESF+3.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": 3.750000,
				"cil_dec": -0.750000,
				"esf": "+3.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3511,
				"codigo": "ESF+3.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": 3.750000,
				"cil_dec": -1.000000,
				"esf": "+3.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3510,
				"codigo": "ESF+3.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": 3.750000,
				"cil_dec": -1.250000,
				"esf": "+3.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3509,
				"codigo": "ESF+3.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": 3.750000,
				"cil_dec": -1.500000,
				"esf": "+3.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3508,
				"codigo": "ESF+3.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": 3.750000,
				"cil_dec": -1.750000,
				"esf": "+3.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3507,
				"codigo": "ESF+3.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": 3.750000,
				"cil_dec": -2.000000,
				"esf": "+3.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3515,
				"codigo": "ESF+3.75CIL0.00ORGBCO_STOCK",
				"esf_dec": 3.750000,
				"cil_dec": 0.000000,
				"esf": "+3.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3523,
				"codigo": "ESF+4.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": 4.000000,
				"cil_dec": -0.250000,
				"esf": "+4.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3522,
				"codigo": "ESF+4.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": 4.000000,
				"cil_dec": -0.500000,
				"esf": "+4.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3521,
				"codigo": "ESF+4.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": 4.000000,
				"cil_dec": -0.750000,
				"esf": "+4.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3520,
				"codigo": "ESF+4.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": 4.000000,
				"cil_dec": -1.000000,
				"esf": "+4.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3519,
				"codigo": "ESF+4.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": 4.000000,
				"cil_dec": -1.250000,
				"esf": "+4.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3518,
				"codigo": "ESF+4.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": 4.000000,
				"cil_dec": -1.500000,
				"esf": "+4.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3517,
				"codigo": "ESF+4.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": 4.000000,
				"cil_dec": -1.750000,
				"esf": "+4.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3516,
				"codigo": "ESF+4.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": 4.000000,
				"cil_dec": -2.000000,
				"esf": "+4.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3524,
				"codigo": "ESF+4.00CIL0.00ORGBCO_STOCK",
				"esf_dec": 4.000000,
				"cil_dec": 0.000000,
				"esf": "+4.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3532,
				"codigo": "ESF+4.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": 4.250000,
				"cil_dec": -0.250000,
				"esf": "+4.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3531,
				"codigo": "ESF+4.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": 4.250000,
				"cil_dec": -0.500000,
				"esf": "+4.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3530,
				"codigo": "ESF+4.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": 4.250000,
				"cil_dec": -0.750000,
				"esf": "+4.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3529,
				"codigo": "ESF+4.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": 4.250000,
				"cil_dec": -1.000000,
				"esf": "+4.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3528,
				"codigo": "ESF+4.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": 4.250000,
				"cil_dec": -1.250000,
				"esf": "+4.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3527,
				"codigo": "ESF+4.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": 4.250000,
				"cil_dec": -1.500000,
				"esf": "+4.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3526,
				"codigo": "ESF+4.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": 4.250000,
				"cil_dec": -1.750000,
				"esf": "+4.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3525,
				"codigo": "ESF+4.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": 4.250000,
				"cil_dec": -2.000000,
				"esf": "+4.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3533,
				"codigo": "ESF+4.25CIL0.00ORGBCO_STOCK",
				"esf_dec": 4.250000,
				"cil_dec": 0.000000,
				"esf": "+4.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3541,
				"codigo": "ESF+4.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": 4.500000,
				"cil_dec": -0.250000,
				"esf": "+4.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3540,
				"codigo": "ESF+4.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": 4.500000,
				"cil_dec": -0.500000,
				"esf": "+4.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3539,
				"codigo": "ESF+4.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": 4.500000,
				"cil_dec": -0.750000,
				"esf": "+4.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3538,
				"codigo": "ESF+4.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": 4.500000,
				"cil_dec": -1.000000,
				"esf": "+4.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3537,
				"codigo": "ESF+4.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": 4.500000,
				"cil_dec": -1.250000,
				"esf": "+4.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3536,
				"codigo": "ESF+4.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": 4.500000,
				"cil_dec": -1.500000,
				"esf": "+4.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3535,
				"codigo": "ESF+4.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": 4.500000,
				"cil_dec": -1.750000,
				"esf": "+4.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3534,
				"codigo": "ESF+4.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": 4.500000,
				"cil_dec": -2.000000,
				"esf": "+4.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3542,
				"codigo": "ESF+4.50CIL0.00ORGBCO_STOCK",
				"esf_dec": 4.500000,
				"cil_dec": 0.000000,
				"esf": "+4.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3550,
				"codigo": "ESF+4.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": 4.750000,
				"cil_dec": -0.250000,
				"esf": "+4.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3549,
				"codigo": "ESF+4.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": 4.750000,
				"cil_dec": -0.500000,
				"esf": "+4.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3548,
				"codigo": "ESF+4.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": 4.750000,
				"cil_dec": -0.750000,
				"esf": "+4.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3547,
				"codigo": "ESF+4.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": 4.750000,
				"cil_dec": -1.000000,
				"esf": "+4.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3546,
				"codigo": "ESF+4.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": 4.750000,
				"cil_dec": -1.250000,
				"esf": "+4.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3545,
				"codigo": "ESF+4.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": 4.750000,
				"cil_dec": -1.500000,
				"esf": "+4.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3544,
				"codigo": "ESF+4.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": 4.750000,
				"cil_dec": -1.750000,
				"esf": "+4.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3543,
				"codigo": "ESF+4.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": 4.750000,
				"cil_dec": -2.000000,
				"esf": "+4.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3551,
				"codigo": "ESF+4.75CIL0.00ORGBCO_STOCK",
				"esf_dec": 4.750000,
				"cil_dec": 0.000000,
				"esf": "+4.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3559,
				"codigo": "ESF+5.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": 5.000000,
				"cil_dec": -0.250000,
				"esf": "+5.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3558,
				"codigo": "ESF+5.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": 5.000000,
				"cil_dec": -0.500000,
				"esf": "+5.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3557,
				"codigo": "ESF+5.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": 5.000000,
				"cil_dec": -0.750000,
				"esf": "+5.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3556,
				"codigo": "ESF+5.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": 5.000000,
				"cil_dec": -1.000000,
				"esf": "+5.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3555,
				"codigo": "ESF+5.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": 5.000000,
				"cil_dec": -1.250000,
				"esf": "+5.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3554,
				"codigo": "ESF+5.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": 5.000000,
				"cil_dec": -1.500000,
				"esf": "+5.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3553,
				"codigo": "ESF+5.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": 5.000000,
				"cil_dec": -1.750000,
				"esf": "+5.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3552,
				"codigo": "ESF+5.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": 5.000000,
				"cil_dec": -2.000000,
				"esf": "+5.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3560,
				"codigo": "ESF+5.00CIL0.00ORGBCO_STOCK",
				"esf_dec": 5.000000,
				"cil_dec": 0.000000,
				"esf": "+5.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3568,
				"codigo": "ESF+5.25CIL-0.25ORGBCO_STOCK",
				"esf_dec": 5.250000,
				"cil_dec": -0.250000,
				"esf": "+5.25",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3567,
				"codigo": "ESF+5.25CIL-0.50ORGBCO_STOCK",
				"esf_dec": 5.250000,
				"cil_dec": -0.500000,
				"esf": "+5.25",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3566,
				"codigo": "ESF+5.25CIL-0.75ORGBCO_STOCK",
				"esf_dec": 5.250000,
				"cil_dec": -0.750000,
				"esf": "+5.25",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3565,
				"codigo": "ESF+5.25CIL-1.00ORGBCO_STOCK",
				"esf_dec": 5.250000,
				"cil_dec": -1.000000,
				"esf": "+5.25",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3564,
				"codigo": "ESF+5.25CIL-1.25ORGBCO_STOCK",
				"esf_dec": 5.250000,
				"cil_dec": -1.250000,
				"esf": "+5.25",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3563,
				"codigo": "ESF+5.25CIL-1.50ORGBCO_STOCK",
				"esf_dec": 5.250000,
				"cil_dec": -1.500000,
				"esf": "+5.25",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3562,
				"codigo": "ESF+5.25CIL-1.75ORGBCO_STOCK",
				"esf_dec": 5.250000,
				"cil_dec": -1.750000,
				"esf": "+5.25",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3561,
				"codigo": "ESF+5.25CIL-2.00ORGBCO_STOCK",
				"esf_dec": 5.250000,
				"cil_dec": -2.000000,
				"esf": "+5.25",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3569,
				"codigo": "ESF+5.25CIL0.00ORGBCO_STOCK",
				"esf_dec": 5.250000,
				"cil_dec": 0.000000,
				"esf": "+5.25",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3577,
				"codigo": "ESF+5.50CIL-0.25ORGBCO_STOCK",
				"esf_dec": 5.500000,
				"cil_dec": -0.250000,
				"esf": "+5.50",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3576,
				"codigo": "ESF+5.50CIL-0.50ORGBCO_STOCK",
				"esf_dec": 5.500000,
				"cil_dec": -0.500000,
				"esf": "+5.50",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3575,
				"codigo": "ESF+5.50CIL-0.75ORGBCO_STOCK",
				"esf_dec": 5.500000,
				"cil_dec": -0.750000,
				"esf": "+5.50",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3574,
				"codigo": "ESF+5.50CIL-1.00ORGBCO_STOCK",
				"esf_dec": 5.500000,
				"cil_dec": -1.000000,
				"esf": "+5.50",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3573,
				"codigo": "ESF+5.50CIL-1.25ORGBCO_STOCK",
				"esf_dec": 5.500000,
				"cil_dec": -1.250000,
				"esf": "+5.50",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3572,
				"codigo": "ESF+5.50CIL-1.50ORGBCO_STOCK",
				"esf_dec": 5.500000,
				"cil_dec": -1.500000,
				"esf": "+5.50",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3571,
				"codigo": "ESF+5.50CIL-1.75ORGBCO_STOCK",
				"esf_dec": 5.500000,
				"cil_dec": -1.750000,
				"esf": "+5.50",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3570,
				"codigo": "ESF+5.50CIL-2.00ORGBCO_STOCK",
				"esf_dec": 5.500000,
				"cil_dec": -2.000000,
				"esf": "+5.50",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3578,
				"codigo": "ESF+5.50CIL0.00ORGBCO_STOCK",
				"esf_dec": 5.500000,
				"cil_dec": 0.000000,
				"esf": "+5.50",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3586,
				"codigo": "ESF+5.75CIL-0.25ORGBCO_STOCK",
				"esf_dec": 5.750000,
				"cil_dec": -0.250000,
				"esf": "+5.75",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3585,
				"codigo": "ESF+5.75CIL-0.50ORGBCO_STOCK",
				"esf_dec": 5.750000,
				"cil_dec": -0.500000,
				"esf": "+5.75",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3584,
				"codigo": "ESF+5.75CIL-0.75ORGBCO_STOCK",
				"esf_dec": 5.750000,
				"cil_dec": -0.750000,
				"esf": "+5.75",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3583,
				"codigo": "ESF+5.75CIL-1.00ORGBCO_STOCK",
				"esf_dec": 5.750000,
				"cil_dec": -1.000000,
				"esf": "+5.75",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3582,
				"codigo": "ESF+5.75CIL-1.25ORGBCO_STOCK",
				"esf_dec": 5.750000,
				"cil_dec": -1.250000,
				"esf": "+5.75",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3581,
				"codigo": "ESF+5.75CIL-1.50ORGBCO_STOCK",
				"esf_dec": 5.750000,
				"cil_dec": -1.500000,
				"esf": "+5.75",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3580,
				"codigo": "ESF+5.75CIL-1.75ORGBCO_STOCK",
				"esf_dec": 5.750000,
				"cil_dec": -1.750000,
				"esf": "+5.75",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3579,
				"codigo": "ESF+5.75CIL-2.00ORGBCO_STOCK",
				"esf_dec": 5.750000,
				"cil_dec": -2.000000,
				"esf": "+5.75",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3587,
				"codigo": "ESF+5.75CIL0.00ORGBCO_STOCK",
				"esf_dec": 5.750000,
				"cil_dec": 0.000000,
				"esf": "+5.75",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3595,
				"codigo": "ESF+6.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": 6.000000,
				"cil_dec": -0.250000,
				"esf": "+6.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3594,
				"codigo": "ESF+6.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": 6.000000,
				"cil_dec": -0.500000,
				"esf": "+6.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3593,
				"codigo": "ESF+6.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": 6.000000,
				"cil_dec": -0.750000,
				"esf": "+6.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3592,
				"codigo": "ESF+6.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": 6.000000,
				"cil_dec": -1.000000,
				"esf": "+6.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3591,
				"codigo": "ESF+6.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": 6.000000,
				"cil_dec": -1.250000,
				"esf": "+6.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3590,
				"codigo": "ESF+6.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": 6.000000,
				"cil_dec": -1.500000,
				"esf": "+6.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3589,
				"codigo": "ESF+6.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": 6.000000,
				"cil_dec": -1.750000,
				"esf": "+6.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3588,
				"codigo": "ESF+6.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": 6.000000,
				"cil_dec": -2.000000,
				"esf": "+6.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3596,
				"codigo": "ESF+6.00CIL0.00ORGBCO_STOCK",
				"esf_dec": 6.000000,
				"cil_dec": 0.000000,
				"esf": "+6.00",
				"cil": "0.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3379,
				"codigo": "ESF0.00CIL-0.25ORGBCO_STOCK",
				"esf_dec": 0.000000,
				"cil_dec": -0.250000,
				"esf": "0.00",
				"cil": "-0.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3378,
				"codigo": "ESF0.00CIL-0.50ORGBCO_STOCK",
				"esf_dec": 0.000000,
				"cil_dec": -0.500000,
				"esf": "0.00",
				"cil": "-0.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3377,
				"codigo": "ESF0.00CIL-0.75ORGBCO_STOCK",
				"esf_dec": 0.000000,
				"cil_dec": -0.750000,
				"esf": "0.00",
				"cil": "-0.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3376,
				"codigo": "ESF0.00CIL-1.00ORGBCO_STOCK",
				"esf_dec": 0.000000,
				"cil_dec": -1.000000,
				"esf": "0.00",
				"cil": "-1.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3375,
				"codigo": "ESF0.00CIL-1.25ORGBCO_STOCK",
				"esf_dec": 0.000000,
				"cil_dec": -1.250000,
				"esf": "0.00",
				"cil": "-1.25"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3374,
				"codigo": "ESF0.00CIL-1.50ORGBCO_STOCK",
				"esf_dec": 0.000000,
				"cil_dec": -1.500000,
				"esf": "0.00",
				"cil": "-1.50"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3373,
				"codigo": "ESF0.00CIL-1.75ORGBCO_STOCK",
				"esf_dec": 0.000000,
				"cil_dec": -1.750000,
				"esf": "0.00",
				"cil": "-1.75"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3372,
				"codigo": "ESF0.00CIL-2.00ORGBCO_STOCK",
				"esf_dec": 0.000000,
				"cil_dec": -2.000000,
				"esf": "0.00",
				"cil": "-2.00"
			},
			{
				"subgrupo_idsubgrupo": 1386,
				"idcodigo": 3380,
				"codigo": "ESF0.00CIL0.00ORGBCO_STOCK",
				"esf_dec": 0.000000,
				"cil_dec": 0.000000,
				"esf": "0.00",
				"cil": "0.00"
			}
		]
	}
    
	const load = () => {



		let dict = {}
		let cols = {}
		let rows = {} 

		for(let esf=-20;esf<=20;esf+=0.25)
		{
			for(let cil=-20;cil<=20;cil+=0.25){
				dict[`${esf}${cil}`]=null
				cols[`${cil}`] = 1
				rows[`${esf}`] = 1
			}
		}

		test_data.data.forEach(c=>{
			dict[`${c.esf}${c.cil}`] = c
		})

	}

	const draw = () => {
		let ctx = null
		for(let esf=-20;esf<=20;esf+=0.25)
		{
			for(let cil=-20;cil<=20;cil+=0.25)
			{
				
			}
		}

	}
    
    return <>
        <Canvas />
    </>
}