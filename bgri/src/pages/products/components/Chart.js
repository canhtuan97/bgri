import React ,{useEffect,useState} from 'react';
import {
  LineChart,
} from 'react-native-chart-kit';
import {Dimensions, View, Text} from 'react-native';


export default Chart = (props) => {
  const {trans} = props;
  console.log(trans)
  const [change, setChange] = useState(true);
  const [arr,setArr] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  useEffect(() => {
    setChange(!change)
  },[trans])
  useEffect(() => {
    if(trans){
    var clone = arr.slice();
    trans.map((item, index)=>{
      console.log(item.slice(5,7))
      var i = parseInt(item.slice(5,7));
      clone[i-1]++;
    })
    setArr(clone);
  }
  },[change])
  return (
    <View>
      <Text style={{
            marginBottom: '2%',
            marginTop: '2%',
            marginLeft:'20%',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000623',
          }}>Biểu đồ thống kê giao dịch</Text>
      <LineChart
        data={{
          labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6',"T7","T8","T9","T10","T11","T12"],
          datasets: [
            {
              data:arr,
            },
          ],
        }}
        width={Dimensions.get('window').width-50}
        height={300}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#aa998a',
          backgroundGradientFrom: '#def3de',
          backgroundGradientTo: '#8bbeee',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
