import PropertyCard from "../components/PropertyCard";
import { TProperty } from "../types/TProperty";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import propertiesJson from '../properties.json';
import ShowBy from "../components/ShowBy";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getProperties } from "../services/property-service";
const Properties = () => {
    const [data, setData] = useState<TProperty[]>([]);
    const [filteredData, setFilteredData] = useState<TProperty[]>([]);
    const [showUserProperties, setShowUserProperties] = useState<boolean>(false);
    let loadedData;
    let propertiesFromApi: TProperty[];
    const token = localStorage.getItem("refreshToken") ?? '';
    const _id = localStorage.getItem("_id") ?? '';


    // const data: TApiResponse = useApiGet(
    //     "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot?latitude=39.7047&longitude=-105.0814&radius=2&pagesize=8"
    // )
    // // TODO delete later
    // if (!data.loading) {
    //     console.log(data);
    // }
    const handleSwitchChange = () => {
        setShowUserProperties(!showUserProperties);

    }
    const changeData = (properties: TProperty[]) => {
        setFilteredData([...properties]);
    }

    const onDeleteProperty = (_id: string) => {
        const properties = data.filter((property) => property._id !== _id);
        const filtered = filteredData.filter((property) => property._id !== _id);
        setData(properties);
        setFilteredData(filtered);
    }

    const getPropertiesFromDB = async () => {
        try {
            const res = await getProperties();
            setData([...propertiesFromApi, ...res]);
            setFilteredData([...propertiesFromApi, ...res]);
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
                <FormGroup sx={{ m: 1, minWidth: 120 }}>
                    <FormControlLabel control={<Switch checked={showUserProperties}
                        onChange={handleSwitchChange}
                        inputProps={{ 'aria-label': 'controlled' }} />} label="show properties that posted by me" />
                </FormGroup>

                {filteredData?.map((item: TProperty, i: number) => (
                    !showUserProperties || (showUserProperties && item.ownerID == _id) ?
                        <PropertyCard property={item} onDeleteProperty={onDeleteProperty} key={i} />
                        : null
                ))}
            </div>
    )
}

export default Properties;