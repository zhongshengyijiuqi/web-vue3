
import * as echarts from 'echarts/core';
import {
    LineChart,
    PieChart,
    BarChart,
    CustomChart
} from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, LegendComponent, DataZoomComponent, LineChart, PieChart, BarChart, CustomChart, CanvasRenderer]
);

export default echarts;