import PropertyCard from "../components/PropertyCard";
import { TProperty } from "../types/TProperty";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import ShowBy from "../components/ShowBy";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getProperties, getPropertiesFromExternalApi } from "../services/property-service";
import { getComments } from "../services/comment-service";
import { TComment } from "../types/TComment";

const Properties = () => {

    const [commentsMap, setCommentsMap] = useState<Map<string, number>>(new Map<string, number>());
    const [data, setData] = useState<TProperty[]>([]);
    const [filteredData, setFilteredData] = useState<TProperty[]>();
    const [showUserProperties, setShowUserProperties] = useState<boolean>(false);

    let propertiesFromApi: TProperty[];
    const _id = localStorage.getItem("_id") ?? '';

    const handleSwitchChange = () => {
        setShowUserProperties(!showUserProperties);

    }
    const changeData = (properties: TProperty[]) => {
        setFilteredData([...properties]);
    }

    const onDeleteProperty = (_id: string) => {
        const properties = data.filter((property) => property._id !== _id);
        const filtered = filteredData?.filter((property) => property._id !== _id);
        setData(properties);
        setFilteredData(filtered);
    }

    const getCommentsFromDB = async () => {
        let allComments = await getComments();
        const myMap = new Map<string, number>();
        allComments.forEach((comment: TComment) => {
            if (myMap.has(comment.propertyId)) {
                myMap.set(comment.propertyId, myMap.get(comment.propertyId)! + 1);
            } else {
                myMap.set(comment.propertyId, 1);
            }
        });
        setCommentsMap(myMap);
    }

    const getPropertiesFromDB = async () => {
        try {
            let res = await getProperties();
            res = res.map((obj: TProperty) => ({ ...obj, isExternal: false }));
            setData([...propertiesFromApi, ...res]);
            setFilteredData([...propertiesFromApi, ...res]);
        } catch (err: unknown) {
            setData(propertiesFromApi);
            setFilteredData(propertiesFromApi);
        }
    }

    const onLoad = async () => {
        let res = await getPropertiesFromExternalApi();
        res = res.map((obj: TProperty) => ({ ...obj, isExternal: true }));
        propertiesFromApi = res;
        getPropertiesFromDB();
    }

    useEffect(() => {
        onLoad();
        getCommentsFromDB();
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
                        <PropertyCard isExternal={item.isExternal ?? false} property={item} onDeleteProperty={onDeleteProperty} key={i} numberOfComments={commentsMap.get(item._id ?? '') ?? -1} />
                        : null
                ))}
            </div>
    )
}

export default Properties;