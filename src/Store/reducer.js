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
      if(action.payload==="")
      {
        return{
          ...state,
          PostData:[]
        }
      }
      else{
        return{
          ...state,
          PostData:[...state.PostData,...action.payload]
        }

      }
      case "DeletePost":
        return{
          ...state,
          PostData:action.payload
        }
      
      // console.log("reducer",action.payload)
      case "EditPost":
        return{
          ...state,
          PostData:[...action.payload]
        }
      }
      
      return state;
    };

export default reducer



