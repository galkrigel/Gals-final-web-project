// import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { useForm } from 'react-hook-form';
// import styles from './SignInAndOutForm.module.css';
// import { TLoginData } from '../../types/TLoginData';
// import { TRegisterData } from '../../types/TRegisterData';



// interface Props {
//     onSubmit: (data: TRegisterData | TLoginData) => void,
//     title: string,
//     changePageTitle: string,
//     onChangePage: () => void,
//     children: JSX.Element[],
//     onSubmitText: string
// }
// const SignInAndOutForm = (props: Props) => {
//     const {
//         handleSubmit,
//     } = useForm();
//     return (
//         <div className={styles.form}>
//             <Box
//                 component="form"
//                 onSubmit={handleSubmit(props.onSubmit)}
//                 sx={{
//                     maxWidth: '500px',
//                     margin: 'auto',
//                     padding: '20px',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                     backgroundColor: 'white',
//                 }}
//             >
//                 <Typography variant="h5" component="div" sx={{ mb: 2 }}>
//                     {props.title}
//                 </Typography>

//                 {props.children}

//                 <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//                     {props.onSubmitText}
//                 </Button>
//                 <Box mt={1} sx={{ mt: 2, textAlign: 'center' }}>

//                     <Link href="#" variant="body2" onClick={props.onChangePage}>
//                         {props.changePageTitle}
//                     </Link>
//                 </Box>
//             </Box>
//         </div>
//     );
// };

// export default SignInAndOutForm;