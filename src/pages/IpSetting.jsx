import React, { useState, useEffect } from "react";
import BlockIPModal from "../components/BlockIPModal";
import { useAuth } from "../context/AuthContext";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function IpSetting() {
  const [ips, setIps] = useState([]);
  const [open, setOpen] = useState(false);
  const { token } = useAuth();
  useEffect(() => {
    const fetchIps = async () => {
      const response = await fetch("http://localhost:3000/api/ips", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setIps(data.data);
    };
    fetchIps();
  }, []);
  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <BlockIPModal open={open} setOpen={setOpen} />
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Blocked IP Addresses
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of the IP addresses that have been restricted from accessing
            your API.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="block px-3 py-2 text-sm font-semibold text-center text-white bg-black rounded shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Block IP
          </button>
        </div>
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
                    IP
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Reason
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ips.BlockedIP?.map((ip) => (
                  <tr key={ip.ip}>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                      <span className="p-2 font-mono text-xs font-semibold bg-gray-200 rounded">
                        {ip.ip}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {ip.reason}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      <span
                        className={`px-4 py-2 rounded-full ${
                          ip.status
                            ? "bg-blue-600 text-blue-200"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {ip.status ? "Unblocked" : "Blocked"}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {ip.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
