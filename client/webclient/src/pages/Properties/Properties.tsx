import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { TProperty } from "../../types/TProperty";
import { TApiResponse, useApiGet } from "../../utils/fetchApi";
import Grid from '@mui/material/Grid';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import FormDialog from "../../components/AddPropertyDialog/AddPropertyDialog";
import styles from './Properties.module.css'

const Properties = () => {
    const data: TApiResponse = useApiGet(
        "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot?latitude=39.7047&longitude=-105.0814&radius=2&pagesize=8"
    )
    // TODO delete later
    if (!data.loading) {
        console.log(data);
    }

    // TODO center with css
    return (
        data.loading ?
            <LoadingSpinner /> :
            <div>
                <FormDialog />
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className={styles.grid}>
                    {data?.data?.property.map((item: TProperty, i: number) => (
                        <Grid item xs={2} sm={4} md={4} key={i} className={styles.gridItem}>
                            <PropertyCard property={item} key={i} />
                        </Grid>
                    ))}
                </Grid>
            </div>


    )
}

export default Properties;