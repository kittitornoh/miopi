const ErrorText = ({ children }) => {
  return (
    <div style={{ color: 'red' }} className='mb-3'>
      {children}
    </div>
  );
};

export default ErrorText;
