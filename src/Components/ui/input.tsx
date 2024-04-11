import { InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement>{
    errorMessage?: string;
    error?: boolean;
}

const Input=({errorMessage,error,...rest}:Iprops) =>{
    return (
      <>
        <input {...rest} style={{
          width: '100%',
          borderRadius: '8px',
          padding: '10px',
          border: error ? '1px solid red' : '1px solid #ccc',
        }} />
        {error && errorMessage && <span style={{ color: 'red', marginTop: '5px', display: 'block' }}>{errorMessage}</span>}
    </>
    )
}
export default Input;