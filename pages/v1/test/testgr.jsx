import LayoutAdmin from "@/components/layout/layout_admin";
import { Chart } from "react-google-charts";

export default function test(){
    return <>
    <Chart
  chartType="Line"
  data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
  width="100%"
  height="400px"
  legendToggle
/>
    </>
}
test.PageLayout = LayoutAdmin;  