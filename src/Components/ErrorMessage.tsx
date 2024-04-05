interface IProps {
    msg: string;
  }
  
  const ErrorMessage = ({ msg }: IProps) => {
    return msg ? <span>{msg}</span> : null;
  };
  
  export default ErrorMessage;
  