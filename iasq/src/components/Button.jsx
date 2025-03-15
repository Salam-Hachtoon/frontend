const Button = ({ children, type = "button", onClick, className, icon }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer w-full rounded-[4px] px-[16px] py-[11px] ${className}`}
    >
      {icon && <img src={icon} className="inline mr-2.5" alt="icon" />}
      {children}
    </button>
  );
};

export default Button;
