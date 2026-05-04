import { Calendar, Flex } from 'antd';
import { createStyles } from 'antd-style';
const CustomCalendar1 = () => {
const useStyles = createStyles(({ token }) => ({
  root: {
    padding: 10,
    backgroundColor: token.colorPrimaryBg,
  },
}));
const stylesObject = {
  root: {
    borderRadius: 8,
    width: 600,
  },
};
const stylesFunction = info => {
  if (info.props.fullscreen) {
    return {
      root: {
        border: '2px solid #BDE3C3',
        borderRadius: 10,
        backgroundColor: 'rgba(189,227,195, 0.3)',
      },
    };
  }
};

  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="medium">
      <Calendar fullscreen={false} classNames={classNames} styles={stylesObject} />
      <Calendar classNames={classNames} styles={stylesFunction} />
    </Flex>
  );
};

export default CustomCalendar1;
