import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput, Button, Dimensions, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, doc, setDoc, storage, ref, uploadBytes, getDownloadURL } from "./Src/Config/Firebase";


export function SignUpScreen({navigation}) {

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [ErrorMessage, setErrorMessage] = useState('')

      let signUpFuntion = async () =>{
        if (setEmail == '' && setPassword == ''){
          setTimeout(()=>{
            setErrorMessage("INPUT FIELDS CAN NOT BE EMPTY")
          },1)

          setTimeout(()=>{
            setErrorMessage('')
          },3000)
        }
        else{
          try{
            const {user} = await createUserWithEmailAndPassword(auth, Email, Password)
            console.log(user)
            navigation.push('Home')
          }
          catch(error){
            setTimeout(()=>{
              setErrorMessage("Email Already In Use!!")
            },1)

            setTimeout(()=>{
              setErrorMessage('')
            },3000)
          }
        }

      }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:36, color:'green', marginBottom:30, fontWeight: 'bold'}}>SIGN UP </Text>

      <TextInput autoCapitalize='none' placeholder="User Email" style={{outline:'none', marginTop:20,backgroundColor:'white', width:300, paddingLeft:10, height:50, fontSize:20}} onChangeText={setEmail} value={Email} />

      <TextInput autoCapitalize='none' placeholder="User Password" style={{outline:'none', marginTop:20,backgroundColor:'white', width:300, paddingLeft:10, height:50, fontSize:20}} onChangeText={setPassword} value={Password} secureTextEntry={true}/>


    <TouchableOpacity >
      <Text style={{color:'red', marginBottom:20}}>
        {ErrorMessage}
      </Text>
        <Button  title='SIGN UP' onPress={signUpFuntion} />
        <Text style={{marginTop:20}}>
          Already have an Account?? 
          <TouchableOpacity style={{marginLeft:10}}>
              <Text style={{color:"blue"}} onPress={()=>{
                navigation.navigate('SignIN')
              }}>
                LOG IN
              </Text>
          </TouchableOpacity>
      </Text>
    </TouchableOpacity>
    </View>
  );
}


export function SignInScreen({navigation}) {

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [ErrorMessage, setErrorMessage] = useState('')

      let signInFuntion = async () =>{
        if (setEmail == '' && setPassword == ''){
          setTimeout(()=>{
            setErrorMessage("INPUT FIELDS CAN NOT BE EMPTY")
          },1)

          setTimeout(()=>{
            setErrorMessage('')
          },3000)
        }
        else{
          try{
            const {user} = await signInWithEmailAndPassword(auth, Email, Password)
            console.log(user)
            navigation.push('Home')
          }
          catch(error){
          
            setTimeout(()=>{
              setErrorMessage("Email Already In Use!!")
            },1)
  
            setTimeout(()=>{
              setErrorMessage('')
            },3000)
          }
          
        }



      }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:36, color:'green', marginBottom:30, fontWeight: 'bold'}}>SIGN IN </Text>

      <TextInput autoCapitalize='none' placeholder="User Email" style={{outline:'none', marginTop:20,backgroundColor:'white', width:300, paddingLeft:10, height:50, fontSize:20}} onChangeText={setEmail} value={Email} />

      <TextInput autoCapitalize='none' placeholder="User Password" style={{outline:'none', marginTop:20,backgroundColor:'white', width:300, paddingLeft:10, height:50, fontSize:20}} onChangeText={setPassword} value={Password} secureTextEntry={true}/>

      <Text style={{color:'red', marginBottom:20}}>
        {ErrorMessage}
      </Text>
        <Button title='SIGN IN' onPress={signInFuntion} />
        <Text style={{marginTop:20}}>
          Don't have an Account? 
          <TouchableOpacity style={{padding:10}}>
              <Text style={{color:"blue"}} onPress={()=>{
                navigation.navigate('SignUP')
              }}>Sign Up</Text>
          </TouchableOpacity>
          </Text>
    </View>
  );
}

function HomeScreen({navigation}) {
  const [Name, setName] = useState('')
  const [FatherName, setFatherName] = useState('')
  const [CNIC, setCNIC] = useState('')
  const [FM, setFM] = useState('')
  const [Help, setHelp] = useState('')
  const [Income, setIncome] = useState('')
  const [ReqInfo, setReqInfo] = useState('')

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:36, color:'orange', marginBottom: 30, fontWeight: "bold"}}>USER DETAILS </Text>

      <TextInput autoCapitalize='none' placeholder="User Name" style={{outline:'none', marginTop:20,backgroundColor:'white', width:300, paddingLeft:10, height:50, fontSize:20}} onChangeText={setName} value={Name} />

      <TextInput autoCapitalize='none' placeholder="Father Name" style={{outline:'none', marginTop:20,backgroundColor:'white', width:300, paddingLeft:10, height:50, fontSize:20}} onChangeText={setFatherName} value={FatherName}/>

      <TextInput placeholder="CNIC Number" style={{outline:'none', marginTop:20,backgroundColor:'white', width:300, paddingLeft:10, height:50, fontSize:20}} maxLength={13} onChangeText={setCNIC} value={CNIC} keyboardType='numeric'/>

      <TextInput placeholder="Family Member" style={{outline:'none', marginTop:20,backgroundColor:'white', width:300, paddingLeft:10, height:50, fontSize:20}} onChangeText={setFM} value={FM} maxLength={2} keyboardType='numeric'/>

      <TextInput placeholder="what Help U Need" style={{outline:'none', marginTop:20,backgroundColor:'white', width:300, paddingLeft:10, height:50, fontSize:20}} onChangeText={setHelp} value={Help}  />

      <TextInput placeholder="Enter Your Income" style={{outline:'none', marginBottom:20, marginTop:20,backgroundColor:'white', width:300, paddingLeft:10, height:50, fontSize:20}} onChangeText={setIncome} value={Income} keyboardType='numeric'  />

      <Button title='Submit Request' onPress={ async () =>{
        if(Name=='' || FatherName=='' || CNIC=='' || FM=='' || Help=='' || Income==''){
          setTimeout(()=>{
            setReqInfo("YOU MUST FILL YOUR INFORMATION!!!")
          },1)
          setTimeout(()=>{
            setReqInfo("")
          }, 3000)
        }
        else{
          let UserId = `id@${Math.random().toString(36).substr(2,16)}`
          let dataRef =  doc(db, "UserRequest", UserId )
          await setDoc(dataRef,  {
              UserName : Name,
              UserFatherName: FatherName,
              UserCNIC: CNIC,
              UserFamilyMembers: FM,
              UserNeed: Help,
              userIncome: Income,
              userId: UserId
          })

          navigation.navigate('SlipScreen')
        }
        
      }} />

      <Text style={{color: 'red', marginTop: 20}}>
          {ReqInfo}
      </Text>

    </View>
  );
}



const SlipScreen = () => {
  return (
    <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
      <Text>Hello Slip Screen</Text>
    </View>
  )
}








const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="SignUP" options='SIGNUP SCREEN' component={SignUpScreen} />
        <Stack.Screen name="SignIN" options='SIGNIN SCREEN' component={SignInScreen} />
        <Stack.Screen name="Home" options='HOME SCREEN' component={HomeScreen} />
        <Stack.Screen name="SlipScreen" options='Slip Screen' component={SlipScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});