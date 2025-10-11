import { Calendar,   Flex,   Select,  Typography } from "antd";
import esES from "antd/locale/es_ES";

const CustomCalendar = ({ value, onSelect }) => {
  return (
    <Calendar
      value={value}
      onSelect={(value) => {
        onSelect?.(value);
      }}
      style={{
        backgroundColor: "#f3f2f2ff",
        padding: "10px",
        borderRadius: "8px",
      }}
      fullscreen={false}
      headerRender={({ value, type, onChange, onTypeChange }) => {
        const year = value.year();
        const month = value.month();
        const yearOptions = Array.from({ length: 20 }, (_, i) => {
          const label = year - 10 + i;
          return { label, value: label };
        });
        const monthOptions = value
          .localeData()
          .monthsShort()
          .map((label, index) => ({
            label,
            value: index,
          }));
        return (
          <div style={{ paddingLeft: "8px" }}>
            <Typography.Title level={5}>Seleccionar Fecha</Typography.Title>
            <Flex gap={8}>
              <Select
                size="small"
                popupMatchSelectWidth={false}
                value={year}
                options={yearOptions}
                onChange={(newYear) => {
                  const now = value.clone().year(newYear);
                  onChange(now);
                }}
              />
              <Select
                size="small"
                popupMatchSelectWidth={false}
                value={month}
                options={monthOptions}
                onChange={(newMonth) => {
                  const now = value.clone().month(newMonth);
                  onChange(now);
                }}
              />
            </Flex>
          </div>
        );
      }}
      locale={esES}
    />
  );
};

export default CustomCalendar;