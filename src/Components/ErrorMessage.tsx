interface IProps {
    msg: string;
  }
  
  const ErrorMessage = ({ msg }: IProps) => {
    return msg ? <span style={{ color: 'red', marginTop: '5px', display: 'block' }}>{msg}</span> : null;
  };
  
  export default ErrorMessage;
  