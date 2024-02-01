import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddPropertyBasicInfoForm from '../../components/AddPropertyBasicForm/AddPropertyBasicForm';
import AddPropertyAdditionalInfoForm from '../../components/AddPropertyAdditionalInfoForm/AddPropertyAdditionalInfoForm';
import styles from './AddProperty.module.css'
import { useState } from 'react';


const steps = ['Basic info', 'Additional info'];

export default function AddProperty() {
  const [activeStep, setActiveStep] = useState(0);

  const [title, setTitle] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [price, setPrice] = useState<string>('0');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [rooms, setRooms] = useState<string>('0');
  const [baths, setBaths] = useState<string>('0');
  const [area, setArea] = useState<string>('0');



  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddPropertyBasicInfoForm changeCity={setCity} changeCountry={setCountry} changePrice={setPrice} changePurpose={setPurpose} changeTitle={setTitle} />;
      case 1:
        return <AddPropertyAdditionalInfoForm changeAddress={setAddress} changeArea={setArea} changeBaths={setBaths} changeRooms={setRooms} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("refreshToken") ?? '';
    try {
      fetch(`http://localhost:3001/property/`, {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          purpose: purpose,
          price: price,
          country: country,
          city: city,
          address: address,
          rooms: rooms,
          baths: baths,
          area: area
        }),
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
      }
      }).then(function (response) {
        console.log("res:" + response)

        return response.json()
      }).then(function (body) {
        console.log("body:" + body)

        console.log('post property successful', body);
        setActiveStep(activeStep + 1);
      });
    } catch (err: unknown) {
      console.log("error in action: " + err?.toString())
    }

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className={styles.form}>
      <React.Fragment >
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Add property
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Property added.
                </Typography>
                <Typography variant="subtitle1">
                  you can watch it in the peoperties page.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Add' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </React.Fragment>
    </div>
  );
}


