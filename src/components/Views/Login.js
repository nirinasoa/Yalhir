import { useState, useEffect } from "react";
import { useForm  } from "react-hook-form";
import Header from '../template/header';
import Axios from 'axios';

function Login() {
  const { register, handleSubmit,getValues ,reset} = useForm();
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (data, e) => {
    setData(data)
    let username = getValues("username");
    let password = getValues("password");
    const user={
        username:username,
        password:password
      }
     Axios.post('https://yalhir-nodejs-mongodb.herokuapp.com/login',user)
      .then(res=>{
        if(res.data.length > 0){
        sessionStorage.setItem("logged",true)
        window.location='/home';
        }
        else{
          setMessage('Sorry, wrong authentification!')
        }
      });
  };

  const onError = (errors, e) => console.log(errors, e);
  
  return (
    <div>
        <section class="intro-section spad">
                <div class="container">
                    <div class="row">
                      <div class="col-lg-4">
                      </div>
                        <div class="col-lg-5">
                            <div class="section-title">
                                <h2> Yal<i class="fa fa-music"></i>ir</h2>
                                <br/>
                                <div style={{padding:20,boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'}}>
                                    <h4><i class="fa fa-lock"></i> Login</h4>
                                    {message ? <p class='text-danger'> <strong> {message}</strong></p> :  <p class="text-muted">To connect to Yalhir, enter your username and password</p>}
                                    <form class="form-group" onSubmit={handleSubmit(onSubmit, onError)}>
                                        <label for=""><i class='fa fa-user'></i>  Username:</label>
                                        <input class="form-control" {...register("username")} placeholder="username" /> <br/>
                                        <label for=""><i class='fa fa-lock'></i>  Password:</label>
                                        <input class="form-control" {...register("password")} type="password" placeholder="password" /> <br/>
                                       <button class="site-btn" style={{backgroundColor:'orange',}} type="submit"> <i class="fa fa-check"></i> Login </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                </div>
                </div>
            </section>
    </div>
  );
}

export default Login;
