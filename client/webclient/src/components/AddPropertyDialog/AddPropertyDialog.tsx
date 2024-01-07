import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// TODO change later to a real form

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Upload a property
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New property</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        enter the following details:
                    </DialogContentText>
                    title:
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Title"
                        type="input"
                        fullWidth
                        variant="standard"
                    />

                    price:
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Price"
                        type="input"
                        fullWidth
                        variant="standard"
                    />

                    country:
                    <FormControl sx={{ mt: 2, minWidth: 120 }}>
                        <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                        <Select
                            autoFocus
                            label="maxWidth"
                            inputProps={{
                                name: 'max-width',
                                id: 'max-width',
                            }}
                        >
                            <MenuItem value={false as any}>false</MenuItem>
                            <MenuItem value="xs">xs</MenuItem>
                            <MenuItem value="sm">sm</MenuItem>
                            <MenuItem value="md">md</MenuItem>
                            <MenuItem value="lg">lg</MenuItem>
                            <MenuItem value="xl">xl</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}