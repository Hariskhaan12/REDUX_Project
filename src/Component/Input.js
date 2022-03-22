import React from 'react'

function Input({ typ, plch, func,styl,name,val }) {
  return (
    <div>
      <input value={val} name={name} type={typ} style={styl} placeholder={plch} onChange={(e)=>func(e)}>
      </input>
    </div>
  );
}

export default Input