"use client";

import { EChartsOption } from "echarts";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function ChartPreview({ option }: { option: EChartsOption }) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);
        chart.setOption(option);

        const resizeObserver = new ResizeObserver(() => chart.resize());
        resizeObserver.observe(chartRef.current);

        return () => {
            resizeObserver.disconnect();
            chart.dispose();
        };
    }, [option]);

    return <div ref={chartRef} className="h-32 w-32" aria-label="Chart" />;
}

export { ChartPreview };