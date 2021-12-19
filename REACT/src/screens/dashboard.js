import React from 'react';
import Pending from '../components/Pending';
import Active from '../components/Active';
import Button from '@mui/material/Button';
import {auth, signOut} from '../config/firebase'

function dashboard() {
  return (
    <div style={{display:'flex', justifyContent:'center',alignItems: 'center', flexDirection:'column', height: "100vh", width:'100vw', backgroundColor:'#f1f1f1'}}>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:'0 50px', width:'100%'}}>
      <h1 style={{color:'steelblue', fontWeight:900, fontSize:'46px'}}>
        ADMIN DASHBOARD
      </h1>
      <Button variant="contained" onClick={()=>{
        signOut(auth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
      }}>LOG OUT</Button>
      </div>
    <div style={{height: "70vh",  marginTop:'5vh', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      
      <br />
      <br />
      <Pending />
      <br />
      <br />

      <Active />
      
    </div>
    </div>

  )
}

export default dashboard
