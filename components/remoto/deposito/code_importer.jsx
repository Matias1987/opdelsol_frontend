
import { Card, Button } from 'antd';
const RemoteCodeImporter = props =>{

    const styles = {
    "metallicCard": {
        "background": "linear-gradient(135deg, #d8d8d8, #a2a2a2)",
        "color": "#2c2c2c",
        "fontWeight": "bold",
        "borderRadius": "6px",
        "padding": "8px",
        "boxShadow": "inset 0 0 5px #fff, 0 0 6px #888"
    },
    "metallicHeader": {
        "background": "linear-gradient(135deg, #d8d8d8, #a2a2a2)",
        "color": "#2c2c2c",
        "fontWeight": "bold",
        "borderRadius": "6px",
        "padding": "8px",
        "boxShadow": "inset 0 0 5px #fff, 0 0 6px #888"
    },
    "metallicBody": {
        "background": "linear-gradient(135deg, #d8d8d8, #a2a2a2)",
        "color": "#2c2c2c",
        "fontWeight": "bold",
        "borderRadius": "6px",
        "padding": "8px",
        "boxShadow": "inset 0 0 5px #fff, 0 0 6px #888",
        "marginBottom": "12px"
    },
    "metallicFooter": {
        "background": "linear-gradient(135deg, #d8d8d8, #a2a2a2)",
        "color": "#2c2c2c",
        "fontWeight": "bold",
        "borderRadius": null,
        'padding': '8px',
		"boxShadow":"inset 0 0 5px #fff, 0 0 6px #888", 
		"borderTop":"1px solid #aaa", 
		"paddingTop":"6px", 
	    'textAlign':'center'
    },
    metallicButton: {
      background: 'linear-gradient(to bottom, #ececec, #a5a5a5)',
      border: '1px solid #888',
      color: '#333',
      fontWeight: 'bold',
      boxShadow: 'inset 0 0 1px #fff, inset 0 -1px 1px #ccc'
   },
   metallicButtonHover: {
       background: 'linear-gradient(to bottom, #c5c5c5, #8a8a8a)',
       borderColor: '#555'
   }
}

    return (
    <Card
      title={<div style={styles.metallicHeader}>Importar C&oacute;digos</div>}
      style={{ ...styles.metallicCard, ...{width: "100%"} }}
      actions={[
        <div style={styles.metallicFooter}>Importar</div>
      ]}
    >
      <div style={styles.metallicBody}>
        This is the metallic body of the card. Reflective and bold.
      </div>
      <Button style={styles.metallicButton}>Action</Button>
    </Card>
  );
}

export default RemoteCodeImporter;