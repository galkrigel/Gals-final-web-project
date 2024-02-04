import { TComment } from "../types/TComment";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
interface Props {
    comment: TComment;
}

const Comment = (props: Props) => {
   return( <Card sx={{ display: 'flex', justifyContent: 'space-between',mb:2 }} >
        <Box sx={{ display: 'flex', flexDirection: 'row' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        userId: {props.comment.ownerId}
                    </Typography>
                    <Typography variant="subtitle1"  component="div">
                        text: {props.comment.text}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                </Box>
            </Box>
        </Box>
    </Card>)
}

export default Comment;