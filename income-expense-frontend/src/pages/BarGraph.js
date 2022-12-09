import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts";

const Graph = () => {
    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const result = await axios.get(`http://localhost:8080/exp/getAll/fk/${id}`)
        setData(result.data)
        console.log(result.data)
    }
    return (
        <div className="Container">
            <PieChart width={400} height={400}>
                <Pie

                    dataKey="cost"
                    isAnimationActive={false}
                    data={data}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#50a22a"
                    label />
                <Tooltip />
            </PieChart>

            <BarChart
                width={700}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 80,
                    bottom: 5,
                }}
                barSize={20}
            >
                <XAxis
                    dataKey="name"
                    // scale="point"
                    padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="cost" fill="#50a22a" background={{ fill: "#eee" }} />
            </BarChart>
            <Link className="btn btn-outline-danger mx-2" to={`/profile/${id}`}>
                Go Back
            </Link>
        </div>
    );
};
export default Graph;