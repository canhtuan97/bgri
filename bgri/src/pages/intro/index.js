import React ,{useState,useEffect} from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
  } from 'react-native';


 var LogoStyle = {
     height:150,
     width:150,
     marginTop:20
 }

const Intro = ({ navigation })=> {
    const [page, setPage] = useState(0);
    useEffect(() => {
        setTimeout(function(){setPage(1)},500);
    }, []);
    if (page ===0){
        return (
            <View style={{flex: 1,alignItems:'center'}}>
            <Image style={{marginTop:'50%'}}
            source={require('images/intro/intro8.png')}/>
        </View>
        )
    }
    if (page ===1){
        return (
            <View style={{flex: 1}}>
                <Image  style={LogoStyle}
                        source={require("images/intro/intro1.png")}
                ></Image>
                <Text style={{fontSize:16, color:'#4A7729',marginLeft:20
                                }}>CHÀO MỪNG BẠN,</Text>
                <Text style={{fontSize:16, color:'#4A7729',marginLeft:20,marginRight:20
                                }}>Là một ứng dụng nông nghiệp với các tính năng tuyệt vời ....</Text>
                <Image style={{marginLeft:20,marginTop:20}}
                source={require('images/intro/intro5.png')}/>
                <TouchableOpacity style={{marginLeft:300,marginTop:-16}} onPress={()=>{setPage(2)}}>
                    <Text style={{fontSize:16, color:'#4A7729'
                                }}
                    >Tiếp</Text>
                </TouchableOpacity>
                <ImageBackground
                    source={require("images/intro/intro4.png")}
                    style={{
                        flex: 1,
                        resizeMode: 'cover',
                        justifyContent: 'center',
                }}
            />

            </View>
        );
    }else{
        if(page===2){
            return (
                <View style={{flex: 1}}>
                    <Image  style={LogoStyle}
                            source={require("images/intro/intro1.png")}
                    ></Image>
                    <Text style={{fontSize:16, color:'#4A7729',marginLeft:20
                                    }}></Text>
                    <Text style={{fontSize:16, color:'#4A7729',marginLeft:20,marginRight:20
                                    }}>BKAGRI luôn đồng hành cùng bạn trên những chặng đường phát triển</Text>
                    <Image style={{marginLeft:20,marginTop:20}}
                    source={require('images/intro/intro6.png')}/>
                    <TouchableOpacity style={{marginLeft:300,marginTop:-16}} onPress={()=>{setPage(3)}} >
                        <Text style={{fontSize:16, color:'#4A7729'
                                    }}
                        >Tiếp</Text>
                    </TouchableOpacity>
                    <ImageBackground
                        source={require("images/intro/intro2.png")}
                        style={{
                            flex: 1,
                            resizeMode: 'cover',
                            justifyContent: 'center',
                    }}
                />

            </View>
            );
        }else{
            if (page ===3){
                return(
                    <View style={{flex: 1}}>
                        <Image  style={LogoStyle}
                                source={require("images/intro/intro1.png")}
                        ></Image>
                        <Text style={{fontSize:16, color:'#4A7729',marginLeft:20
                                        }}></Text>
                        <Text style={{fontSize:16, color:'#4A7729',marginLeft:20,marginRight:20
                                        }}>BKAGRI cung cấp giao diện đơn giản,dễ sử dụng đối với tất cả người dùng</Text>
                        <Image style={{marginLeft:20,marginTop:20}}
                        source={require('images/intro/intro7.png')}/>
                        <TouchableOpacity style={{marginLeft:300,marginTop:-16}}  onPress={()=>{navigation.navigate("Signin")}}>
                            <Text style={{fontSize:16, color:'#4A7729'
                                        }}
                            >Bắt đầu</Text>
                        </TouchableOpacity>
                        <ImageBackground
                            source={require("images/intro/intro3.png")}
                            style={{
                                flex: 1,
                                resizeMode: 'cover',
                                justifyContent: 'center',
                        }}
                    />
            
                </View>
                );
            }
        }
    }
    
}
export default Intro