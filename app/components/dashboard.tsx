"use client";

import type { EChartsOption } from "echarts";
import Image from "next/image";
import Link from "next/link";
import { ChartPreview } from "./global";
import { JSX } from "react/jsx-runtime";

function CarouselTitle({ children, href }: { children: React.ReactNode; href: string }) {
    return (
        <Link href={href} className="title carousel-title">
            {children}
        </Link>
    );
}

export type CarouselElement = {
    label: string;
    image: string|EChartsOption|JSX.Element;
    link: string;
};

interface CarouselElements { content: CarouselElement[]}

function isChartOption(value: unknown): value is EChartsOption {
    return typeof value === "object" && value !== null && "series" in value;
}

function Carousel(elements: CarouselElements) {
    return (
        <div className="panel full-panel">
            {elements.content.length == 0 ? (
                <div className="carousel-item border-0! flex w-full items-center justify-center text-3xl">
                    <p>Nothing here</p>
                </div>
            ) : 
            elements.content.map((element, index) => {
                const image = element.image;
                const isChart = isChartOption(image);
                const isImage = typeof image === "string";
                return (
                <div key={index} className="carousel-item">
                    <Link href={element.link}>
                        {isChart ? <ChartPreview option={image} /> : 
                            (isImage ? <Image src={image} alt={element.label} /> : image as JSX.Element)}
                        <span>{element.label}</span>
                    </Link>
                </div>
            )})}
        </div>
    );
}

export { CarouselTitle, Carousel };