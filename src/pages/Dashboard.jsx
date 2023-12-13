import React, { useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import { useAuth } from "../context/AuthContext";
import { transformData } from "../lib/helpers";
import CsvDownloadButton from "react-json-to-csv";
function Dashboard() {
  const { token } = useAuth();
  const [reqeusts, setRequests] = useState([]);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch("http://localhost:3000/analytics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setRequests(data.data);
    };
    fetchAnalytics();
  }, []);
  useEffect(() => {
    const transformedData = transformData(reqeusts);
    console.log("Transformed Data", transformedData);
    setChartData(transformedData);
  }, [reqeusts]);
  const data = [
    {
      id: "API Requests",
      color: "#4f46e5",
      data: chartData,
    },
  ];
  return (
    <>
      <div className="h-56 gap-4 rounded ">
        <div className="flex items-center justify-between flex-1 w-full rounded-lg">
          <div>
            <div className="text-2xl font-bold text-gray-800">Analytics</div>
          </div>
          <div></div>
        </div>
        <br />
        <div className="bg-indigo-100 rounded-md h-80">
          <LineChart className="flex-1" data={data} />
          <div>
            <h2 className="py-2 text-lg font-semibold text-center">
              API Requests Analytics
            </h2>
          </div>
        </div>
        <br />
        <br />
        <div className="p-4 rounded-md">
          <div className="flex items-center justify-between py-4 ">
            <h2 className="text-4xl font-semibold">Request Logs</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-black rounded hover:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <CsvDownloadButton data={reqeusts} filename="requests_log" />
            </button>
          </div>
          <div className="flow-root mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Method
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created At
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Path
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        IP Address
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reqeusts.map((req) => (
                      <tr key={req.id}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                          {req.id}
                        </td>
                        <td className="px-3 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap">
                          <span className="px-2 py-1 font-semibold bg-gray-100 rounded-md">
                            {req.method}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap">
                          {req?.createdAt.slice(0, 19)}{" "}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          <span className="px-2 py-1 font-semibold bg-gray-100 rounded-md">
                            {" "}
                            {req.path}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          <span className="px-2 py-1 font-semibold bg-gray-100 rounded-md">
                            {" "}
                            {req.ip}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          <span>{req.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
