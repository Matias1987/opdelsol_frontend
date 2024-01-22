/**
 * 
 * @param json json to convert
 * @param columns columns acording to json 
 */
const ExportToCSV = (props) =>{
    const downloadTxtFile = () => {
        try
        {
            const element = document.createElement("a");
            const file = new Blob([document.getElementById('myInput').value], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "myFile.txt";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
        catch(ex){
            console.log(ex.toString())
        }
      }

      return <>
      
      </>

}