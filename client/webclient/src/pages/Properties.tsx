import PropertyCard from "../components/PropertyCard";
import { TProperty } from "../types/TProperty";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import propertiesJson from '../properties.json';
import ShowBy from "../components/ShowBy";

const Properties = () => {
    const [data, setData] = useState<TProperty[]>([]);
    const [filteredData, setFilteredData] = useState<TProperty[]>([]);
    let loadedData;
    let propertiesFromApi: TProperty[];
    const token = localStorage.getItem("refreshToken") ?? '';

    // const data: TApiResponse = useApiGet(
    //     "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot?latitude=39.7047&longitude=-105.0814&radius=2&pagesize=8"
    // )
    // // TODO delete later
    // if (!data.loading) {
    //     console.log(data);
    // }

    const changeData = (properties: TProperty[]) => {
        setFilteredData([...properties]);
    }

    const onDeleteProperty = (_id: string) => {
        const properties = data.filter((property) => property._id !== _id);
        const filtered = filteredData.filter((property) => property._id !== _id);
        setData(properties);
        setFilteredData(filtered);
    }

    const getPropertiesFromDB = () => {
        try {
            fetch(`http://localhost:3001/property`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }).then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log('get properties successful', body);
                setData([...propertiesFromApi, ...body]);
                setFilteredData([...propertiesFromApi, ...body]);
            });
        } catch (err: unknown) {
            setData(propertiesFromApi);
            setFilteredData(propertiesFromApi);
            console.log("error in action: " + err?.toString())
        }
    }

    useEffect(() => {
        loadedData = JSON.stringify(propertiesJson);
        propertiesFromApi = JSON.parse(loadedData);
        getPropertiesFromDB();
    }, []);

    return (
        !filteredData ?
            <LoadingSpinner /> :
            <div>
                <ShowBy data={data} setData={changeData} />
                {filteredData?.map((item: TProperty, i: number) => (
                    <PropertyCard property={item} onDeleteProperty={onDeleteProperty}  key={i} />
                ))}
            </div>
    )
}

export default Properties;