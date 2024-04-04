import { InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement>{

}

const Input=({...rest}:Iprops) =>{
    return (
        <input {...rest} style={{ width: '100%', borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}/>
    )
}
export default Input;