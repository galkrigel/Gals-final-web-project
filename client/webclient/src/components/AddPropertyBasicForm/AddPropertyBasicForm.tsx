import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

interface Props {
  changeTitle: (initialState: string) => void;
  changePurpose: (initialState: string) => void;
  changePrice: (initialState: string) => void;
  changeCountry: (initialState: string) => void;
  changeCity: (initialState: string) => void;

}
export default function AddPropertyBasicInfoForm(props: Props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            onChange={(event) => props.changeTitle(event.target.value)}
            id="title"
            name="title"
            label="title"
            fullWidth
            autoComplete="amazing house"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            onChange={(event) => props.changePurpose(event.target.value)}
            id="purpose"
            name="purpose"
            label="purpose"
            fullWidth
            autoComplete="for sale"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            onChange={(event) => props.changePrice(event.target.value)}
            id="price"
            name="price"
            label="price"
            fullWidth
            autoComplete="100000"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={(event) => props.changeCountry(event.target.value)}
            id="country"
            name="country"
            label="country"
            fullWidth
            autoComplete="israel"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={(event) => props.changeCity(event.target.value)}
            id="city"
            name="city"
            label="city"
            fullWidth
            autoComplete="israel"
            variant="standard"
          />
        </Grid>


      </Grid>
    </React.Fragment>
  );
}