import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const Table = () => {
  const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_apiKey,
  authDomain: import.meta.env.VITE_REACT_APP_authDomain,
  databaseURL: import.meta.env.VITE_REACT_APP_databaseURL,
  projectId: import.meta.env.VITE_REACT_APP_projectId,
  storageBucket: import.meta.env.VITE_REACT_APP_storageBucket,
  messagingSenderId: import.meta.env.VITE_REACT_APP_messagingSenderId,
  appId: import.meta.env.VITE_REACT_APP_appId,
  measurementId: import.meta.env.VITE_REACT_APP_measurementId
};

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const fetchData = async () => {
    const dataRef = await firebase.database().ref("/CrowdManagement");
    dataRef.on("value", (snapshot) => {
      setData(snapshot.val());
    });

    // Remember to unsubscribe from the listener when the component unmounts
    return () => {
      dataRef.off("value");
    };
  };
  const [data, setData] = useState(null);

  useEffect(() => {
    

    fetchData();
  }, []);

  return (
    <section className="py-3 bg-gray-50 dark:bg-gray-900 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
             CROWD MANAGEMENT SYSTEM
            
            </div>
            <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add new product
              </button>
             
           
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4"></th>
                  <th scope="col" className="px-4 py-3">
                    Cameras
                  </th>
                  
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  

                  <th scope="col" className="px-4 py-3">
                    Count
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Cordinates
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {console.log(data)}
                {data &&
                  Object.values(data).map((d, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="w-4 px-4 py-3"></td>
                      <td
                        scope="row"
                        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {"Camera" + (index + 1)}
                      </td>
                      
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <div className="inline-block w-4 h-4 mr-2 bg-green-700 rounded-full"></div>
                          {"Active"}
                          
                        </div>
                      </td>
                      

                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">{d.Count}</div>
                      
                      </td>
                      <td>
                      <td className="px-4 py-2 text-green-400">{"[" + d.Location[0]} , {d.Location[1] + "]"}</td>
                      </td>
                      {
                        d.Count>=150 && (
                          <>
                            <td className="px-4 py-2 text-red-400">{"ALERT"}</td>
                          </>
                        )
                      }
                        {
                        d.Count<150 && (
                          <> 
                            <td className="px-4 py-2 text-green-400">{"NORMAL"}</td>
                          </>
                        )
                      }
                      
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >

          </nav>
        </div>
      </div>
    </section>
  );
};

export default Table;
