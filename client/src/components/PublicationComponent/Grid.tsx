import { useEffect, useState } from 'react';
import axios from "axios";

interface Accolade {
    Type: string;
    Title: string;
    Link: string;
    Desc: string;
}

function Grid() {
    const [accolades, setAccolades] = useState<Accolade[]>([]);

    // Fetch accolades data from API
    useEffect(()=>{
		axios
        .get("/api/accolades")
		// .get("http://localhost:5000/accolades")
		.then((response)=>{
			setAccolades(response.data)
		})
		.catch((error)=>{
			console.log("Error fetching work endpoint",error)
		});
	},[]);

    return (
        <div className="py-20">
            <div className="container">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-10">
                    {accolades.map((item, index) => (
                        <div key={index}>
                            <div className="p-7 rounded-xl bg-gray-900 text-white flex flex-col h-full">
                                <h3 className="text-xl font-semibold mb-5">{item.Title}</h3>
                                <h4 className="text-lg font-medium mb-4">{item.Type}</h4>
                                <p className="leading-6 mb-4 flex-grow">{item.Desc}</p>
                                <a
                                    href={item.Link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-3 flex items-center justify-center w-full font-semibold rounded-md bg-gray-700 hover:bg-purple-500 transition-all duration-500"
                                >
                                    
                                    Visit
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        className="h-5 w-5 ml-3"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Grid;
