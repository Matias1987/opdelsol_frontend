import "@/styles/codeGrid.module.css";
import { useEffect, useState } from "react";

const base_table_style = {
  tableLayout: "fixed",
};

const base_border_style = {
  border: "1px solid black",
  borderCollapse: "collapse",
  padding: "2px",
};

const td_style = {
  width: "64px",
  position: "relative",
};

const title_cell = {
  fontWeight: "700",
  color: "blue",
};

const cell_content = {
  aspectRatio: "1 / 1",
  display: "flex" /* For centering content within the square */,
  justifyContent: "center",
  alignItems: "center",
};

const cell_button_style = {
  aspectRatio: "1 / 1",
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0)",
  border: "0",
};

const sticky_head = {
  position: "sticky" /* Make the header sticky */,
  top: "0" /* Stick to the top of the scrollable area */,
  zIndex: "1" /* Ensure the header stays above scrolling content */,
  background: "white",
};

const sticky_first_row_td = {
  position: "sticky",
  left: "0",
  background: "white",
  zIndex: "2",
};

const sticky_column = {
  position: "sticky",
  left: "0",
  background: "white",
  zIndex: "1",
};

const container = {
  width: "700px",
  height: "700px",
  overflowY: "scroll",
  overflowX: "scroll",
};

//old javascript...

const CodeGridHTML = (props) => {
  const [data, setData] = useState(<></>);

  const draw_table = (max_esf, max_cil, sign_esf, sign_cil) => {

    const rowdata = []

    for (let i = 0; i <= max_esf; i += 0.25) {
      if (i == 0.0) {
       const row=[]
        for (let j = 0; j <= max_cil; j += 0.25) {
          if (j == 0) {
           row.push(j.toFixed(2))
          }
          
        }
      rowdata.push(row) 
      }
      const row=[]
      for (let j = 0; j <= max_cil; j += 0.25) {
        if (j == 0) {
          row.push(i.toFixed(2))
        }
        row.push(0)
      }
      rowdata.push(row) 
      
    }

    rowdata.map(row=><tr>{
        row.map(cell=>{

        })}
    </tr>)
    let str_table =<> 
    <table className='main-table'>
        {
    /*
    
    for (let i = 0; i <= max_esf; i += 0.25) {
      if (i == 0.0) {
        str_table += "<thead><tr>";
        for (let j = 0; j <= max_cil; j += 0.25) {
          if (j == 0) {
            str_table +=
              "<td  className='tdlala' ><div className='cell-content'></div></td>";
          }
          str_table += `<td  className='tdlala' ><div className='cell-content cell-title'>${sign_cil}${j.toFixed(
            2
          )}</div></td>`;
        }
        str_table += "</tr></thead><tbody>";
      }
      str_table += "<tr>";
      for (let j = 0; j <= max_cil; j += 0.25) {
        if (j == 0) {
          str_table += `<td  className='tdlala' ><div className='cell-content cell-title'>${sign_esf}${i.toFixed(
            2
          )}</div></td>`;
        }
        str_table += `<td  className='tdlala' ><button className='cell-content main-cell-content' id=${i}-${j}>50</button></td>`;
      }
      str_table += "</tr>";
    }
    */
}
</table>
    </>
   
  };
  /*
 const table = draw_table(6, 4, "+", "-");

  document.getElementById("content").innerHTML = table;
  const elements = document.querySelectorAll(".main-cell-content");

  elements.forEach((e) => {
    e.addEventListener("click", (e) => {
      alert(e.target.id);
    });
  });
*/

  useEffect(() => {
    const table = draw_table(6, 4, "+", "-");
    setData(table);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: data }} />;
};

export default CodeGridHTML;
