// import React, { useState } from 'react';
// import FormInput from '../FormInput';

// const TodoInput = ({ onAdd }) => {
//   const [description, setDescription] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (description.trim()) {
//       onAdd(description);
//       setDescription('');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
      
//       <input
//         type="text"
//         placeholder="New to-do"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button type="submit">Add</button>
//     </form>
//   );
// };

// export default TodoInput;
import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../FormInput';

const TodoInput = ({ onAdd }) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Description:""
    },
  });

  const onSubmit = (data) => {
    if (data.description.trim()) {
      onAdd(data.description);
      reset(); // Reset form after submission
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="description"
        label="New to-do"
        control={control}
        errors={errors}
        rules={{ required: 'Description is required' }}
        type="text"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoInput;

