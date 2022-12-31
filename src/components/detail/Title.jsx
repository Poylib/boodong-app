import styled from 'styled-components/native';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { blueColor, greyColor } from '../../theme';
const Title = () => {
  return (
    <TitleContainer>
      <Ranking>
        <RankBox>
          <SmallRanking>5위</SmallRanking>
          <BigRankig>
            <View>
              <Ionicons name={'stats-chart'} color={'white'} size={23} />
              <Hline />
            </View>
            <View style={{ paddingLeft: 7, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: 'white' }}>순위</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>7위</Text>
            </View>
          </BigRankig>
          <SmallRanking>7위</SmallRanking>
        </RankBox>
        <TextBox>
          <TouchableOpacity>
            <LightText>반포센트럴자이</LightText>
          </TouchableOpacity>
          <BoldText>반포자이</BoldText>
          <TouchableOpacity>
            <LightText>래미안신반포팰리스</LightText>
          </TouchableOpacity>
        </TextBox>
      </Ranking>
      <LikeButton>
        <AntDesign name={'heart'} size={18} color={'lightgrey'} />
      </LikeButton>
    </TitleContainer>
  );
};

const TitleContainer = styled.View`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 15px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: white;
`;

const Ranking = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
`;
const SmallRanking = styled.Text`
  margin: 2px 0;
  font-size: 11px;
  color: lightgrey;
`;
const RankBox = styled.View`
  width: 80px;
  justify-content: center;
  align-items: center;
`;

const BigRankig = styled.View`
  width: 95%;
  height: 40px;
  margin: 0 auto;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${blueColor};
`;
const BoldText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  margin: 3px 0;
`;
const Hline = styled.View`
  width: 100%;
  height: 1px;
  background-color: white;
`;
const TextBox = styled.View`
  /* width: 70%; */
  justify-content: center;
`;

const LightText = styled.Text`
  color: lightgrey;
  font-size: 15px;
`;
const LikeButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 35px;
  height: 35px;
  background-color: ${greyColor};
`;

export default Title;