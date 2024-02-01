import React from "react";
import ReactEchartsCore from 'echarts-for-react';
import * as echarts from 'echarts'; // Cambia la forma de importar echarts

function Grafica() {
    // Configura tus opciones de gráfico
    const option = {
        // ... opciones de ECharts ...
    };

    return (
        <ReactEchartsCore
            echarts={echarts}
            option={option}
            notMerge={true}
            lazyUpdate={true}
            style={{ height: '400px', width: '100%' }}
            theme="light"
        />
    );
}

export default Grafica;
