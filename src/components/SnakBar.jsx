import React, { useState, forwardRef, useImperativeHandle } from "react";
import BookOn from '../assest/icons/BookOn'
import BookOff from '../assest/icons/BookOff'
// examples to use it
/*   const typeSnak = {
    success: "success",
    fail: "fail"
  } */
  //  <SnakBar type={typeSnak.success} message="Saved to BookMarks" ref={snakRef} />
//  when add bookmark <button onClick={() => snakRef.current.show()}  > Add Book mark </button>
//  pass ref from parent to children 
const Snackbar = forwardRef(({type,message},ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 2000);
    },
  }));
  return (
    <div
      className="snakbar"
      id={showSnackbar ? "show" : "hide"}
      style={{
        backgroundColor: type === "success" ? "#388E3C" : "#D32F2F",
      }}
    >
      <div className="symbol">
        {type === "success" ? <BookOn />  : <BookOff />}
      </div>
      <div className="message">{message}</div>
    </div>
  );
});

export default Snackbar;