import React from 'react'

function Input({ typ, plch, func,styl,name }) {
  return (
    <div>
      <input name={name} type={typ} style={styl} placeholder={plch} onChange={(e)=>func(e)}>
      </input>
    </div>
  );
}

export default Input