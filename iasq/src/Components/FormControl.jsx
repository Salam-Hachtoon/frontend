const FormControl = ({ label, id, type, placeholder, required }) => {
  return (
    <div className="form-control">
      <label htmlFor={id} className="block font-[16px] text-[#333333] mb-[10px]">
        {label}
      </label>
      <input
        className="block w-full border border-[#D4D4D4] rounded-[6px] py-[9px] px-[12px] text-[14px] text-[#959595] mb-6"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormControl;
