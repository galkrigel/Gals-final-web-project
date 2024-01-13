import { Box, Typography } from "@mui/material";
import { TProperty } from "../../types/TProperty";
import { TComment } from "../../types/TComment";
interface Props {
    property: TProperty;
}

export const Property = (props: Props) => {

return (
    <div>
        <Box
            component="img"
            sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src={props.property.coverPhoto.url}
        />
        <Typography gutterBottom variant="h5" component="div">
            {props.property.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
            {props.property.contactName}, {props.property.phoneNumber.mobile}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
            {props.property.purpose}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
            {props.property.area} meters
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
            {props.property.rooms} rooms, {props.property.baths} baths
        </Typography>
        {props.property.comments &&
            props.property.comments?.map((item: TComment, i: number) => (
                <p key={i}> {item.comment} </p>
            ))}

    </div>
)
}