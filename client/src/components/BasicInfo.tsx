import { useEffect, useState } from 'react';
import axios from 'axios';

interface Info {
    name: string;
    profession: string;
    phone: number;
    email: string;
    linkedin: string;
}

interface BasicInfoProps {
    setName: (name: string) => void;
    handleData: (data: Info) => void;  // Handle the entire data from BasicInfo
}

const BasicInfo = ({ setName, handleData }: BasicInfoProps) => {
    const [data, setData] = useState<Info | null>(null);    
    useEffect(() => {
        // axios.get('http://localhost:5000/home')
        axios.get('/api/home')
            .then((response) => {
                const fetchedData = response.data.info;
                setData(fetchedData);
                setName(fetchedData.name);  // Pass the name to the parent
                handleData(fetchedData);  // Pass all data to the parent
            })
            .catch((error) => console.error(error));
    }, [setName, handleData]);

    if (!data) return null;  // Return null until the data is fetched

    return null;  // This component does not render anything; it just passes data to the parent
};

export default BasicInfo;
