import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../context/AuthContext";
export default function BlockIPModal({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [ip, setIp] = useState("");
  const [reason, setReason] = useState("");
  const [isValidIP, setIsValidIP] = useState(true);
  const { token } = useAuth();
  const validateIP = (inputIP) => {
    // Simple regex for IPv4 validation
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipRegex.test(inputIP);
  };
  const handleBlockIP = async () => {
    if (!validateIP(ip)) {
      setIsValidIP(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/ips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ip, reason }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Blocked IP:", data);
        setOpen(false);
        // Handle success, e.g., show a success message
      } else {
        console.error("Failed to block IP:", response.status);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle other types of errors
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="bg-white sm:flex sm:items-start">
                  <div className="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Block IP
                    </Dialog.Title>
                    <div className="mt-2">
                      <form>
                        <div className="py-2 space-y-2">
                          <label htmlFor="ip">IP Address</label>
                          {!isValidIP && (
                            <p className="p-2 text-xs text-red-600 bg-red-100 rounded">
                              Please enter a valid IP address.
                            </p>
                          )}
                          <input
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            type="text"
                            id="ip"
                            placeholder="192.78.0.1"
                            className="w-full px-4 py-2 rounded outline-none"
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="reason">Reason</label>
                          <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            name=""
                            id="reason"
                            className="w-full px-2 py-2 rounded outline-none"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:pl-4">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:w-auto"
                    onClick={handleBlockIP}
                  >
                    Block
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
