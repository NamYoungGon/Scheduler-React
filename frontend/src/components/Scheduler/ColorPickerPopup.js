import React from 'react';
import { SketchPicker } from "react-color";

const ColorPickerPopup = ({ color, handleChangeColor }) => {
  return (
    <div
      className="popup color-picker"
      id="popup-color-picker"
      aria-hidden="true"
      ref={pickerPopup => (this.pickerPopup = pickerPopup)}
    >
      <SketchPicker
        ref={picker => (this.picker = picker)}
        color={color}
        onChangeComplete={handleChangeColor}
      />
    </div>
  );
};

export default ColorPickerPopup;