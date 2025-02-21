import Chart from "react-apexcharts";

import { useState } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";

const AdminDashboard = () => {

    const [state, setState] = useState({
        options: {
            chart: {
                type: "line",
            },
            tooltip: {
                theme: "dark",
            },
            colors: ["#00E396"],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: "smooth",
            },
            title: {
                text: "Sales Trend",
                align: "left",
            },
            grid: {
                borderColor: "#ccc",
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: [],
                title: {
                    text: "Date",
                },
            },
            yaxis: {
                title: {
                    text: "Sales",
                },
                min: 0,
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5,
            },
        },
        series: [{ name: "Sales", data: [] }],
    });

    return (
        <>
            <AdminMenu />

            <section className="xl:ml-[4rem] md:ml-[0rem]">
                <div className="w-[80%] flex justify-around ml-20 flex-wrap">
                    <div className="rounded-lg bg-indigo-200 p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full w-[3rem] bg-white text-center p-3">
                            BDT
                        </div>

                        <p className="mt-5">Sales</p>
                        <h1 className="text-xl font-bold">
                            34,000
                        </h1>
                    </div>
                    <div className="rounded-lg bg-indigo-200 p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full w-[3rem] bg-white text-center p-3">
                            BDT
                        </div>

                        <p className="mt-5">Customers</p>
                        <h1 className="text-xl font-bold">
                            32
                        </h1>
                    </div>
                    <div className="rounded-lg bg-indigo-200 p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full w-[3rem] bg-white text-center p-3">
                            BDT
                        </div>

                        <p className="mt-5">All Orders</p>
                        <h1 className="text-xl font-bold">
                            100
                        </h1>
                    </div>
                </div>

                <div className="ml-[10rem] mt-[4rem]">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="70%"
                    />
                </div>

                <div className="mt-[4rem]">
                    <OrderList />
                </div>
            </section>
        </>
    );
};

export default AdminDashboard;