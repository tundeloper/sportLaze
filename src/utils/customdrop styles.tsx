export const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'transparent', //'#1f2937', // Tailwind's gray-800
      borderColor: '#374151', // gray-700
      color: 'black', // gray-50
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'black', // gray-50
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#ffffff', // gray-800
      color: '#f9fafb',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'transparent' : 'transparent', // lighter on hover
      color: 'black',
      cursor: 'pointer',
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#f9fafb',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9ca3af', // gray-400
    }),
  };
  