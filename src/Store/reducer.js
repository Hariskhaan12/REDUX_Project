let initialState = {
  PostData:[
    // {
    //   PName:"",
    //   PDesc:"",
    //   PPrice:"",
    //   PImage:"",
    //   UserId:""
    // }
  ],
};


let reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AddNewPost":
      return{
        ...state,
        PostData:[...state.PostData,action.payload]
      }
      
    // console.log("reducer",action.payload)
    case "Good":
      console.log("Good", action.PName);
  }

  return state;
};

export default reducer



