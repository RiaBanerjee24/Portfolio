import axios from "axios";
import "./Timeline.css";
import { useEffect, useState } from "react";

type WorkItem = {
  Company: string;
  Title: string;
  Duration: string;
  Location: string;
  Desc: string;
};

function Timeline() {
  const [workData, setWorkData] = useState<WorkItem[]>([]);

  useEffect(() => {
    axios
    .get("/api/work")
      // .get("http://localhost:5000/work")
      .then((response) => {
        setWorkData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching work endpoint", error);
      });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-1">
        <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
          <div className="w-full max-w-3xl mx-auto">
            <div className="-my-6">
              {workData.length > 0 ? (
                workData.map((item, index) => (
                  <div key={index} className="relative pl-8 sm:pl-32 py-6 group">
                    <div className="font-medium text-[#C69749] text-left mb-1 sm:mb-0 text-2xl sm:text-xl md:text-2xl">
                      {item.Company}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                    
                      <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-40 h-9 mb-3 sm:mb-0 text-[#000000] bg-[#6B728E] rounded-full sm:ml-[-6rem]">
                        {item.Duration}
                      </time>
                      <div className="text-xl font-bold text-[#735F32] text-left">
                        {item.Title} - {item.Location}
                      </div>
                    </div>
                    <div className="text-[#BBBBBB] text-left">{item.Desc}</div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No work data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;