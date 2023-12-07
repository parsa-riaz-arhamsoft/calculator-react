const Screen=({ expression }) =>{
  return (
    <div className="w-100 screen-style h-100 rounded-2 d-flex justify-content-end align-items-end fs-4">
      <p className="px-4">{expression===""?0:expression}</p>
    </div>
  );
}

export default Screen