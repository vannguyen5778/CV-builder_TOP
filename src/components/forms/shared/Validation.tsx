import React from 'react'
import { useState } from 'react';
import Input from './Input';

type Props = {
   
}
export const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
}
  
export default function InputField() {
    const [formValues, setFormValues] = useState({
        // Ivan Ivanov
        // josephine.meyers@mail.co.uk
        // +44 3245 5521 5521
        // London, UK
        fullName: "",
        email: "",
        phone: "",
        address: ""     
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log(name, value)
      setFormValues({ ...formValues, [name]: value });
    };
  
     return (
     <input type="text" name="name" value={formValues.fullName} onInput={handleInputChange} placeholder="Name" />    //   <Input
    //   type="email"
    //   title="Email"
    //   addonTag="recommended"
    //   placeholder="Enter email"
    //   value={formValues.fullName}
    //   onChange={handleInputChange}
    // />
     ) 
      
    
  }

//   function isValid() {
//     const [formValues, setFormValues] = useState({
//       firstName: '',
//       lastName: '',
//       email: '',
//     });
  
//     const [formErrors, setFormErrors] = useState({
//       firstName: '',
//       lastName: '',
//       email: '',
//     });
  
//     const handleInputChange = (event) => {
//       const { name, value } = event.target;
  
//       // Perform validation based on your requirements
//       let error = '';
  
//       if (name === 'firstName' && value.trim() === '') {
//         error = 'First name is required.';
//       } else if (name === 'lastName' && value.trim() === '') {
//         error = 'Last name is required.';
//       } else if (name === 'email' && !isValidEmail(value)) {
//         error = 'Invalid email address.';
//       }
  
//       setFormValues((prevFormValues) => ({
//         ...prevFormValues,
//         [name]: value,
//       }));
  
//       setFormErrors((prevFormErrors) => ({
//         ...prevFormErrors,
//         [name]: error,
//       }));
//     };
  
//     const isValidEmail = (email) => {
//       // Perform email validation based on your requirements
//       // Return true if the email is valid, false otherwise
//       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     };
  
//     return (
//       <div>
//         <input
//           type="text"
//           name="firstName"
//           value={formValues.firstName}
//           onChange={handleInputChange}
//           placeholder="First Name"
//         />
//         {formErrors.firstName && <p>{formErrors.firstName}</p>}
  
//         <input
//           type="text"
//           name="lastName"
//           value={formValues.lastName}
//           onChange={handleInputChange}
//           placeholder="Last Name"
//         />
//         {formErrors.lastName && <p>{formErrors.lastName}</p>}
  
//         <input
//           type="email"
//           name="email"
//           value={formValues.email}
//           onChange={handleInputChange}
//           placeholder="Email"
//         />
//         {formErrors.email && <p>{formErrors.email}</p>}
//       </div>
//     );
//   }



const Validation = (props: Props) => {
    





    // const {
    //     register,
    //     trigger,
    //     formState: { errors },
    //   } = useForm();
    
    //   const onSubmit = async (e: any) => {
    //     const isValid = await trigger();
    //     if (!isValid) {
    //       e.preventDefault();
    //     }
    //   };
    //   {...register('fullName', {
    //     required: true,
    //     maxLength: 100,
    //   })}
    //   {errors.fullName && (
    //     <p>
    //       {errors.name.type === 'required' && 'This field is required'}
    //       {errors.name.type === 'maxLength' && 'Max length is 100 characters'}
    //     </p>
    //   )}
  return (
    <div>Validation</div>
  )
}

