import React from 'react'

function Button({ styl, func ,text}) {
  return (
    <div>
      <button style={styl} onClick={func}>
        {text}
      </button>
    </div>
  );
}

export default Button