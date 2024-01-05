import Property from "../components/Property";
import { PropertyType } from "../models/Property";
import { TApiResponse, useApiGet } from "../utils/fetchApi";

const HomePage = () => {
    const data: TApiResponse = useApiGet(
        `/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
    );

    // print the output
    if (!data.loading) {
        console.log(data);
    }

    return (
        <div>
            {data.loading ? (
                <p>loading!!!!!</p>
            ) : (
                <p>finish</p>
            )}
            {data?.data?.hits.map((item: PropertyType, i: number) =>
                <Property property={item} key={i} />
            )}
        </div>
    )
    // return (
    //     <div className="HomePage">
    //         <MainPageCard purpose="RENT A HOME"
    //             title1="Rental homes for"
    //             title2="explore apartments"
    //             imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4" />

    //   <p></p>

    //         <MainPageCard purpose="BUY A HOME"
    //             title1="Buy your home"
    //             title2="explore apartments"
    //             imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4" />


    //     </div>
    //);
}

export default HomePage;