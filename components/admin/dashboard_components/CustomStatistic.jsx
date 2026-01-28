import { Button, Card, Statistic } from "antd";

const CustomStatistic = ({ style, value, title, onClick, prefix=<></>, valueStyle={}, precision=2 }) => {
    const styles = {
    cardStyles: {
      green: {
        background: "#dcfcd6",
        background: "linear-gradient(90deg,rgba(97, 190, 15, 1) 0%, rgba(235, 255, 212, 1) 100%)",
        borderRadius: "8px",
        border: "1px solid #61be0f",
        cursor: "default",
      },
      black: {
        backgroundColor: "#6868684b",
        borderRadius: "8px",
        border: "1px solid #1f1f1f",
        cursor: "default",
      },
      danger: {
        backgroundColor: "#ffd6d6",
        borderRadius: "8px",
        border: "1px solid #ff4d4f",
        cursor: "default",
      },
      blue: {
        background: "#d6e4ff",
        background: "linear-gradient(90deg, rgba(89, 126, 247, 1) 0%, rgba(214, 228, 255, 1) 100%)",
        borderRadius: "8px",
        border: "1px solid #597ef7",
        cursor: "default",
      },
    },
    valueStyles: {
      green: {
        color: "#3f8600",
        fontWeight: "bolder",
        fontSize: "1.2em",
      },
      black: {
        color: "#1f1f1f",
        fontWeight: "bolder",
        fontSize: "1.2em",
      },
      danger: {
        color: "#ff4d4f",
        fontWeight: "bolder",
        fontSize: "1.2em",
      },
      blue: {
        color: "#597ef7",
        fontWeight: "bolder",
        fontSize: "1.2em",
      },
    },
  };

  return <Card
        variant="borderless"
        style={{...styles.cardStyles[style] || styles.cardStyles.green, boxShadow:"0px 2px 2px #888888"}}
      >
        <Statistic
            size="small"
          title={
            <span>
              <Button style={{ fontWeight: "bolder", color: "black" }} type="link" size="small" onClick={_=>{onClick && onClick();}}>
                {title}
              </Button>
            </span>
          }
          value={value}
          precision={precision}
          valueStyle={{...styles.valueStyles[style] || styles.valueStyles.green,valueStyle}}
          prefix={prefix}
        />
      </Card>
}

export default CustomStatistic;