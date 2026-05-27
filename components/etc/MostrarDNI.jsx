const MostrarDNI = ({dni}) => {
  return (
    <span style={{filter: /_d_/.test(dni) ? "blur(2px)" : "none"}}> 
        { /_d_/.test(dni) ? "---": dni || "---" }
    </span>
  )
}
export default MostrarDNI;